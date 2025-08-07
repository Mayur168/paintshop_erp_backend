// const express = require("express");
// const Order = require("../models/Order");
// const OrderDetail = require("../models/OrderDetail");
// const Product = require("../models/Product");
// const mongoose = require('mongoose');

// const router = express.Router();
// // router.get("/", async (req, res) => {
// //   try {
// //     // Check for filter query parameter
// //     const filter = req.query.filter;

// //     // Initialize query
// //     let query = Order.find()
// //       .populate({
// //         path: "customer_id",
// //         select: "customer_name email phone address city state zip_code discount_rate credit_limit notes is_active",
// //       })
// //       .populate({
// //         path: "order_details",
// //         populate: {
// //           path: "product_id",
// //           select: "product_name",
// //         },
// //       });

// //     // Get current date and time
// //     const now = new Date();
    
// //     // Apply time-based filters
// //     if (filter === "day") {
// //       const startOfDay = new Date(now.setHours(0, 0, 0, 0));
// //       query = query.where({ createdAt: { $gte: startOfDay } });
// //     } else if (filter === "week") {
// //       const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
// //       startOfWeek.setHours(0, 0, 0, 0);
// //       query = query.where({ createdAt: { $gte: startOfWeek } });
// //     } else if (filter === "month") {
// //       const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
// //       query = query.where({ createdAt: { $gte: startOfMonth } });
// //     } else if (filter === "year") {
// //       const startOfYear = new Date(now.getFullYear(), 0, 1);
// //       query = query.where({ createdAt: { $gte: startOfYear } });
// //     } else if (filter === "recent") {
// //       // Existing recent filter
// //       query = query.sort({ createdAt: -1 }).limit(5);
// //     }

// //     // If filter=total_revenue, calculate total revenue only
// //     if (filter === "total_revenue") {
// //       const orders = await query;
// //       const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
// //       return res.json({ total_revenue });
// //     }

// //     // Execute query
// //     const orders = await query;

// //     // Calculate total_revenue
// //     const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

// //     // Return full response with orders and total_revenue
// //     res.json({
// //       orders,
// //       total_revenue,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // });

// // router.get("/", async (req, res) => {
// //   try {
// //     // Check for filter query parameter
// //     const filter = req.query.filter;

// //     // Initialize query
// //     let query = Order.find()
// //       .populate({
// //         path: "customer_id",
// //         select: "customer_name email phone address city state zip_code discount_rate credit_limit notes is_active",
// //       })
// //       .populate({
// //         path: "order_details",
// //         populate: {
// //           path: "product_id",
// //           select: "product_name",
// //         },
// //       });

// //     // If filter=recent, sort by createdAt descending and limit to 5
// //     if (filter === "recent") {
// //       query = query.sort({ createdAt: -1 }).limit(5);
// //     }

// //     // If filter=total_revenue, calculate total revenue only
// //     if (filter === "total_revenue") {
// //       const orders = await query;
// //       const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
// //       return res.json({ total_revenue });
// //     }

// //     // Execute query
// //     const orders = await query;

// //     // Calculate total_revenue
// //     const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

// //     // Return full response with orders and total_revenue
// //     res.json({
// //       orders,
// //       total_revenue,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // });
// router.get("/", async (req, res) => {
//   try {
//     // Check for filter and date query parameters
//     const filter = req.query.filter;
//     const selectedDate = req.query.date;

//     // Initialize query
//     let query = Order.find()
//       .populate({
//         path: "customer_id",
//         select: "customer_name email phone address city state zip_code discount_rate credit_limit notes is_active",
//       })
//       .populate({
//         path: "order_details",
//         populate: {
//           path: "product_id",
//           select: "product_name",
//         },
//       });

//     // Get current date and time
//     const now = new Date();
    
//     // Apply time-based filters
//     if (filter === "day" && selectedDate) {
//       const startOfDay = new Date(selectedDate);
//       startOfDay.setHours(0, 0, 0, 0);
//       const endOfDay = new Date(selectedDate);
//       endOfDay.setHours(23, 59, 59, 999);
//       query = query.where({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
//     } else if (filter === "week") {
//       const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
//       startOfWeek.setHours(0, 0, 0, 0);
//       query = query.where({ createdAt: { $gte: startOfWeek } });
//     } else if (filter === "month") {
//       const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//       query = query.where({ createdAt: { $gte: startOfMonth } });
//     } else if (filter === "year") {
//       const startOfYear = new Date(now.getFullYear(), 0, 1);
//       query = query.where({ createdAt: { $gte: startOfYear } });
//     } else if (filter === "recent") {
//       query = query.sort({ createdAt: -1 }).limit(5);
//     }

//     // If filter=total_revenue, calculate total revenue only
//     if (filter === "total_revenue") {
//       const orders = await query;
//       const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
//       return res.json({ total_revenue });
//     }

//     // Execute query
//     const orders = await query;

//     // Calculate total_revenue
//     const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

//     // Return full response with orders and total_revenue
//     res.json({
//       orders,
//       total_revenue,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
// router.post("/", async (req, res) => {
//   const { customer_id, order_details, status } = req.body;
//   let subtotal = 0;
//   let tax = 0;
//   let total_amount = 0;

//   // Validate status if provided
//   const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
//   const orderStatus = status && validStatuses.includes(status) ? status : 'pending';

//   try {
//     // Validate input
//     if (
//       !customer_id ||
//       !order_details ||
//       !Array.isArray(order_details) ||
//       order_details.length === 0
//     ) {
//       return res.status(400).json({
//         message: "Invalid input: customer_id and order_details are required",
//       });
//     }

//     // Start a transaction
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // Create the order
//       const order = new Order({
//         customer_id,
//         subtotal,
//         tax,
//         total_amount,
//         status: orderStatus, // Set the status
//       });
//       await order.save({ session });

//       // Store created OrderDetail IDs
//       const orderDetailIds = [];

//       // Process each order detail
//       for (const detail of order_details) {
//         // Validate product_id and quantity
//         if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
//           throw new Error("Invalid product_id or quantity");
//         }

//         const product = await Product.findById(detail.product_id).session(session);
//         if (!product) {
//           throw new Error(`Product not found: ${detail.product_id}`);
//         }

//         if (product.current_stock < detail.quantity) {
//           throw new Error(`Insufficient stock for product: ${detail.product_id}`);
//         }

//         const orderDetail = new OrderDetail({
//           order_id: order._id,
//           product_id: detail.product_id,
//           product_name: detail.product_name || product.product_name,
//           quantity: detail.quantity,
//           price: product.sell_price,
//         });

//         await orderDetail.save({ session });
//         orderDetailIds.push(orderDetail._id);

//         subtotal += detail.quantity * product.sell_price;
//         product.current_stock -= detail.quantity;
//         await product.save({ session });
//       }

//       // Calculate tax and total
//       tax = subtotal * 0.1; // 10% tax
//       total_amount = subtotal + tax;

//       // Update order with calculated values and order_detail IDs
//       order.subtotal = subtotal;
//       order.tax = tax;
//       order.total_amount = total_amount;
//       order.order_details = orderDetailIds;
//       await order.save({ session });

//       // Commit the transaction
//       await session.commitTransaction();

//       // Populate order_details and customer_id
//       const populatedOrder = await Order.findById(order._id)
//         .populate({
//           path: "order_details",
//           populate: {
//             path: "product_id",
//             select: "product_name",
//           },
//         })
//         .populate("customer_id", "name email")
//         .exec();

//       res.status(201).json(populatedOrder);
//     } catch (err) {
//       // Roll back transaction on error
//       await session.abortTransaction();
//       throw err;
//     } finally {
//       session.endSession();
//     }
//   } catch (err) {
//     console.error("Error creating order:", err);
//     res.status(400).json({ message: err.message });
//   }
// });


// router.patch("/:id", async (req, res) => {
//   const { customer_id, order_details, status } = req.body;

//   try {
//     // Find the order
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Initialize financial fields
//     let subtotal = order.subtotal;
//     let tax = order.tax;
//     let total_amount = order.total_amount;

//     // Update customer_id if provided
//     if (customer_id) {
//       order.customer_id = customer_id;
//     }

//     // Update status if provided
//     if (status) {
//       if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
//         return res.status(400).json({ message: "Invalid status value" });
//       }
//       order.status = status;
//     }

//     // Update order_details if provided
//     if (order_details) {
//       // Validate order_details
//       if (!Array.isArray(order_details) || order_details.length === 0) {
//         return res.status(400).json({
//           message: "Invalid input: order_details must be a non-empty array",
//         });
//       }

//       // Restore stock for existing order details
//       const existingDetails = await OrderDetail.find({ order_id: order._id });
//       for (const detail of existingDetails) {
//         const product = await Product.findById(detail.product_id);
//         if (product) {
//           product.current_stock += detail.quantity;
//           await product.save();
//         }
//       }

//       // Delete existing order details
//       await OrderDetail.deleteMany({ order_id: order._id });

//       // Process new order details
//       const newDetailIds = [];
//       subtotal = 0; // Reset subtotal for recalculation

//       for (const detail of order_details) {
//         // Validate product_id and quantity
//         if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
//           return res
//             .status(400)
//             .json({ message: "Invalid product_id or quantity" });
//         }

//         const product = await Product.findById(detail.product_id);
//         if (!product) {
//           return res
//             .status(404)
//             .json({ message: `Product not found: ${detail.product_id}` });
//         }

//         if (product.current_stock < detail.quantity) {
//           return res.status(400).json({
//             message: `Insufficient stock for product: ${detail.product_id}`,
//           });
//         }

//         const orderDetail = new OrderDetail({
//           order_id: order._id,
//           product_id: detail.product_id,
//           product_name: product.product_name, // Adjusted to match schema
//           quantity: detail.quantity,
//           price: product.sell_price,
//         });

//         await orderDetail.save();
//         newDetailIds.push(orderDetail._id);
//         subtotal += detail.quantity * product.sell_price;
//         product.current_stock -= detail.quantity;
//         await product.save();
//       }

//       // Update order with new order_details and recalculated financials
//       order.order_details = newDetailIds;
//       tax = subtotal * 0.1; // 10% tax, consistent with POST
//       total_amount = subtotal + tax;
//       order.subtotal = subtotal;
//       order.tax = tax;
//       order.total_amount = total_amount;
//     }

//     // Save the updated order
//     await order.save();

//     // Populate order_details with product_id (only product_name) and customer_id
//     const populatedOrder = await Order.findById(order._id)
//       .populate({
//         path: "order_details",
//         populate: {
//           path: "product_id",
//           select: "product_name", // Select only name from Product, _id included implicitly
//         },
//       })
//       .populate("customer_id", "name email");

//     res.status(200).json(populatedOrder);
//   } catch (err) {
//     console.error("Error updating order:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // router.patch("/:id", async (req, res) => {
// //   const { customer_id, order_details } = req.body;

// //   try {
// //     // Find the order
// //     const order = await Order.findById(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }

// //     // Initialize financial fields
// //     let subtotal = order.subtotal;
// //     let tax = order.tax;
// //     let total_amount = order.total_amount;

// //     // Update customer_id if provided
// //     if (customer_id) {
// //       order.customer_id = customer_id;
// //     }

// //     // Update order_details if provided
// //     if (order_details) {
// //       // Validate order_details
// //       if (!Array.isArray(order_details) || order_details.length === 0) {
// //         return res.status(400).json({
// //           message: "Invalid input: order_details must be a non-empty array",
// //         });
// //       }

// //       // Restore stock for existing order details
// //       const existingDetails = await OrderDetail.find({ order_id: order._id });
// //       for (const detail of existingDetails) {
// //         const product = await Product.findById(detail.product_id);
// //         if (product) {
// //           product.current_stock += detail.quantity;
// //           await product.save();
// //         }
// //       }

// //       // Delete existing order details
// //       await OrderDetail.deleteMany({ order_id: order._id });

// //       // Process new order details
// //       const newDetailIds = [];
// //       subtotal = 0; // Reset subtotal for recalculation

// //       for (const detail of order_details) {
// //         // Validate product_id and quantity
// //         if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
// //           return res
// //             .status(400)
// //             .json({ message: "Invalid product_id or quantity" });
// //         }

// //         const product = await Product.findById(detail.product_id);
// //         if (!product) {
// //           return res
// //             .status(404)
// //             .json({ message: `Product not found: ${detail.product_id}` });
// //         }

// //         if (product.current_stock < detail.quantity) {
// //           return res.status(400).json({
// //             message: `Insufficient stock for product: ${detail.product_id}`,
// //           });
// //         }

// //         const orderDetail = new OrderDetail({
// //           order_id: order._id,
// //           product_id: detail.product_id,
// //           product_name: product.name, // Use product's name for consistency with POST
// //           quantity: detail.quantity,
// //           price: product.sell_price,
// //         });

// //         await orderDetail.save();
// //         newDetailIds.push(orderDetail._id);
// //         subtotal += detail.quantity * product.sell_price;
// //         product.current_stock -= detail.quantity;
// //         await product.save();
// //       }

// //       // Update order with new order_details and recalculated financials
// //       order.order_details = newDetailIds;
// //       tax = subtotal * 0.1; // 10% tax, consistent with POST
// //       total_amount = subtotal + tax;
// //       order.subtotal = subtotal;
// //       order.tax = tax;
// //       order.total_amount = total_amount;
// //     }

// //     // Save the updated order
// //     await order.save();

// //     // Populate order_details with product_id (only product_name) and customer_id
// //     const populatedOrder = await Order.findById(order._id)
// //       .populate({
// //         path: "order_details",
// //         populate: {
// //           path: "product_id",
// //           select: "product_name", // Select only name from Product, _id included implicitly
// //         },
// //       })
// //       .populate("customer_id", "name email");

// //     res.status(200).json(populatedOrder);
// //   } catch (err) {
// //     console.error("Error updating order:", err);
// //     res.status(400).json({ message: err.message });
// //   }
// // })

// // Delete an order
// router.delete("/:id", async (req, res) => {
//   try {
//     // Find the order
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res
//         .status(404)
//         .json({ message: `Order not found: ${req.params.id}` });
//     }

//     // Restore stock for associated order details
//     const orderDetails = await OrderDetail.find({ order_id: order._id });
//     for (const detail of orderDetails) {
//       const product = await Product.findById(detail.product_id);
//       if (product) {
//         product.current_stock += detail.quantity;
//         await product.save();
//       } else {
//         console.warn(
//           `Product not found for order detail: ${detail.product_id}`,
//         );
//       }
//     }

//     // Delete associated order details
//     await OrderDetail.deleteMany({ order_id: order._id });

//     // Delete the order
//     await Order.findByIdAndDelete(req.params.id);

//     res
//       .status(200)
//       .json({ message: "Order and associated details deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting order:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");
const mongoose = require('mongoose');

const router = express.Router();
// router.get("/", async (req, res) => {
//   try {
//     // Check for filter query parameter
//     const filter = req.query.filter;

//     // Initialize query
//     let query = Order.find()
//       .populate({
//         path: "customer_id",
//         select: "customer_name email phone address city state zip_code discount_rate credit_limit notes is_active",
//       })
//       .populate({
//         path: "order_details",
//         populate: {
//           path: "product_id",
//           select: "product_name",
//         },
//       });

//     // Get current date and time
//     const now = new Date();
    
//     // Apply time-based filters
//     if (filter === "day") {
//       const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//       query = query.where({ createdAt: { $gte: startOfDay } });
//     } else if (filter === "week") {
//       const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
//       startOfWeek.setHours(0, 0, 0, 0);
//       query = query.where({ createdAt: { $gte: startOfWeek } });
//     } else if (filter === "month") {
//       const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//       query = query.where({ createdAt: { $gte: startOfMonth } });
//     } else if (filter === "year") {
//       const startOfYear = new Date(now.getFullYear(), 0, 1);
//       query = query.where({ createdAt: { $gte: startOfYear } });
//     } else if (filter === "recent") {
//       // Existing recent filter
//       query = query.sort({ createdAt: -1 }).limit(5);
//     }

//     // If filter=total_revenue, calculate total revenue only
//     if (filter === "total_revenue") {
//       const orders = await query;
//       const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
//       return res.json({ total_revenue });
//     }

//     // Execute query
//     const orders = await query;

//     // Calculate total_revenue
//     const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

//     // Return full response with orders and total_revenue
//     res.json({
//       orders,
//       total_revenue,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     // Check for filter query parameter
//     const filter = req.query.filter;

//     // Initialize query
//     let query = Order.find()
//       .populate({
//         path: "customer_id",
//         select: "customer_name email phone address city state zip_code discount_rate credit_limit notes is_active",
//       })
//       .populate({
//         path: "order_details",
//         populate: {
//           path: "product_id",
//           select: "product_name",
//         },
//       });

//     // If filter=recent, sort by createdAt descending and limit to 5
//     if (filter === "recent") {
//       query = query.sort({ createdAt: -1 }).limit(5);
//     }

//     // If filter=total_revenue, calculate total revenue only
//     if (filter === "total_revenue") {
//       const orders = await query;
//       const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
//       return res.json({ total_revenue });
//     }

//     // Execute query
//     const orders = await query;

//     // Calculate total_revenue
//     const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

//     // Return full response with orders and total_revenue
//     res.json({
//       orders,
//       total_revenue,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
router.get("/", async (req, res) => {
  try {
    // Check for filter and date query parameters
    const filter = req.query.filter;
    const selectedDate = req.query.date;

    // Initialize query
    let query = Order.find()
      .populate({
        path: "customer_id",
        select: "customer_name email phone address city state zip_code discount_rate credit_limit notes is_active",
      })
      .populate({
        path: "order_details",
        populate: {
          path: "product_id",
          select: "product_name",
        },
      });

    // Get current date and time
    const now = new Date();
    
    // Apply time-based filters
    if (filter === "day" && selectedDate) {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      query = query.where({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
    } else if (filter === "week") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      query = query.where({ createdAt: { $gte: startOfWeek } });
    } else if (filter === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query = query.where({ createdAt: { $gte: startOfMonth } });
    } else if (filter === "year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      query = query.where({ createdAt: { $gte: startOfYear } });
    } else if (filter === "recent") {
      query = query.sort({ createdAt: -1 }).limit(5);
    }

    // If filter=total_revenue, calculate total revenue only
    if (filter === "total_revenue") {
      const orders = await query;
      const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
      return res.json({ total_revenue });
    }

    // Execute query
    const orders = await query;

    // Calculate total_revenue
    const total_revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

    // Return full response with orders and total_revenue
    res.json({
      orders,
      total_revenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.post("/", async (req, res) => {
  const { customer_id, order_details, status } = req.body;
  let subtotal = 0;
  let tax = 0;
  let total_amount = 0;

  // Validate status if provided
  const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
  const orderStatus = status && validStatuses.includes(status) ? status : 'pending';

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

    // Create the order
    const order = new Order({
      customer_id,
      subtotal,
      tax,
      total_amount,
      status: orderStatus,
    });
    await order.save();

    // Store created OrderDetail IDs
    const orderDetailIds = [];

    try {
      // Process each order detail
      for (const detail of order_details) {
        // Validate product_id and quantity
        if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
          throw new Error("Invalid product_id or quantity");
        }

        const product = await Product.findById(detail.product_id);
        if (!product) {
          throw new Error(`Product not found: ${detail.product_id}`);
        }

        if (product.current_stock < detail.quantity) {
          throw new Error(`Insufficient stock for product: ${detail.product_id}`);
        }

        const orderDetail = new OrderDetail({
          order_id: order._id,
          product_id: detail.product_id,
          product_name: detail.product_name || product.product_name,
          quantity: detail.quantity,
          price: product.sell_price,
        });

        await orderDetail.save();
        orderDetailIds.push(orderDetail._id);

        subtotal += detail.quantity * product.sell_price;
        product.current_stock -= detail.quantity;
        await product.save();
      }

      // Calculate tax and total
      tax = subtotal * 0.1; // 10% tax
      total_amount = subtotal + tax;

      // Update order with calculated values and order_detail IDs
      order.subtotal = subtotal;
      order.tax = tax;
      order.total_amount = total_amount; // Fixed the assignment here
      order.order_details = orderDetailIds;
      await order.save();

      // Populate order_details and customer_id
      const populatedOrder = await Order.findById(order._id)
        .populate({
          path: "order_details",
          populate: {
            path: "product_id",
            select: "product_name",
          },
        })
        .populate("customer_id", "name email")
        .exec();

      res.status(201).json(populatedOrder);
    } catch (err) {
      // Clean up if an error occurs
      await Order.deleteOne({ _id: order._id });
      await OrderDetail.deleteMany({ order_id: order._id });
      throw err;
    }
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).json({ message: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  const { customer_id, order_details, status } = req.body;

  try {
    // Find the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Initialize financial fields
    let subtotal = order.subtotal;
    let tax = order.tax;
    let total_amount = order.total_amount;

    // Update customer_id if provided
    if (customer_id) {
      order.customer_id = customer_id;
    }

    // Update status if provided
    if (status) {
      if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      order.status = status;
    }

    // Update order_details if provided
    if (order_details) {
      // Validate order_details
      if (!Array.isArray(order_details) || order_details.length === 0) {
        return res.status(400).json({
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
      subtotal = 0; // Reset subtotal for recalculation

      for (const detail of order_details) {
        // Validate product_id and quantity
        if (!detail.product_id || !detail.quantity || detail.quantity <= 0) {
          return res
            .status(400)
            .json({ message: "Invalid product_id or quantity" });
        }

        const product = await Product.findById(detail.product_id);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product not found: ${detail.product_id}` });
        }

        if (product.current_stock < detail.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product: ${detail.product_id}`,
          });
        }

        const orderDetail = new OrderDetail({
          order_id: order._id,
          product_id: detail.product_id,
          product_name: product.product_name, // Adjusted to match schema
          quantity: detail.quantity,
          price: product.sell_price,
        });

        await orderDetail.save();
        newDetailIds.push(orderDetail._id);
        subtotal += detail.quantity * product.sell_price;
        product.current_stock -= detail.quantity;
        await product.save();
      }

      // Update order with new order_details and recalculated financials
      order.order_details = newDetailIds;
      tax = subtotal * 0.1; // 10% tax, consistent with POST
      total_amount = subtotal + tax;
      order.subtotal = subtotal;
      order.tax = tax;
      order.total_amount = total_amount;
    }

    // Save the updated order
    await order.save();

    // Populate order_details with product_id (only product_name) and customer_id
    const populatedOrder = await Order.findById(order._id)
      .populate({
        path: "order_details",
        populate: {
          path: "product_id",
          select: "product_name", // Select only name from Product, _id included implicitly
        },
      })
      .populate("customer_id", "name email");

    res.status(200).json(populatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(400).json({ message: err.message });
  }
});



// Delete an order
router.delete("/:id", async (req, res) => {
  try {
    // Find the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: `Order not found: ${req.params.id}` });
    }

    // Restore stock for associated order details
    const orderDetails = await OrderDetail.find({ order_id: order._id });
    for (const detail of orderDetails) {
      const product = await Product.findById(detail.product_id);
      if (product) {
        product.current_stock += detail.quantity;
        await product.save();
      } else {
        console.warn(
          `Product not found for order detail: ${detail.product_id}`,
        );
      }
    }

    // Delete associated order details
    await OrderDetail.deleteMany({ order_id: order._id });

    // Delete the order
    await Order.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Order and associated details deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
