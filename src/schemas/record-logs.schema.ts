import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecordLogDocument = HydratedDocument<RecordLog>;

@Schema({ _id: false, versionKey: false })
export class RecordLog {
  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  createdBy: number;

  @Prop()
  modifiedAt: Date;

  @Prop()
  modifiedBy: number;
}

export const RecordLogSchema = SchemaFactory.createForClass(RecordLog);
