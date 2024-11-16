import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FriendsRequestModule } from './friends-request/friends-request/friends-request.module';
import * as dotenv from 'dotenv';

dotenv.config();


@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB || 'mongodb://localhost:27017/js-communication'),
    UsersModule,
    FriendsRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
