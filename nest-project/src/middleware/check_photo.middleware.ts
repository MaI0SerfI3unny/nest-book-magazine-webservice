import { NestMiddleware,BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express"
import * as fs from "fs"
import * as uuid from "uuid"

export class CheckPhoto implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { photo } = req.body
        if(!photo){
            throw new BadRequestException("No any photo")
        }
        let base64 =  photo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let format = photo.substring("data:image/".length, photo.indexOf(";base64"))
        let buffer = Buffer.from(base64[2],'base64');
        const randomNum = uuid.v4()
        const linkImg = `mediafile/${randomNum}.${format}`
        fs.writeFileSync(process.cwd() + "/src/" + linkImg, buffer, 'base64');
        req.body.photo = linkImg
        next()
    }
}