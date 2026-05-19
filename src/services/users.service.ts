import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CryptoHelper } from 'helpers/crypto.helper';
import { Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import { User, UserDocument } from 'schemas/users.schema';
import { CreateUserDto } from 'types/dtos/users/create-user.dto';
import { FindAllUsersDto } from 'types/dtos/users/find-all-users.dto';
import { RemoveUserDto } from 'types/dtos/users/remove-user.dto';
import { UpdateUserDto } from 'types/dtos/users/update-user.dto';
import { AccountState } from 'types/enums/account-state';
import { CountersService } from './counters.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly countersService: CountersService,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async findAll(dto: FindAllUsersDto): Promise<User[]> {
    return this.userModel.find(dto).exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const userId: number = await this.countersService.nextValue('userId');
    const salt: string = this.cryptoHelper.randomUUID();
    const password: Buffer = this.cryptoHelper.createHash(dto.password, salt);
    const createdUser = new this.userModel({
      ...dto,
      userId,
      password,
      salt,
      accountStateId: AccountState.ACTIVE,
      passwordLogs: [{ password, changedAt: new Date() }],
      recordLog: {},
    });
    return createdUser.save();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    const filter: RootFilterQuery<UserDocument> = {
      _id: id,
      'recordLog.isDeleted': false,
    };
    const update: UpdateQuery<UserDocument> = {
      $set: {
        givenName: dto.givenName,
        familyName: dto.familyName,
        email: dto.email,
        'recordLog.modifiedBy': dto.modifiedBy,
        'recordLog.modifiedAt': new Date(),
      },
    };

    if (dto.password) {
      const salt: string = this.cryptoHelper.randomUUID();
      const password: Buffer = this.cryptoHelper.createHash(dto.password, salt);
      update.$set.password = password;
      update.$set.salt = salt;
      update.$push = {
        passwordLogs: {
          password,
          changedAt: new Date(),
        },
      };
    }

    return this.userModel
      .findOneAndUpdate(filter, update, { new: true })
      .exec();
  }

  async remove(id: string, dto: RemoveUserDto): Promise<User | null> {
    const filter: RootFilterQuery<UserDocument> = {
      _id: id,
      'recordLog.isDeleted': false,
    };
    const update: UpdateQuery<UserDocument> = {
      $set: {
        'recordLog.isDeleted': true,
        'recordLog.modifiedBy': dto.modifiedBy,
        'recordLog.modifiedAt': new Date(),
      },
    };

    return this.userModel
      .findOneAndUpdate(filter, update, { new: true })
      .exec();
  }
}
