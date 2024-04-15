import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';

export enum Role {
  Admin,
  Employee,
}

@Schema({ timestamps: true })
export class Admin {
  @Prop( )
  email: String;
  @Prop( )
  password: String;
  @Prop({ required: true, type: String, enum: Role, default: Role.Employee })
  @IsEnum(Role)
  role: Role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
