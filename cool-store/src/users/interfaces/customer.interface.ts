import { CustomerModel } from "../models/customer.model.js";
import { IApiServiceResponse } from "./common.interface";
import { IOrder } from "./order.interface.js";

export interface ICustomer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    country?: string;
    zipCode?: string;
    registrationDate?: Date;
    isActive?: boolean;
    orders: IOrder[];
}
export interface IApiCustomerResponse extends IApiServiceResponse {
    data: CustomerModel | CustomerModel[]
}
