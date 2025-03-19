module.exports = () => {
    const mongoose = require("mongoose")
    try {
        mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log(`mongoose is connected.`))
    } catch(err) {
        console.log(err.message);
        
    }
}