export interface IProduct {
    id: string
    name: string
    description: string
    image: string
    price: number
    stock: number
    category: string
}

export interface IProductCreate {
    name: string
    description: string
    image: string
    price: number
    stock: number
    category: string
}

export interface IProductUpdate {
    name?: string
    description?: string
    image?: string
    price?: number
    stock?: number
    category?: string
}
