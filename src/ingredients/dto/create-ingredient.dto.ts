import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  unitMeasurement: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number
}
