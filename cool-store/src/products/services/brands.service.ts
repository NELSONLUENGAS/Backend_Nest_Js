import { Injectable } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { IBrand } from 'src/products/interfaces/brand.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BrandsService {
    private brands: IBrand[] = [
        { id: '1', name: 'TechCorp' },
        { id: '2', name: 'Innovatek' },
        { id: '3', name: 'SoundWave' },
        { id: '4', name: 'TimeTech' },
        { id: '5', name: 'VisionPlus' },
        { id: '6', name: 'PlayNext' },
        { id: '7', name: 'ClickMaster' },
        { id: '8', name: 'PowerUp' },
        { id: '9', name: 'PhotoGenius' }
    ];

    findAll() {
        if (!this.brands.length) {
            return {
                ok: false,
                msg: 'No categories found',
                data: [],
            };
        }
        return {
            ok: true,
            msg: 'Categories fetched successfully!',
            data: this.brands,
        };
    }

    findOne(id: string) {
        const brand = this.brands.find((brand) => brand.id === id);
        if (!brand) {
            return {
                ok: false,
                msg: 'Brand not found',
                data: {},
            };
        }
        return {
            ok: true,
            msg: 'Brand fetched successfully!',
            data: brand,
        };
    }

    create(brand: CreateBrandDto) {
        const id: string = uuidv4()
        const newBrand: IBrand = { id, ...brand };

        this.brands.push(newBrand);

        return {
            ok: true,
            msg: 'Category created successfully!',
            data: newBrand,
        };
    }

    update(id: string, updatedBrand: UpdateBrandDto) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {

            this.brands = this.brands.map((brand) => brand.id == id ? { ...brand, ...updatedBrand } : brand)

            return {
                ...response,
                msg: 'Brand updated successfully!'
            }
        }
    }

    delete(id: string) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {
            this.brands = this.brands.filter((brand) => brand.id != id)

            return {
                ...response,
                msg: 'Brand deleted successfully!'
            }
        }
    }
}
