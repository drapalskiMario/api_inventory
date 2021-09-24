import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello (): string {
    return this.appService.getHello()
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(200)
  login (@Req() req) {
    return this.authService.login(req.user)
  }
}
