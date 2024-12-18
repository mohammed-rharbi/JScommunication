import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { VideoCallGateway } from './video-call/videoCall.gateway';


dotenv.config();

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB || 'mongodb://localhost:27017/js-communication'),
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        FRONTEND_URL: Joi.string().required(),
      }),
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, VideoCallGateway],
})
export class AppModule {}
