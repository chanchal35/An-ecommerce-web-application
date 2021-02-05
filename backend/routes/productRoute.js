import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


const productRouter = express.Router();

productRouter.get("/", expressAsyncHandler( async (req, res) =>{
  const products =  await Product.find({});
  res.send(products);
}));

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});

productRouter.post("/", expressAsyncHandler(async (req, res) =>{
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });
  const newProduct = await product.save();
  if(newProduct) {
   return res.status(201).send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
}));

productRouter.put("/:id", expressAsyncHandler(async (req, res) =>{
  const productId = req.params.id;
  const product = await Product.findById({_id:productId});
  if(product){
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
  if(updatedProduct) {
   return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
  }
 } 
  return res.status(500).send({ message: ' Error in Updating Product.' });
  
}));
productRouter.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

export default productRouter;