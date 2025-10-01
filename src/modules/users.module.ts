import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'controllers/users.controller';
import { CryptoHelper } from 'helpers/crypto.helper';
import { User, UserSchema } from 'schemas/users.schema';
import { UsersService } from 'services/users.service';
import { CountersModule } from './counters.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CountersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CryptoHelper],
})
export class UsersModule {}
