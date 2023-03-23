import { Controller, Put, UseGuards, Req, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { changePasswordDTO } from './dto/changePass.dto';
import { changeAvatarUser } from './dto/changeAvatar.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/auth/schemas/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Put("/change_password")
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateBook(
        @Body()
        data: changePasswordDTO,
        @Req() req
    ) : Promise<changePasswordDTO> { 
        return this.userService.updatePassword(data, req.user)
    }

    @Post("/change_avatar")
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async changeAvatar(@Req() req, @Body() data: changeAvatarUser) : Promise<{photo: string}> {
        return  this.userService.changeAvatarUser(data, req.user)
    }

    @Post("/info_user")
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async getInfo(@Req() req) : Promise<User> {
        return  this.userService.getInfoUser(req.user)
    }

}
