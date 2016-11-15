import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  phone: String,
});

const productSchema = new Schema({
  id: Number,
  productName: String,
  imgName: String,
  price: Number,
  description: String,
  otherDescription: String
});

const orderSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  otherMessage: String,
  orderProductId: String,
  orderProductName: String,
  orderImgName: String,
  orderPrice: Number
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);


export {
  User,
  Product,
  Order
};
