import { Body, Controller, Get, Inject, Post, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject()
  private readonly authService : AuthService

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/data/total')
  getTotal(){
    return this.appService.getTotal();
  }
  @Post('/admin/auth')
  async adminSignIn(@Body() body: { username: string, password: string },
    @Session() session: any) {
    const adminObject = await this.authService.adminSignIn(body.username, body.password);
    session.admin = adminObject.admin;
    return adminObject
  }

  @Post('/admin/logout')
  signOut(@Session() session : any)
  {
    console.log("CALLED")
    session= null;
  }
}
