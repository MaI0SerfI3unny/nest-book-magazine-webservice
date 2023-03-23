import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("/signup")
    signUp(@Body() SignUpDto: SignUpDto): Promise<{token: string}> {
        return this.authService.signUp(SignUpDto)
    }

    @Post("/signin")
    login(@Body() SignInDto: SignInDto): Promise<{token: string}> {
        return this.authService.login(SignInDto)
    }
}
