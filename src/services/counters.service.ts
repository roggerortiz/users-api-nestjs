import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter, CounterDocument } from 'schemas/counters.schema';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) {}

  async nextValue(key: string): Promise<number> {
    const foundCounter = await this.counterModel
      .findOneAndUpdate(
        { key },
        { $inc: { value: 1 } },
        { new: true, upsert: true },
      )
      .exec();

    return foundCounter.value;
  }
}
