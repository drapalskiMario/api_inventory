import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IngredientsService } from '../ingredients/ingredients.service'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Component } from './entities/component.entity'
import { Product } from './entities/product.entity'
import { queryAvailable, queryComponents, queryCost } from './querys/query-raw'

@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Component) private componentRepository: Repository<Component>,
    private ingredientService: IngredientsService
  ) { }

  async create (createProductDto: CreateProductDto, image: string) {
    const { name, price, components } = createProductDto
    for (const { ingredientId } of components) {
      const contains = await this.ingredientService.findOne(ingredientId)
      if (!contains) return false
    }
    const product = await this.productRepository.save({ name, price, image })
    if (product) {
      for (const { ingredientId, quantity } of components) {
        await this.componentRepository.save({
          ingredientId,
          quantity,
          productId: product.id
        })
      }
    }
    return product
  }

  async findAll () {
    const products = await this.productRepository.find({ select: ['id', 'name', 'price', 'image'] })
    for (const product of products) {
      const arrayComponents = await this.componentRepository.query(queryComponents, [product.id])
      product['components'] = arrayComponents
    }
    return products
  }

  async findOne (id: string) {
    const product = await this.productRepository.findOne({ id }, { select: ['id', 'name', 'price', 'image'] })
    if (product) {
      const arrayComponents = await this.componentRepository.query(queryComponents, [id])
      product['components'] = arrayComponents
      return product
    }
    return false
  }

  async update (id: string, updateProductDto: UpdateProductDto) {
    const { name, price, components } = updateProductDto
    const product = await this.productRepository.findOne({ id })
    if (product) {
      for (const { ingredientId } of components) {
        const contains = await this.ingredientService.findOne(ingredientId)
        if (!contains) return false
      }
      const productUpdated = await this.productRepository.save({ id, name, price })
      for (const { id, ingredientId, quantity } of components) {
        await this.componentRepository.save({
          id,
          ingredientId,
          quantity,
          productId: product.id
        })
      }
      return productUpdated
    }
    return false
  }

  async remove (id: string) {
    const product = await this.productRepository.findOne({ id })
    if (product) {
      await this.productRepository.softDelete({ id })
      await this.componentRepository.softDelete({ productId: id })
      return true
    }
    return false
  }

  async available (id: string) {
    const product = await this.productRepository.findOne({ id })
    if (product) {
      const quantities = await this.componentRepository.query(queryAvailable, [id])
      for (const { quantityForProduct, inventoryQuantity } of quantities) {
        if (inventoryQuantity < quantityForProduct) return { error: 'product not available', quantities }
      }
      return { success: 'product available', quantities }
    }
    return false
  }

  async cost () {
    return await this.productRepository.query(queryCost)
  }
}
