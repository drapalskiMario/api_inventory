import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from '@nestjs/common'

export class UpdateBodyValidator implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata) {
    if (!Object.keys(value).length) throw new HttpException('send at least one parameter', HttpStatus.BAD_REQUEST)
    return value
  }
}
