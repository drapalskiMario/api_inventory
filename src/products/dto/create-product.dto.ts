import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  @IsArray()
  components: [
    {
      ingredientId: string,
      quantity: number
    }
  ]
}
