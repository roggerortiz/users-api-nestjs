import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryParamsPipe implements PipeTransform<any> {
  transform(
    value: Record<string, any>,
    metadata: ArgumentMetadata,
  ): Record<string, any> {
    if (
      typeof value !== 'object' ||
      value === null ||
      metadata.type !== 'query'
    ) {
      return value;
    }

    const queryParams: Record<string, any> = {};

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const lowerCaseKey = key.toLowerCase();

        if (!Object.prototype.hasOwnProperty.call(queryParams, lowerCaseKey)) {
          queryParams[lowerCaseKey] = value[key] as string;
        } else {
          if (Array.isArray(queryParams[lowerCaseKey])) {
            (queryParams[lowerCaseKey] as string[]).push(value[key] as string);
          } else {
            queryParams[lowerCaseKey] = [
              queryParams[lowerCaseKey] as string,
              value[key] as string,
            ];
          }
        }
      }
    }

    return queryParams;
  }
}
