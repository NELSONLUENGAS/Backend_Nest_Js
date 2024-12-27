import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { IProduct } from 'src/products/interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid'
import { ProductModel } from '../models/product.model';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';


@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(ProductModel.name) private productModel: Model<ProductModel>
    ) { }

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

        return from(
            this.productModel
                .find()
                .skip(offset)
                .limit(limit)
                .exec()
        ).pipe(
            map((products) => {
                if (products.length === 0) {
                    return {
                        ok: false,
                        data: [],
                        msg: 'No data found',
                    };
                } else {
                    return {
                        ok: true,
                        msg: 'Products fetched successfully!',
                        data: products,
                    };
                }
            }),
            catchError((error) => {
                return of({
                    ok: false,
                    data: [],
                    msg: `Error fetching data: ${error.message}`,
                });
            })
        );
    }

    findByCategory(name: string) {

        return from(
            this.productModel
                .find()
                .where({
                    category: name
                })
                .exec()
        ).pipe(
            map((products) => {
                if (products.length === 0) {
                    return {
                        ok: false,
                        data: [],
                        msg: 'No data found',
                    };
                } else {
                    return {
                        ok: true,
                        msg: 'Products fetched successfully!',
                        data: products,
                    };
                }
            }),
            catchError((error) => {
                return of({
                    ok: false,
                    data: [],
                    msg: `Error fetching data: ${error.message}`,
                });
            })
        )
    }

    findOne(id: string) {
        return from(
            this.productModel
                .findById(id)
                .exec()
        ).pipe(
            map((product) => {
                if (!product) {
                    return {
                        ok: false,
                        data: [],
                        msg: 'No data found',
                    };
                } else {
                    return {
                        ok: true,
                        msg: 'Product fetched successfully!',
                        data: product,
                    };

                }
            }),
            catchError((error) => {
                return of({
                    ok: false,
                    data: [],
                    msg: `Error fetching data: ${error.message}`,
                });
            })
        )
    }

    search(query: string) {

        return of(query).pipe(
            switchMap((queryTerm) => {
                return from(
                    this.productModel
                        .find({
                            $or: [
                                { name: { $regex: queryTerm, $options: 'i' } },
                                { description: { $regex: queryTerm, $options: 'i' } },
                                { category: { $regex: queryTerm, $options: 'i' } },
                            ],
                        }).exec()
                ).pipe(
                    map((products) => {
                        if (!products || products.length === 0) {
                            return {
                                ok: false,
                                data: [],
                                msg: 'No data found',
                            };
                        } else {
                            return {
                                ok: true,
                                msg: 'Products fetched successfully!',
                                data: products,
                            };
                        }
                    }),
                    catchError((error) => {
                        return of({
                            ok: false,
                            data: [],
                            msg: `Error fetching data: ${error.message}`,
                        });
                    })
                );
            })
        );
    }

    create(product: CreateProductDto) {
        return from(this.productModel.create(product)).pipe(
            map(savedProduct => ({
                ok: true,
                msg: 'Product created successfully!',
                data: savedProduct
            })),
            catchError(error => of({
                ok: false,
                msg: `Error creating product: ${error.message}`,
                data: []
            }))
        );
    }

    update(id: string, productUpdated: UpdateProductDto) {
        return this.findOne(id)
            .pipe(
                switchMap((response) => {
                    if (!response.ok) {
                        return of(response)
                    }

                    return from(
                        this.productModel.updateOne({ _id: id }, productUpdated)
                    ).pipe(
                        map((result) => {
                            if (result.modifiedCount > 0) {
                                return {
                                    ok: true,
                                    msg: 'Product updated successfully!',
                                    data: result,
                                };
                            } else {
                                return {
                                    ok: false,
                                    msg: 'No changes made to the product',
                                    data: [],
                                };
                            }
                        }),
                        catchError((error) => {
                            return of({
                                ok: false,
                                msg: `Error updating product: ${error.message}`,
                                data: [],
                            });
                        })
                    );
                }),
                catchError((error) => {
                    return of({
                        ok: false,
                        msg: `Error: ${error.message}`,
                        data: [],
                    });
                })
            )
    }

    delete(id: string) {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response)
                }

                return from(this.productModel.deleteOne({ _id: id })).pipe(
                    map((result) => {
                        if (result.deletedCount > 0) {
                            return {
                                ok: true,
                                msg: 'Product deleted successfully!',
                                data: [],
                            };
                        } else {
                            return {
                                ok: false,
                                msg: 'Product not found to delete',
                                data: [],
                            };
                        }
                    }),
                    catchError((error) => {
                        return of({
                            ok: false,
                            msg: `Error deleting product: ${error.message}`,
                            data: [],
                        });
                    })
                );
            }),
            catchError((error) => {
                return of({
                    ok: false,
                    msg: `Error: ${error.message}`,
                    data: [],
                });
            })
        );
    }
}
