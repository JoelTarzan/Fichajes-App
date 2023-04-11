import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

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
          entities: [__dirname + '**/*.entity{.ts, .js}'],
          synchronize: true
      }),
      EmpleadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
