import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform
} from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'

export class PasswordValidator implements PipeTransform {
  transform (value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.password) {
      if (value.password !== value.passwordConfirmation) {
        throw new HttpException('password and passwordConfirmation don\'t equals', HttpStatus.BAD_REQUEST)
      }
    }
    return value
  }
}
