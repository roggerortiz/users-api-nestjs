import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RecordLog, RecordLogSchema } from './record-logs.schema';

export type ForgottenPasswordDocument = HydratedDocument<ForgottenPassword>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (_, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.recordLog;
      return ret;
    },
  },
})
export class ForgottenPassword {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  token!: string;

  @Prop({ schema: RecordLogSchema, required: true })
  recordLog!: RecordLog;
}

export const ForgottenPasswordSchema =
  SchemaFactory.createForClass(ForgottenPassword);
