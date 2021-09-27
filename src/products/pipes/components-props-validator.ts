import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from '@nestjs/common'
import { CreateProductDto } from '../dto/create-product.dto'

export class ComponentsPropsValidator implements PipeTransform {
  transform (value: CreateProductDto, metadata: ArgumentMetadata) {
    value.components.forEach(({ ingredientId, quantity }) => {
      if (!ingredientId || !quantity) { throw new HttpException('invalid parameters for components ', HttpStatus.BAD_REQUEST) }
    })

      return value
  }
}
