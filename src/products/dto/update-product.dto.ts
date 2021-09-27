import { PartialType } from '@nestjs/mapped-types'
import { CreateProductDto } from './create-product.dto'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  components: [
    {
      id: string
      ingredientId: string,
      quantity: number
    }
  ]
}
