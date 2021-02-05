import express from 'express';
//import data from './data.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 
import router from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import UploadRouter from './routes/uploadRoute.js';

// dotenv.config();

// const mongodbURL = config.MONGODB_URL;


const app = express();
mongoose.connect('mongodb://localhost/E-COMMERCE_APP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.catch((error) => console.log(error.reason));

app.use(bodyParser.json());
app.use('/api/uploads', UploadRouter);
app.use("/api/users", router);
app.use("/api/products", productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
    res.send(product);
    else
    res.status(404).send( {msg: "Product not found."} )
    //res.send('Server is ready');
    res.send(data.products);
});
app.get('/api/products', (req, res) => {
    //res.send('Server is ready');
    res.send(data.products);
});
app.use((err, req, res, next) =>{
  res.status(500).send({ message: err.message });
});

app.listen(5000, () => {console.log("Server at http://localhost:5000")
});