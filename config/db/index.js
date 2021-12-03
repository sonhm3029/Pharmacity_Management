const mongoose= require('mongoose');

async function connect() {

    try {
        await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/Pharmacy_database');
        console.log("Database is Connected !");        
    } catch (error) {
        console.log("Failed connect to database !!!");
    }
}

module.exports = {connect};
