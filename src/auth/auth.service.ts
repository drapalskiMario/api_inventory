import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async verifyPasword (password: string, hashedPassword: string) {
    const isPasswordMatching = bcrypt.compareSync(password, hashedPassword)
    return !!isPasswordMatching
  }

  async validateUser (email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (user) {
      const passwordIsCorrect = await this.verifyPasword(password, user.password)
      return passwordIsCorrect ? user : false
    }
    return null
  }

  async login (user: User) {
    const payload = { user: user.id }
    return { access_token: this.jwtService.sign(payload) }
  }
}
