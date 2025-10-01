import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PasswordLogDocument = HydratedDocument<PasswordLog>;

@Schema({ _id: false, versionKey: false })
export class PasswordLog {
  @Prop({ required: true })
  password: Buffer;

  @Prop({ required: true, default: new Date() })
  changedAt: Date;
}

export const PasswordLogSchema = SchemaFactory.createForClass(PasswordLog);
