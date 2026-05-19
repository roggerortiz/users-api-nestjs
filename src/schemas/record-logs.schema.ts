import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecordLogDocument = HydratedDocument<RecordLog>;

@Schema({ _id: false, versionKey: false })
export class RecordLog {
  @Prop({ required: true, default: new Date() })
  createdAt!: Date;

  @Prop({ required: true })
  createdBy!: number;

  @Prop({ required: false })
  modifiedAt?: Date;

  @Prop({ required: false })
  modifiedBy?: number;

  @Prop({ required: false, default: false })
  isDeleted: boolean = false;

  @Prop({ required: false })
  deletionReason?: string;
}

export const RecordLogSchema = SchemaFactory.createForClass(RecordLog);
