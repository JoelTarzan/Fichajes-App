import {Body, Controller, Get, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterAuthDto} from "./dto/register-auth.dto";
import {LoginAuthDto} from "./dto/login-auth.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('register')
    registerUser(@Body() user: RegisterAuthDto) {
        return this.authService.registerUser(user);
    }

    @Post('login')
    loginUser(@Body() user: LoginAuthDto) {
        return this.authService.loginUser(user);
    }

    @Get('/superadminexists')
    superAdminExists(): Promise<boolean> {
        return this.authService.superAdminExists();
    }

}
