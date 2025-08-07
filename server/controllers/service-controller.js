const Service = require('../models/service-model')
const services = async (req, res) => {
    try {
        const response = await Service.find()
        if (!response) {
            res.status(404).json({ message: "No Service Found" })
            return
        }
        res.status(200).json({ data: response })
    } catch (error) {
        console.log(`Services :${error}`);

    }
}
module.exports = services