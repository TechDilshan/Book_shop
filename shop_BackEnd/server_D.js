// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const pricechartrouter = require('./routes_D/PrintPriceCharts.js');
// const printorderrouter = require('./routes_D/PrintOrders.js');
// const notificationRouter = require('./routes_D/Notifications.js'); 

// const port = 3003;
// const host = 'localhost';

// app.use(cors());
// app.use(express.json());

// const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

// const connect = async () => {
//     try {
//         await mongoose.connect(uri);
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.log('MongoDB Error:', error);
//     }
// };

// connect();

// app.use('/printprice', pricechartrouter);
// app.use('/printorders', printorderrouter);
// app.use('/notifications', notificationRouter);

// const server = app.listen(port, host, () => {
//     console.log(`Node server is listening to ${server.address().port}`);
// });

// // Graceful shutdown
// process.on('SIGINT', () => {
//     mongoose.connection.close(() => {
//         console.log('MongoDB connection closed');
//         server.close(() => {
//             console.log('Server closed');
//             process.exit(0);
//         });
//     });
// });
