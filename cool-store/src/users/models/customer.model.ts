import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { OrderModel } from "./order.model";
import { forwardRef } from "@nestjs/common";

@Schema({ collection: 'customers', timestamps: true, versionKey: false })
export class CustomerModel extends Document {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    address: string;

    @Prop({ default: '' })
    city?: string;

    @Prop({ default: '' })
    country?: string;

    @Prop({ default: '' })
    zipCode?: string;

    @Prop({ default: false })
    isActive?: boolean;

    @Prop({
        type: [{
            type: Types.ObjectId,
            ref: forwardRef(() => OrderModel.name)
        }]
    })
    orders: Types.ObjectId[];
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerModel);

CustomerSchema.pre('findOneAndDelete', async function (next) {
    const customerId = this.getQuery().id;
    try {
        await mongoose.model(OrderModel.name).deleteMany({ customerId: customerId });

        next();
    } catch (error) {
        next(error);
    }
});
