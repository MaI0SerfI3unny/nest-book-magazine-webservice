import { MiddlewareConsumer, Module, NestModule,RequestMethod  } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CheckPhoto } from './middleware/check_photo.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule, 
    BookModule, 
    OrderModule, 
    UserModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPhoto)
      .forRoutes({ path: "book", method: RequestMethod.POST })
    consumer
      .apply(CheckPhoto)
      .forRoutes({ path: "user/change_avatar", method: RequestMethod.POST })
  }
}
