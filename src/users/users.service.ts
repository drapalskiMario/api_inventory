import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor (@InjectRepository(User) private userRepository: Repository<User>) {}

  async create (createUserDto: CreateUserDto): Promise <User> {
    const userExists = await this.userRepository.findOne({ email: createUserDto.email })
    if (userExists) return null
    createUserDto.password = bcrypt.hashSync(createUserDto.password)
    return await this.userRepository.save(createUserDto)
  }

  findAll (): Promise<User[]> {
    return this.userRepository.find({})
  }

  findOne (id: string): Promise<User> {
    return this.userRepository.findOne({ id })
  }

  findByEmail (email: string): Promise<User> {
    return this.userRepository.findOne({ email })
  }

  async update (id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ id })
    if (!user) return null
    return await this.userRepository.save({ id, ...updateUserDto })
  }

  async remove (id: string): Promise<number> {
    const user = await this.userRepository.findOne({ id })
    if (!user) return null
    const row = await this.userRepository.softDelete({ id })
    return row.affected
  }
}
