import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { OrderStatus } from "../interfaces/order.interface";
import { OrderItemModel } from "./orderItem.model";
import { CustomerModel } from "./customer.model";
import { forwardRef } from "@nestjs/common";

@Schema({ collection: 'orders', timestamps: true, versionKey: false })
export class OrderModel extends Document {

    @Prop({ type: Types.ObjectId, ref: CustomerModel.name, required: true })
    customerId: Types.ObjectId;

    @Prop({ required: true })
    shippingAddress: string;

    @Prop({ required: true, enum: OrderStatus })
    status: OrderStatus;

    @Prop({
        type: [{
            type: Types.ObjectId,
            ref: forwardRef(() => OrderItemModel.name),
        }],
        required: true
    })
    orderItems: OrderItemModel[];

    @Prop({ required: true })
    totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);

OrderSchema.pre('findOneAndDelete', async function (next) {
    const order = await this.model.findOne(this.getQuery());
    try {
        if (order) {
            await mongoose.model('OrderItem').deleteMany({ _id: { $in: order.orderItems } });
        }

        next();
    } catch (error) {
        next(error);
    }
});
