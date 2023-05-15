import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {SchedulesModule} from "../schedules/schedules.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Event} from "./entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event]),
  SchedulesModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
