// const adminMiddleware = async (req, res, next) => {
//     try {
//         console.log(req.user);
//         const adminRole = req.user.isAdmin;
//         if (!adminRole) {
//             return res
//                 .status(403).json({ message: "Access Denied, User is not admin" })
//         }
//         // res.status(200).json({msh:"req.user.isAdmin"})
//         // If user is an admin, proceed to the middleware
//         next()
//         res.status(200).json({ message: req.user })
//     } catch (error) {
//         next(error)
//     }
// }
const adminMiddleware = async (req, res, next) => {
    try {
        console.log('req.user:', req.user); // Debug: Log user data
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access Denied, User is not admin' });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Admin middleware error:', error.message);
        next(error); // Pass error to error middleware
    }
};
module.exports = adminMiddleware