import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'brands', timestamps: true, versionKey: false })
export class BrandModel extends Document {

    @Prop({ required: true, unique: true })
    name: string
}


export const BrandSchema = SchemaFactory.createForClass(BrandModel)
