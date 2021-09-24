import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Res, HttpException, HttpStatus, Patch, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { PasswordValidator } from './pipes/password-validator.pipe'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create (@Body(new PasswordValidator()) createUserDto: CreateUserDto, @Res() res: Response) {
    delete createUserDto.passwordConfirmation
    const userCreated = await this.usersService.create(createUserDto)
    if (!userCreated) throw new HttpException('The received email is already in use', HttpStatus.FORBIDDEN)
    res.status(HttpStatus.CREATED).send()
  }

  @Get()
  findAll () {
    const users = this.usersService.findAll()
    if (!users) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    return users
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id)
    if (!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    return user
  }

  @Patch(':id')
  async update (
    @Param('id', ParseUUIDPipe) id: string, @Body(new PasswordValidator()) updateUserDto: UpdateUserDto,
    @Res() res: Response
  ) {
    const user = await this.usersService.update(id, updateUserDto)
    if (!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.NO_CONTENT).send()
  }

  @Delete(':id')
  async remove (@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const deletedRow = await this.usersService.remove(id)
    if (!deletedRow) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
