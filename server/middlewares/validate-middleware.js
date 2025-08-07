// // const validate = (schema) => async (req, res, next) => {
// //     try {
// //         const parseBody = await schema.parseAsync(req.body)
// //         req.body = parseBody
// //         next()
// //     } catch (error) {
// //         console.log(error);

// //         res.status(400).json({ msg: "va;idation faield" })
// //     }
// // }
// // module.exports = validate
// const { z } = require('zod');

// const validate = (schema) => async (req, res, next) => {
//     try {
//         const parsedBody = await schema.parseAsync(req.body);
//         req.body = parsedBody;
//         next();
//     } catch (err) {
//         const status = 422
//         const message = 'Fill the input properly'

//         const error = {
//             status,
//             message
//             extraDetails
//         }
//         if (err instanceof z.ZodError) {
//             // Extract and format validation errors
//             const extraDetails = err.issues.map((issue) => ({
//                 field: issue.path.join('.'),
//                 message: issue.message,
//             }));
//             return res.status(400).json({
//                 success: false,
//                 message: "Validation failed",
//                 extraDetails,
//             });
//             console.log(error);
//             next(error)
//         }
//         // Handle unexpected errors
//         console.error(error);
//         next(error)
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };

// module.exports = validate;

const { z } = require('zod');

const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Extract and format validation errors
            const extraDetails = err.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            const error = {
                status: 400,
                message: 'Validation failed',
                extraDetails,
            };
            return next(error);
        }
        // Handle unexpected errors
        const error = {
            status: 500,
            message: 'Internal server error',
            extraDetails: 'Unexpected error occurred',
        };
        console.error(err);
        return next(error);
    }
};

module.exports = validate;