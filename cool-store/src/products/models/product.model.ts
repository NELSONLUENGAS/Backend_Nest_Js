import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { BrandModel } from "./brand.model";
import { CategoryModel } from "./category.model.ts";

@Schema({ collection: 'products', timestamps: true, versionKey: false })
export class ProductModel extends Document {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    image: string

    @Prop({ type: "Number", required: true, index: true })
    price: number

    @Prop({ type: "Number", required: true })
    stock: number

    @Prop({ required: true, ref: CategoryModel.name, type: Types.ObjectId })
    category: CategoryModel | Types.ObjectId

    @Prop({ required: true, ref: BrandModel.name, type: Types.ObjectId })
    brand: BrandModel | Types.ObjectId

}


export const ProductSchema = SchemaFactory.createForClass(ProductModel)
ProductSchema.index({ price: 1, stock: -1 })
