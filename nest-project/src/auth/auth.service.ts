import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from "mongoose"
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private User : Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDTO: SignUpDto) : Promise<{token: string}> {
        const { name, email, password } = signUpDTO
        const hash = await bcrypt.hash(password, 10)

        const user = await this.User.create({
            name, email, password : hash
        })
        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }

    async login(loginDto: SignInDto) : Promise<{token: string}> {
        const {email,password} = loginDto
        const findUser = await this.User.findOne({email})
        if(!findUser){
            throw new UnauthorizedException("Invalid email or password")
        }
        const isPassMatched = await bcrypt.compare(password, findUser.password)

        if(!isPassMatched){
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({ id: findUser._id })
        return { token }
    }
}
