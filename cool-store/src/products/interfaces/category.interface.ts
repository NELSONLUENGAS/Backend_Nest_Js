import { CategoryModel } from "../models/category.model.ts"
import { IApiServiceResponse } from "./common.interface"

export interface ICategory {
    name: string
}

export interface IApiCategoriesResponse extends IApiServiceResponse {
    data: CategoryModel | CategoryModel[]
}
