import { ProductModel } from "../models/product.model"
import { IApiServiceResponse } from "./common.interface"


export interface IProduct {
    name: string
    description: string
    image: string
    price: number
    stock: number
    category: string
    brand: string
}

export interface IApiProductsResponse extends IApiServiceResponse {
    data: ProductModel | ProductModel[]
}
