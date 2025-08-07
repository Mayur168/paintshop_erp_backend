const express = require("express");
const NonGSTOrder = require("../models/NonGST");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await NonGSTOrder.find()
      .populate({
        path: "customer_id",
        select: "customer_name",
      })
      .populate({
        path: "order_details",
        populate: {
          path: "product_id",
          select: "product_name color",
        },
      });

    // Transform the response to match INonGSTOrderDetail interface
    const transformedOrders = orders.map((order) => {
      const orderObj = order.toObject(); // Convert Mongoose document to plain object
      return {
        ...orderObj,
        order_details: orderObj.order_details.map((detail) => ({
          ...detail,
          product_name: detail.product_id?.product_name || "", // Move product_name to top level
          product_id: detail.product_id?._id, // Keep product_id as string
        })),
      };
    });

    res.json(transformedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { customer_id, order_details, status } = req.body;

  try {
    // Validate input
    if (
      !customer_id ||
      !order_details ||
      !Array.isArray(order_details) ||
      order_details.length === 0
    ) {
      return res.status(400).json({
        message: "Invalid input: customer_id and order_details are required",
      });
    }

    // Validate customer
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate status
    const validStatuses = ["pending", "processing", "completed", "cancelled"];
    const orderStatus =
      status && validStatuses.includes(status) ? status : "pending";

    // Create the order
    const order = new NonGSTOrder({
      customer_id,
      subtotal: 0,
      total_amount: 0,
      status: orderStatus,
    });
    await order.save();

    try {
      // Process order details
      const orderDetailIds = [];
      let subtotal = 0;

      for (const detail of order_details) {
        if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
          throw new Error("Invalid product_id or quantity");
        }

        const product = await Product.findById(detail.product_id);
        if (!product) {
          throw new Error(`Product not found: ${detail.product_id}`);
        }

        if (product.current_stock < detail.quantity) {
          throw new Error(
            `Insufficient stock for product: ${product.product_name}`,
          );
        }

        const orderDetail = new OrderDetail({
          order_id: order._id,
          product_id: detail.product_id,
          product_name: product.product_name,
          quantity: detail.quantity,
          price: product.sell_price,
        });

        await orderDetail.save();
        orderDetailIds.push(orderDetail._id);

        subtotal += detail.quantity * product.sell_price;
        product.current_stock -= detail.quantity;
        await product.save();
      }

      // Update order with calculated values
      order.subtotal = subtotal;
      order.total_amount = subtotal;
      order.order_details = orderDetailIds;
      await order.save();

      // Populate response
      const populatedOrder = await NonGSTOrder.findById(order._id)
        .populate({
          path: "order_details",
          populate: {
            path: "product_id",
            select: "product_name color",
          },
        })
        .populate("customer_id", "customer_name")
        .exec();

      res.status(201).json(populatedOrder);
    } catch (err) {
      // Clean up if an error occurs
      await NonGSTOrder.deleteOne({ _id: order._id });
      await OrderDetail.deleteMany({ order_id: order._id });
      throw err;
    }
  } catch (err) {
    console.error("Error creating NonGSTOrder:", err);
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { customer_id, order_details, status } = req.body;

  try {
    // Find the order
    const order = await NonGSTOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update customer_id if provided
    if (customer_id) {
      const customer = await Customer.findById(customer_id);
      if (!customer) {
        return res.status(400).json({ message: "Customer not found" });
      }
      order.customer_id = customer_id;
    }

    // Update status if provided
    if (status) {
      const validStatuses = ["pending", "processing", "completed", "cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      order.status = status;
    }

    // Update order_details if provided
    if (order_details) {
      if (!Array.isArray(order_details) || order_details.length === 0) {
        return res
          .status(400)
          .json({
            message: "Invalid input: order_details must be a non-empty array",
          });
      }

      // Restore stock for existing order details
      const existingDetails = await OrderDetail.find({ order_id: order._id });
      for (const detail of existingDetails) {
        const product = await Product.findById(detail.product_id);
        if (product) {
          product.current_stock += detail.quantity;
          await product.save();
        }
      }

      // Delete existing order details
      await OrderDetail.deleteMany({ order_id: order._id });

      // Process new order details
      const newDetailIds = [];
      let subtotal = 0;

      for (const detail of order_details) {
        if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
          return res
            .status(400)
            .json({ message: "Invalid product_id or quantity" });
        }

        const product = await Product.findById(detail.product_id);
        if (!product) {
          return res
            .status(400)
            .json({ message: `Product not found: ${detail.product_id}` });
        }

        if (product.current_stock < detail.quantity) {
          return res
            .status(400)
            .json({
              message: `Insufficient stock for product: ${product.product_name}`,
            });
        }

        const orderDetail = new OrderDetail({
          order_id: order._id,
          product_id: detail.product_id,
          product_name: product.product_name,
          quantity: detail.quantity,
          price: product.sell_price,
        });

        await orderDetail.save();
        newDetailIds.push(orderDetail._id);
        subtotal += detail.quantity * product.sell_price;
        product.current_stock -= detail.quantity;
        await product.save();
      }

      // Update order with new details and financials
      order.order_details = newDetailIds;
      order.subtotal = subtotal;
      order.total_amount = subtotal;
    }

    // Save the updated order
    await order.save();

    // Populate response
    const populatedOrder = await NonGSTOrder.findById(order._id)
      .populate({
        path: "order_details",
        populate: {
          path: "product_id",
          select: "product_name color",
        },
      })
      .populate("customer_id", "customer_name")
      .exec();

    res.status(200).json(populatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// router.patch("/:id", async (req, res) => {
//   const { customer_id, order_details, status } = req.body;

//   try {
//     // Find the order
//     const order = await NonGSTOrder.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Start a transaction
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // Update customer_id if provided
//       if (customer_id) {
//         const customer = await Customer.findById(customer_id).session(session);
//         if (!customer) {
//           throw new Error("Customer not found");
//         }
//         order.customer_id = customer_id;
//       }

//       // Update status if provided
//       if (status) {
//         const validStatuses = ["pending", "processing", "completed", "cancelled"];
//         if (!validStatuses.includes(status)) {
//           throw new Error("Invalid status value");
//         }
//         order.status = status;
//       }

//       // Update order_details if provided
//       if (order_details) {
//         if (!Array.isArray(order_details) || order_details.length === 0) {
//           throw new Error("Invalid input: order_details must be a non-empty array");
//         }

//         // Restore stock for existing order details
//         const existingDetails = await OrderDetail.find({ order_id: order._id }).session(session);
//         for (const detail of existingDetails) {
//           const product = await Product.findById(detail.product_id).session(session);
//           if (product) {
//             product.current_stock += detail.quantity;
//             await product.save({ session });
//           }
//         }

//         // Delete existing order details
//         await OrderDetail.deleteMany({ order_id: order._id }).session(session);

//         // Process new order details
//         const newDetailIds = [];
//         let subtotal = 0;

//         for (const detail of order_details) {
//           if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
//             throw new Error("Invalid product_id or quantity");
//           }

//           const product = await Product.findById(detail.product_id).session(session);
//           if (!product) {
//             throw new Error(`Product not found: ${detail.product_id}`);
//           }

//           if (product.current_stock < detail.quantity) {
//             throw new Error(`Insufficient stock for product: ${product.product_name}`);
//           }

//           const orderDetail = new OrderDetail({
//             order_id: order._id,
//             product_id: detail.product_id,
//             product_name: product.product_name,
//             quantity: detail.quantity,
//             price: product.sell_price,
//           });

//           await orderDetail.save({ session });
//           newDetailIds.push(orderDetail._id);
//           subtotal += detail.quantity * product.sell_price;
//           product.current_stock -= detail.quantity;
//           await product.save({ session });
//         }

//         // Update order with new details and financials
//         order.order_details = newDetailIds;
//         order.subtotal = subtotal;
//         order.total_amount = subtotal;
//       }

//       // Save the updated order
//       await order.save({ session });

//       // Commit transaction
//       await session.commitTransaction();

//       // Populate response
//       const populatedOrder = await NonGSTOrder.findById(order._id)
//         .populate({
//           path: "order_details",
//           populate: {
//             path: "product_id",
//             select: "product_name color",
//           },
//         })
//         .populate("customer_id", "customer_name")
//         .exec();

//       res.status(200).json(populatedOrder);
//     } catch (err) {
//       await session.abortTransaction();
//       throw err;
//     } finally {
//       session.endSession();
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    // Find the order
    const order = await NonGSTOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Restore stock for associated order details
    const orderDetails = await OrderDetail.find({ order_id: order._id });
    for (const detail of orderDetails) {
      const product = await Product.findById(detail.product_id);
      if (product) {
        product.current_stock += detail.quantity;
        await product.save();
      }
    }

    // Delete associated order details
    await OrderDetail.deleteMany({ order_id: order._id });

    // Delete the order
    await NonGSTOrder.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Order and associated details deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// router.delete("/:id", async (req, res) => {
//   try {
//     // Find the order
//     const order = await NonGSTOrder.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Start a transaction
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // Restore stock for associated order details
//       const orderDetails = await OrderDetail.find({ order_id: order._id }).session(session);
//       for (const detail of orderDetails) {
//         const product = await Product.findById(detail.product_id).session(session);
//         if (product) {
//           product.current_stock += detail.quantity;
//           await product.save({ session });
//         }
//       }

//       // Delete associated order details
//       await OrderDetail.deleteMany({ order_id: order._id }).session(session);

//       // Delete the order
//       await NonGSTOrder.findByIdAndDelete(req.params.id).session(session);

//       // Commit transaction
//       await session.commitTransaction();

//       res.status(200).json({ message: "Order and associated details deleted successfully" });
//     } catch (err) {
//       await session.abortTransaction();
//       throw err;
//     } finally {
//       session.endSession();
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;
