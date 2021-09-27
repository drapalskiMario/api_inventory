import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from '@nestjs/common'
import { Express } from 'express'

export class TypeImageValidator implements PipeTransform {
  transform (value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.mimetype !== 'image/jpg' && value.mimetype !== 'image/jpeg' && value.mimetype !== 'image/png') {
      throw new HttpException('the image needs to have a .png or .jpg extension', HttpStatus.BAD_REQUEST)
    }
    return value
  }
}
