import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TrimBodyPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type === 'body' && this.isObject(value)) {
      return this.trim(value as object);
    }
    return value;
  }

  private trim(obj: object) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'password') {
        continue;
      } else if (this.isObject(value)) {
        obj[key] = this.trim(value as object);
      } else if (typeof value === 'string') {
        obj[key] = value.trim();
      }
    }
    return obj;
  }

  private isObject(value: any) {
    return typeof value === 'object' && value !== null;
  }
}
