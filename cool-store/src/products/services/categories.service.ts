import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/categories.dto';
import { ICategory } from 'src/products/interfaces/category.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
    private categories: ICategory[] = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Audio' },
        { id: '3', name: 'Wearables' },
        { id: '4', name: 'Gaming' },
        { id: '5', name: 'Accessories' },
        { id: '6', name: 'Photography' },
        { id: '7', name: 'Home Appliances' },
        { id: '8', name: 'Clothing' },
        { id: '9', name: 'Footwear' }
    ];

    findAll() {
        if (!this.categories.length) {
            return {
                ok: false,
                msg: 'No categories found',
                data: [],
            };
        }
        return {
            ok: true,
            msg: 'Categories fetched successfully!',
            data: this.categories,
        };
    }

    findOne(id: string) {
        const category = this.categories.find((cat) => cat.id === id);
        if (!category) {
            return {
                ok: false,
                msg: 'Category not found',
                data: {},
            };
        }
        return {
            ok: true,
            msg: 'Category fetched successfully!',
            data: category,
        };
    }

    create(category: CreateCategoryDto) {
        const id: string = uuidv4()
        const newCategory: ICategory = { id, ...category };

        this.categories.push(newCategory);

        return {
            ok: true,
            msg: 'Category created successfully!',
            data: newCategory,
        };
    }

    update(id: string, updatedCategory: UpdateCategoryDto) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {

            this.categories = this.categories.map((category) => category.id == id ? { ...category, ...updatedCategory } : category)

            return {
                ...response,
                msg: 'Category updated successfully!'
            }
        }
    }

    delete(id: string) {
        const response = this.findOne(id)
        if (!response.ok) {

            return response
        } else {
            this.categories = this.categories.filter((category) => category.id != id)

            return {
                ...response,
                msg: 'Category deleted successfully!'
            }
        }
    }
}
