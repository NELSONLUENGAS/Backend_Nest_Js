import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "../interfaces/user.interface";


@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class UserModel {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true, type: [String], enum: UserRole, default: UserRole.USER })
    role: UserRole[];

    @Prop({ required: false })
    phone?: string;

    @Prop({ required: false })
    address?: string;

    @Prop({ required: false })
    profilePicture?: string;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
