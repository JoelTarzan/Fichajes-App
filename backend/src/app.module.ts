import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { SchedulesModule } from './schedules/schedules.module';
import {Schedule} from "./schedules/entities/schedule.entity";
import { RecordsModule } from './records/records.module';
import {Record} from "./records/entities/record.entity";
import { UsersModule } from './users/users.module';
import {User} from "./users/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { Event } from "./events/entities/event.entity";

dotenv.config();

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mariadb',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: 'fichajes_app',
          entities: [Schedule, Record, User, Event],
          synchronize: true
      }),
      SchedulesModule,
      RecordsModule,
      UsersModule,
      AuthModule,
      EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
