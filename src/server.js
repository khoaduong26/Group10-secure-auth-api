const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();


app.use(express.json());


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;


sequelize.sync({ alter: true }) 
    .then(() => {
        console.log("Database & tables synced!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });