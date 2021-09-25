import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './entities/ingredient.entity'

@Injectable()
export class IngredientsService {
  constructor (@InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>) {}

  create (createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientRepository.save(createIngredientDto)
  }

  findAll (): Promise<Ingredient[]> {
    return this.ingredientRepository.find()
  }

  findOne (id: string): Promise<Ingredient> {
    return this.ingredientRepository.findOne({ id })
  }

  async update (id: string, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({ id })
    if (!ingredient) return null
    return await this.ingredientRepository.save({ id, ...updateIngredientDto })
  }

  async remove (id: string): Promise<number> {
    const ingredient = await this.ingredientRepository.findOne({ id })
    if (!ingredient) return null
    const row = await this.ingredientRepository.softDelete({ id })
    return row.affected
  }
}
