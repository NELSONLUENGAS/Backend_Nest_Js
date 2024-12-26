import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customers.dto';
import { ICustomer } from 'src/users/interfaces/customer.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {

    private customers: ICustomer[] = [
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-1234', address: '123 Main St, Springfield' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '555-5678', address: '456 Elm St, Metropolis' },
        { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
        { id: '4', firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', address: '789 Oak St, Gotham' },
        { id: '5', firstName: 'Charlie', lastName: 'Miller', email: 'charlie.miller@example.com', phone: '555-4321' },
        { id: '6', firstName: 'Diana', lastName: 'Evans', email: 'diana.evans@example.com', phone: '555-6789', address: '321 Pine St, Star City' },
        { id: '7', firstName: 'Eve', lastName: 'Davis', email: 'eve.davis@example.com', phone: '555-9876', address: '987 Maple Ave, Central City' },
        { id: '8', firstName: 'Frank', lastName: 'Wilson', email: 'frank.wilson@example.com' },
        { id: '9', firstName: 'Grace', lastName: 'White', email: 'grace.white@example.com', address: '456 Birch Blvd, Coast City' },
        { id: '10', firstName: 'Hank', lastName: 'Taylor', email: 'hank.taylor@example.com', phone: '555-3456' },
        { id: '11', firstName: 'Ivy', lastName: 'Anderson', email: 'ivy.anderson@example.com', phone: '555-6543', address: '789 Cedar Ct, National City' },
        { id: '12', firstName: 'Jack', lastName: 'Thomas', email: 'jack.thomas@example.com', phone: '555-8765', address: '111 Elmwood Dr, Keystone City' },
        { id: '13', firstName: 'Karen', lastName: 'Moore', email: 'karen.moore@example.com' },
        { id: '14', firstName: 'Leo', lastName: 'Martin', email: 'leo.martin@example.com', phone: '555-2345' },
        { id: '15', firstName: 'Mona', lastName: 'Clark', email: 'mona.clark@example.com', address: '333 Willow Ln, Hub City' },
        { id: '16', firstName: 'Nick', lastName: 'Hall', email: 'nick.hall@example.com', phone: '555-5432', address: '444 Oakwood Rd, Ivy Town' },
        { id: '17', firstName: 'Olivia', lastName: 'Allen', email: 'olivia.allen@example.com', phone: '555-7890' },
        { id: '18', firstName: 'Paul', lastName: 'Young', email: 'paul.young@example.com', address: '555 Spruce St, Opal City' },
        { id: '19', firstName: 'Quinn', lastName: 'King', email: 'quinn.king@example.com', phone: '555-9870' },
        { id: '20', firstName: 'Rita', lastName: 'Scott', email: 'rita.scott@example.com', phone: '555-2109', address: '777 Redwood Ave, Happy Harbor' },
    ];

    findAll(limit: number, page: number) {
        const offset = Math.abs(page - 1) * limit
        const customers = this.customers.slice(offset, offset + limit);
        if (!customers.length) {

            return {
                ok: false,
                data: [],
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                msg: 'customers fetched successfully!',
                data: customers
            }
        }
    }

    findOne(id: string) {
        const customer = this.customers.find((customer) => customer.id == id)
        if (!customer) {

            return {
                ok: false,
                data: {},
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                data: customer,
                msg: 'Customer fetched successfully!',
            }
        }
    }

    search(query: string) {
        const customers = this.customers.filter((customer) =>
            Object.values(customer).some((value) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            ))

        if (!customers.length) {

            return {
                ok: false,
                data: [],
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                msg: 'Customers fetched successfully!',
                data: customers
            }
        }
    }

    create(customer: CreateCustomerDto) {
        const id: string = uuidv4()

        const newcustomer = {
            ...customer,
            id
        }

        this.customers.push(newcustomer)

        return {
            ok: true,
            data: newcustomer,
            msg: 'customer created successfully!',
        }
    }

    update(id: string, customerUpdated: UpdateCustomerDto) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {

            this.customers = this.customers.map((customer) => customer.id == id ? { ...customer, ...customerUpdated } : customer)

            return {
                ...response,
                msg: 'Customer updated successfully!'
            }
        }
    }

    delete(id: string) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {
            this.customers = this.customers.filter((customer) => customer.id != id)

            return {
                ...response,
                msg: 'Customer Deleted successfully!'
            }
        }
    }
}
