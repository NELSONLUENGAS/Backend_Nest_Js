export interface ICustomer {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
}

export interface ICustomerUpdate {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
}
