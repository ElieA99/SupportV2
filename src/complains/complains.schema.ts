import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { Admin } from 'src/admin/admin.schema';
import { Category } from 'src/category/category.schema';
export enum Status {
  PENDING,
  INPROGRESS,
  RESOLVED,
  REJECTED,
}

@Schema({ timestamps: true })
export class Complaint {
  @Prop(  )
  title: String;
  @Prop( )
  description: String;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
  @Prop({ type: String, enum: Status, default: "PENDING" })
  @IsEnum(Status)
status: String;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop()
  createdAt: Date;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
