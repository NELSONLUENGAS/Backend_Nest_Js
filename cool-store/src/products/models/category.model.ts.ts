import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'categories', timestamps: true, versionKey: false })
export class CategoryModel extends Document {

    @Prop({ required: true, unique: true })
    name: string
}


export const CategorySchema = SchemaFactory.createForClass(CategoryModel)
