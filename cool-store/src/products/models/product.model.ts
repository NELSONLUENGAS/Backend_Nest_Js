import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ProductModel extends Document {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    image: string

    @Prop({ type: "Number", required: true })
    price: number

    @Prop({ type: "Number", required: true })
    stock: number

    @Prop({ required: true })
    category: string

    @Prop({ required: true })
    brand: string

}


export const ProductSchema = SchemaFactory.createForClass(ProductModel)
