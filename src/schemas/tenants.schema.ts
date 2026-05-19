import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (_, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Tenant {
  @Prop({ required: true })
  appId!: string;

  @Prop({ required: true })
  apiKey!: string;

  @Prop({ required: true })
  url!: string;

  @Prop({ required: true, default: 60 })
  expiryMinutes!: number;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
