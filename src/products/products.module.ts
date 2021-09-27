import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Component } from './entities/component.entity'
import { Ingredient } from 'src/ingredients/entities/ingredient.entity'
import { IngredientsModule } from 'src/ingredients/ingredients.module'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Component, Ingredient]), IngredientsModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
