import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as bcrypt from "bcryptjs"
import { changePasswordDTO } from './dto/changePass.dto';
import { changeAvatarUser } from './dto/changeAvatar.dto';
import { Model } from "mongoose"

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private User : Model<User>,
    ){}
    async updatePassword(changePasswordDTO: changePasswordDTO,  user: User) : Promise<changePasswordDTO> {
        const {newPassword, repeatPassword, oldPassword} = changePasswordDTO
        const isPassMatched = await bcrypt.compare(oldPassword, user.password)
        if(!isPassMatched){
            throw new BadRequestException("Incorrect password")
        }

        if(repeatPassword !== newPassword){
            throw new BadRequestException("Passwords doesn`t much")
        }

        const hashNewPass = await bcrypt.hash(newPassword, 10)
    
        await this.User.findByIdAndUpdate(user._id, {password : hashNewPass}, {
            new: true,
            runValidators: true
        })
        return changePasswordDTO
    }

    async getInfoUser(user: User) : Promise<User> {
        user.password = ""
        return user
    }

    async changeAvatarUser(data: changeAvatarUser, user: User) : Promise<{photo: string}>{
        await this.User.findByIdAndUpdate(user._id, {photo : data.photo}, {
            new: true,
            runValidators: true
        })
        return {photo: data.photo}
    }
}
