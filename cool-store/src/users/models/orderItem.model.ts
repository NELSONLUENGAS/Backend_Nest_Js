import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductModel } from "../../products/models/product.model";

@Schema({ collection: 'orderItems', timestamps: true, versionKey: false })
export class OrderItemModel extends Document {

    @Prop({
        type: Types.ObjectId,
        ref: 'OrderModel',
        required: true
    })
    orderId: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: ProductModel.name,
        required: true
    })
    productId: Types.ObjectId | ProductModel;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItemModel);
