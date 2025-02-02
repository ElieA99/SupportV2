import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: String;
  @Prop({ required: true })
  password: String;
  @Prop({ default: true })
  isActivated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);