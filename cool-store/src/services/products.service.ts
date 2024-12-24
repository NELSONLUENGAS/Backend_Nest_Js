import { Injectable } from '@nestjs/common';
import { IProduct, IProductCreate, IProductUpdate } from 'src/interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ProductsService {
    private products: IProduct[] = [
        {
            id: '1',
            name: 'Smartphone XYZ',
            description: 'A high-performance smartphone with 128GB storage.',
            image: 'https://example.com/products/smartphone_xyz.jpg',
            price: 499.99,
            stock: 20,
            category: 'Electronics',
        },
        {
            id: '2',
            name: 'Laptop ABC',
            description: 'Lightweight laptop with 16GB RAM and 512GB SSD.',
            image: 'https://example.com/products/laptop_abc.jpg',
            price: 899.99,
            stock: 15,
            category: 'Electronics',
        },
        {
            id: '3',
            name: 'Wireless Headphones',
            description: 'Noise-cancelling wireless headphones with 20 hours of battery life.',
            image: 'https://example.com/products/headphones.jpg',
            price: 120.99,
            stock: 50,
            category: 'Audio',
        },
        {
            id: '4',
            name: 'Smartwatch Pro',
            description: 'A stylish smartwatch with health tracking features.',
            image: 'https://example.com/products/smartwatch_pro.jpg',
            price: 199.99,
            stock: 30,
            category: 'Wearables',
        },
        {
            id: '5',
            name: '4K TV 55"',
            description: 'Ultra HD 4K television with smart features and 55-inch display.',
            image: 'https://example.com/products/4k_tv.jpg',
            price: 649.99,
            stock: 10,
            category: 'Electronics',
        },
        {
            id: '6',
            name: 'Gaming Console XYZ',
            description: 'Next-gen gaming console with 1TB storage and 4K output.',
            image: 'https://example.com/products/gaming_console.jpg',
            price: 399.99,
            stock: 25,
            category: 'Gaming',
        },
        {
            id: '7',
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with long battery life.',
            image: 'https://example.com/products/wireless_mouse.jpg',
            price: 19.99,
            stock: 100,
            category: 'Accessories',
        },
        {
            id: '8',
            name: 'Portable Charger',
            description: 'Compact power bank with 10,000mAh capacity.',
            image: 'https://example.com/products/portable_charger.jpg',
            price: 29.99,
            stock: 75,
            category: 'Accessories',
        },
        {
            id: '9',
            name: 'Bluetooth Speaker',
            description: 'Water-resistant Bluetooth speaker with 12 hours of playtime.',
            image: 'https://example.com/products/bluetooth_speaker.jpg',
            price: 59.99,
            stock: 40,
            category: 'Audio',
        },
        {
            id: '10',
            name: 'Digital Camera',
            description: 'High-resolution digital camera with a 24MP sensor.',
            image: 'https://example.com/products/digital_camera.jpg',
            price: 299.99,
            stock: 18,
            category: 'Photography',
        },
        {
            id: '11',
            name: 'Electric Kettle',
            description: 'Stainless steel electric kettle with automatic shutoff.',
            image: 'https://example.com/products/electric_kettle.jpg',
            price: 39.99,
            stock: 55,
            category: 'Home Appliances',
        },
        {
            id: '12',
            name: 'Blender Pro',
            description: 'High-speed blender with multiple speed settings.',
            image: 'https://example.com/products/blender_pro.jpg',
            price: 89.99,
            stock: 35,
            category: 'Home Appliances',
        },
        {
            id: '13',
            name: 'Smart Refrigerator',
            description: 'Smart refrigerator with touchscreen control and Wi-Fi connectivity.',
            image: 'https://example.com/products/smart_fridge.jpg',
            price: 1499.99,
            stock: 8,
            category: 'Home Appliances',
        },
        {
            id: '14',
            name: 'Kitchen Mixer',
            description: 'Stand mixer with multiple attachments for baking and cooking.',
            image: 'https://example.com/products/kitchen_mixer.jpg',
            price: 169.99,
            stock: 20,
            category: 'Home Appliances',
        },
        {
            id: '15',
            name: 'Men\'s Jacket',
            description: 'Stylish men’s jacket, perfect for winter weather.',
            image: 'https://example.com/products/mens_jacket.jpg',
            price: 79.99,
            stock: 50,
            category: 'Clothing',
        },
        {
            id: '16',
            name: 'Women\'s Sweater',
            description: 'Soft and warm women’s sweater in multiple colors.',
            image: 'https://example.com/products/womens_sweater.jpg',
            price: 49.99,
            stock: 60,
            category: 'Clothing',
        },
        {
            id: '17',
            name: 'Running Shoes',
            description: 'Lightweight and breathable running shoes for men and women.',
            image: 'https://example.com/products/running_shoes.jpg',
            price: 69.99,
            stock: 100,
            category: 'Footwear',
        },
        {
            id: '18',
            name: 'Leather Wallet',
            description: 'Premium leather wallet with RFID blocking.',
            image: 'https://example.com/products/leather_wallet.jpg',
            price: 39.99,
            stock: 200,
            category: 'Accessories',
        },
        {
            id: '19',
            name: 'Backpack Pro',
            description: 'Durable and spacious backpack with a laptop compartment.',
            image: 'https://example.com/products/backpack_pro.jpg',
            price: 49.99,
            stock: 120,
            category: 'Accessories',
        },
        {
            id: '20',
            name: 'Sports Watch',
            description: 'Water-resistant sports watch with GPS and heart rate monitor.',
            image: 'https://example.com/products/sports_watch.jpg',
            price: 129.99,
            stock: 30,
            category: 'Wearables',
        }
    ]

    findAll(limit: number, page: number) {
        const offset = Math.abs(page - 1) * limit
        const products = this.products.slice(offset, offset + limit);
        if (!products.length) {

            return {
                ok: false,
                data: [],
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                msg: 'Products fetched successfully!',
                data: products
            }
        }
    }

    findAllByCategory(name: string) {
        const products = this.products.filter((product) => product.category.toLowerCase() === name.toLowerCase())

        if (!products.length) {

            return {
                ok: false,
                data: [],
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                msg: 'Products fetched successfully!',
                data: products
            }
        }
    }

    findOne(id: string) {
        const product = this.products.find((product) => product.id == id)
        if (!product) {

            return {
                ok: false,
                data: {},
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                data: product,
                msg: 'Product fetched successfully!',
            }
        }
    }

    search(query: string) {
        const products = this.products.filter((product) =>
            Object.values(product).some((value) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            ))

        if (!products.length) {

            return {
                ok: false,
                data: [],
                msg: 'No data found'
            }
        } else {

            return {
                ok: true,
                msg: 'Products fetched successfully!',
                data: products
            }
        }
    }

    create(product: IProductCreate) {
        const id: string = uuidv4()

        const newProduct = {
            ...product,
            id
        }

        this.products.push(newProduct)

        return {
            ok: true,
            data: newProduct,
            msg: 'Product created successfully!',
        }
    }

    update(id: string, productUpdated: IProductUpdate) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {

            this.products = this.products.map((product) => product.id == id ? { ...product, ...productUpdated } : product)

            return {
                ...response,
                msg: 'Product updated successfully!'
            }
        }
    }

    delete(id: string) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {
            this.products = this.products.filter((product) => product.id != id)

            return {
                ...response,
                msg: 'Product Deleted successfully!'
            }
        }
    }
}
