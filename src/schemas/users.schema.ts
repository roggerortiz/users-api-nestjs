import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PasswordLog, PasswordLogSchema } from './password-logs.schema';
import { RecordLog, RecordLogSchema } from './record-logs.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (_, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.salt;
      delete ret.token;
      delete ret.passwordLogs;
      delete ret.recordLog;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  userId!: number;

  @Prop({ required: true })
  givenName!: string;

  @Prop({ required: true })
  familyName!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: Buffer;

  @Prop({ required: true })
  salt!: string;

  @Prop({ required: false })
  token?: string;

  @Prop({ required: true })
  accountStateId!: number;

  @Prop({ schema: [PasswordLogSchema], required: true })
  passwordLogs!: PasswordLog[];

  @Prop({ schema: RecordLogSchema, required: true })
  recordLog!: RecordLog;
}

export const UserSchema = SchemaFactory.createForClass(User);
