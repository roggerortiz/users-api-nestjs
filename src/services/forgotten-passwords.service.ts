import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import {
  ForgottenPassword,
  ForgottenPasswordDocument,
} from 'schemas/forgotten-passwords.schema';
import { CreateForgottenPasswordDto } from 'types/dtos/forgotten-passwords/create-forgotten-password.dto';
import { GetForgottenPasswordDto } from 'types/dtos/forgotten-passwords/get-forgotten-password.dto';
import { RemoveForgottenPasswordDto } from 'types/dtos/forgotten-passwords/remove-forgotten-password.dto copy';

@Injectable()
export class ForgottenPasswordsService {
  constructor(
    @InjectModel(ForgottenPassword.name)
    private forgottenPasswordModel: Model<ForgottenPasswordDocument>,
  ) {}

  async findOne(
    dto: GetForgottenPasswordDto,
  ): Promise<ForgottenPassword | null> {
    return this.forgottenPasswordModel
      .findOne({ ...dto, 'recordLog.isDeleted': false })
      .exec();
  }

  async create(dto: CreateForgottenPasswordDto): Promise<ForgottenPassword> {
    const createdForgottenPassword = new this.forgottenPasswordModel({
      email: dto.email,
      token: dto.token,
      recordLog: {
        createdBy: dto.createdBy,
      },
    });
    return createdForgottenPassword.save();
  }

  async remove(
    dto: RemoveForgottenPasswordDto,
  ): Promise<ForgottenPassword | null> {
    const filter: RootFilterQuery<ForgottenPasswordDocument> = {
      email: dto.email,
      token: dto.token,
      'recordLog.isDeleted': false,
    };
    const update: UpdateQuery<ForgottenPasswordDocument> = {
      $set: {
        'recordLog.isDeleted': true,
        'recordLog.modifiedBy': dto.modifiedBy,
        'recordLog.modifiedAt': new Date(),
      },
    };

    return this.forgottenPasswordModel
      .findOneAndUpdate(filter, update, { new: true })
      .exec();
  }
}
