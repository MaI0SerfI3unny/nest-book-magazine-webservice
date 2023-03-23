import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})

export class Order extends Document{
    @Prop({default: "created"})
    status: string

    @Prop()
    idSeller: string
    
    @Prop()
    idBuyer: string

    @Prop()
    idBook: string

    @Prop()
    price: number

}

export const OrderSchema = SchemaFactory.createForClass(Order)