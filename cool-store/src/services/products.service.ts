import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { IProduct } from 'src/interfaces/product.interface';
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
            brand: 'TechCorp'
        },
        {
            id: '2',
            name: 'Laptop ABC',
            description: 'Lightweight laptop with 16GB RAM and 512GB SSD.',
            image: 'https://example.com/products/laptop_abc.jpg',
            price: 899.99,
            stock: 15,
            category: 'Electronics',
            brand: 'Innovatek'
        },
        {
            id: '3',
            name: 'Wireless Headphones',
            description: 'Noise-cancelling wireless headphones with 20 hours of battery life.',
            image: 'https://example.com/products/headphones.jpg',
            price: 120.99,
            stock: 50,
            category: 'Audio',
            brand: 'SoundWave'
        },
        {
            id: '4',
            name: 'Smartwatch Pro',
            description: 'A stylish smartwatch with health tracking features.',
            image: 'https://example.com/products/smartwatch_pro.jpg',
            price: 199.99,
            stock: 30,
            category: 'Wearables',
            brand: 'TimeTech'
        },
        {
            id: '5',
            name: '4K TV 55"',
            description: 'Ultra HD 4K television with smart features and 55-inch display.',
            image: 'https://example.com/products/4k_tv.jpg',
            price: 649.99,
            stock: 10,
            category: 'Electronics',
            brand: 'VisionPlus'
        },
        {
            id: '6',
            name: 'Gaming Console XYZ',
            description: 'Next-gen gaming console with 1TB storage and 4K output.',
            image: 'https://example.com/products/gaming_console.jpg',
            price: 399.99,
            stock: 25,
            category: 'Gaming',
            brand: 'PlayNext'
        },
        {
            id: '7',
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with long battery life.',
            image: 'https://example.com/products/wireless_mouse.jpg',
            price: 19.99,
            stock: 100,
            category: 'Accessories',
            brand: 'ClickMaster'
        },
        {
            id: '8',
            name: 'Portable Charger',
            description: 'Compact power bank with 10,000mAh capacity.',
            image: 'https://example.com/products/portable_charger.jpg',
            price: 29.99,
            stock: 75,
            category: 'Accessories',
            brand: 'PowerUp'
        },
        {
            id: '9',
            name: 'Bluetooth Speaker',
            description: 'Water-resistant Bluetooth speaker with 12 hours of playtime.',
            image: 'https://example.com/products/bluetooth_speaker.jpg',
            price: 59.99,
            stock: 40,
            category: 'Audio',
            brand: 'SoundWave'
        },
        {
            id: '10',
            name: 'Digital Camera',
            description: 'High-resolution digital camera with a 24MP sensor.',
            image: 'https://example.com/products/digital_camera.jpg',
            price: 299.99,
            stock: 18,
            category: 'Photography',
            brand: 'PhotoGenius'
        },
        {
            id: '11',
            name: 'Smart Refrigerator',
            description: 'A smart refrigerator with Wi-Fi and voice control.',
            image: 'https://example.com/products/smart_refrigerator.jpg',
            price: 1499.99,
            stock: 5,
            category: 'Home Appliances',
            brand: 'KitchenPro'
        },
        {
            id: '12',
            name: 'Gaming Chair',
            description: 'Comfortable gaming chair with ergonomic design.',
            image: 'https://example.com/products/gaming_chair.jpg',
            price: 199.99,
            stock: 20,
            category: 'Furniture',
            brand: 'ErgoChairs'
        },
        {
            id: '13',
            name: 'Drone X5',
            description: 'Drone with 4K camera and GPS tracking.',
            image: 'https://example.com/products/drone_x5.jpg',
            price: 399.99,
            stock: 12,
            category: 'Photography',
            brand: 'AeroTech'
        },
        {
            id: '14',
            name: 'Electric Kettle',
            description: 'Fast boiling electric kettle with 1.7L capacity.',
            image: 'https://example.com/products/electric_kettle.jpg',
            price: 49.99,
            stock: 30,
            category: 'Home Appliances',
            brand: 'QuickBoil'
        },
        {
            id: '15',
            name: 'Running Shoes',
            description: 'Lightweight running shoes for everyday use.',
            image: 'https://example.com/products/running_shoes.jpg',
            price: 79.99,
            stock: 60,
            category: 'Footwear',
            brand: 'AthleteGear'
        },
        {
            id: '16',
            name: 'Tablet Pro',
            description: 'High-performance tablet with stylus support.',
            image: 'https://example.com/products/tablet_pro.jpg',
            price: 599.99,
            stock: 25,
            category: 'Electronics',
            brand: 'Innovatek'
        },
        {
            id: '17',
            name: 'Action Camera',
            description: 'Durable action camera with 4K recording.',
            image: 'https://example.com/products/action_camera.jpg',
            price: 199.99,
            stock: 35,
            category: 'Photography',
            brand: 'PhotoGenius'
        },
        {
            id: '18',
            name: 'Fitness Tracker',
            description: 'Fitness tracker with heart rate monitoring.',
            image: 'https://example.com/products/fitness_tracker.jpg',
            price: 49.99,
            stock: 80,
            category: 'Wearables',
            brand: 'FitLife'
        },
        {
            id: '19',
            name: 'Smart Thermostat',
            description: 'Energy-saving smart thermostat with app control.',
            image: 'https://example.com/products/smart_thermostat.jpg',
            price: 249.99,
            stock: 10,
            category: 'Home Appliances',
            brand: 'EcoSmart'
        },
        {
            id: '20',
            name: 'Electric Scooter',
            description: 'Eco-friendly electric scooter with a 25-mile range.',
            image: 'https://example.com/products/electric_scooter.jpg',
            price: 499.99,
            stock: 15,
            category: 'Transportation',
            brand: 'EcoRide'
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

    create(product: CreateProductDto) {
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

    update(id: string, productUpdated: UpdateProductDto) {
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
