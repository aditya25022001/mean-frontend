interface Product{
  productId:String,
  productName:String,
  price:number,
  modelYear:String,
  description?:String,
  image?:String
}

interface User{
  _id:String,
  name:String,
  email:String,
  isAdmin:Boolean,
  token:String
}

interface AuthState{
  user:User
}

interface SharedState{
  loading:boolean,
  toast:{
    isError:boolean,
    message?:string,
    color?:string
  }
}

export { Product, User, AuthState, SharedState }
