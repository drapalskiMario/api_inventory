import { Controller, Get, Post, Patch, Param, Delete, UseInterceptors, Body, UploadedFile, UsePipes, ValidationPipe, Res, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Response } from 'express'
import { CreateProductDto } from './dto/create-product.dto'
import { config } from './config-upload-storage/config'
import { TypeImageValidator } from './pipes/type-image-validator.pipe'
import { ComponentsPropsValidator } from './pipes/components-props-validator'
import { UpdateProductDto } from './dto/update-product.dto'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor (private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', config))
  async create (
    @UploadedFile(new TypeImageValidator()) file: Express.Multer.File,
    @Body(new ComponentsPropsValidator()) body: CreateProductDto,
    @Res() res: Response
  ) {
    const productCreated = await this.productsService.create(body, file.path)
    if (!productCreated) throw new HttpException('ingredient not found', HttpStatus.BAD_REQUEST)
    return res.status(HttpStatus.CREATED).send()
  }

  @Get()
  findAll (@Query('cost') query: string) {
    if (query && query === 'S') {
      return this.productsService.cost()
    } else {
      return this.productsService.findAll()
    }
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    const product = await this.productsService.findOne(id)
    if (!product) throw new HttpException('product not found', HttpStatus.BAD_REQUEST)
    return product
  }

  @Get('available/:id')
  async availableProduct (@Param('id') id: string) {
    const availableProduct = await this.productsService.available(id)
    if (!availableProduct) throw new HttpException('product not found', HttpStatus.BAD_REQUEST)
    return availableProduct
  }

  @Get('cost')
  async costProducts () {
    return this.productsService.cost()
  }

  @Patch(':id')
  async update (@Param('id') id: string, @Body() body: UpdateProductDto, @Res() res: Response) {
    const productUpdate = await this.productsService.update(id, body)
    if (!productUpdate) throw new HttpException('product not found', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Delete(':id')
  async remove (@Param('id') id: string, @Res() res: Response) {
    const productUpdate = await this.productsService.remove(id)
    if (!productUpdate) throw new HttpException('product not found', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
