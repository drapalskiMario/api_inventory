import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseUUIDPipe, Res, UsePipes, ValidationPipe } from '@nestjs/common'
import { IngredientsService } from './ingredients.service'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { UpdateBodyValidator } from './pipes/update-body-validatior.pipe'

@UseGuards(AuthGuard('jwt'))
@Controller('ingredients')
export class IngredientsController {
  constructor (private readonly ingredientsService: IngredientsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create (@Body() createIngredientDto: CreateIngredientDto) {
    this.ingredientsService.create(createIngredientDto)
  }

  @Get()
  async findAll () {
    const ingredients = await this.ingredientsService.findAll()
    if (!ingredients) throw new HttpException('ingredients not found', HttpStatus.BAD_REQUEST)
    return ingredients
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    const ingredient = await this.ingredientsService.findOne(id)
    if (!ingredient) throw new HttpException('ingredient not found', HttpStatus.BAD_REQUEST)
    return ingredient
  }

  @Patch(':id')
  async update (
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new UpdateBodyValidator()) updateIngredientDto: UpdateIngredientDto,
    @Res() res: Response
  ) {
    const ingredient = await this.ingredientsService.update(id, updateIngredientDto)
    if (!ingredient) throw new HttpException('ingredient not found', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Delete(':id')
  async remove (@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const deletedRow = await this.ingredientsService.remove(id)
    if (!deletedRow) throw new HttpException('ingredient not found', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
