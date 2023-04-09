interface Product{
  productId:String,
  productName:String,
  price:Number,
  modelYear:String,
  description?:String
}

interface User{
  _id:String,
  name:String,
  email:String,
  isAdmin:Boolean,
  token:String
}

export { Product, User }
