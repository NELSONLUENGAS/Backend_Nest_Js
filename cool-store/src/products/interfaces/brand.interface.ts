import { IApiServiceResponse } from "./common.interface"

export interface IBrand {
    _id: string
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IApiBrandsResponse extends IApiServiceResponse {
    data: IBrand | IBrand[]
}
