import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { CryptoHelper } from 'helpers/crypto.helper';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from 'schemas/tenants.schema';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
    private readonly cryptoHelper: CryptoHelper,
    private configService: ConfigService,
  ) {}

  async findOne(id: string): Promise<Tenant | null> {
    let foundTenant = await this.tenantModel.findById(id).exec();

    if (!foundTenant) {
      foundTenant = new this.tenantModel({
        appId: this.cryptoHelper.randomUUID(),
        apiKey: this.cryptoHelper.randomUUID(),
        url: this.configService.get<string>('TENANT_URL'),
        expiryMinutes: this.configService.get<number>('TOKEN_EXPIRY_MINUTES'),
      });
      foundTenant = await foundTenant.save();
    }

    return foundTenant;
  }
}
