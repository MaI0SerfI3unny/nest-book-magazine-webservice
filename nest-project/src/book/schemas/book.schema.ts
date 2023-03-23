import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum Category {
    ADVENTURE = "Adventure",
    CRIME = "Crime",
    FANTASY = "Fantasy"
}

@Schema({
    timestamps:true
})

export class Book{
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    author: string;

    @Prop({required: true})
    photo: string;

    @Prop()
    price: number;

    @Prop({default: "UAH"})
    currency: string
    
    @Prop()
    category: Category

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: string
}

export const BookSchema = SchemaFactory.createForClass(Book)