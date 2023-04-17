import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import {Employee} from "./employees/employee.entity";

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
          entities: [Employee],
          synchronize: true
      }),
      EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
