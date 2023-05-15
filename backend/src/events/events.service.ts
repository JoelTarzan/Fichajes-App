import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Event} from "./entities/event.entity";
import {CreateEventDto} from "./dto/create-event.dto";
import {SchedulesService} from "../schedules/schedules.service";

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
        private schedulesService: SchedulesService
    ) {
    }

    getEvents() {
        return this.eventRepository.find();
    }

    async getOneEvent(id: number) {

        const eventFound = await this.eventRepository.findOne({
           where: {
               id
           }
        });

        if (!eventFound) {
            throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
        }

        return eventFound;
    }

    async getEventsByUser(id: string) {

        return await this.eventRepository.find({
            where: {
                user: {
                    id
                }
            }
        });
    }

    async createEvent(event: CreateEventDto) {

        const schedule = await this.schedulesService.getOneSchedule(event.scheduleId);

        if (event.vacation) {
            event.name = schedule.name + ' - Vacaciones';

        } else if (event.sickLeave) {
            event.name = schedule.name + ' - Baja';

        } else if (event.holiday) {
            event.name = schedule.name + ' - Festivo';

        } else {
            event.name = schedule.name;
        }

        const eventDate = new Date(event.date);
        const dayOfWeek = eventDate.getDay();

        if (dayOfWeek == 0) {
            event.entryHour = schedule.sundayEntry;
            event.exitHour = schedule.sundayExit;

        } else if (dayOfWeek == 1) {
            event.entryHour = schedule.mondayEntry;
            event.exitHour = schedule.mondayExit;

        } else if (dayOfWeek == 2) {
            event.entryHour = schedule.tuesdayEntry;
            event.exitHour = schedule.tuesdayExit;

        } else if (dayOfWeek == 3) {
            event.entryHour = schedule.wednesdayEntry;
            event.exitHour = schedule.wednesdayExit;

        } else if (dayOfWeek == 4) {
            event.entryHour = schedule.thursdayEntry;
            event.exitHour = schedule.thursdayExit;

        } else if (dayOfWeek == 5) {
            event.entryHour = schedule.fridayEntry;
            event.exitHour = schedule.fridayExit;

        } else if (dayOfWeek == 6) {
            event.entryHour = schedule.saturdayEntry;
            event.exitHour = schedule.saturdayExit;
        }

        const newEvent = this.eventRepository.create(event);
        return  this.eventRepository.save(newEvent);
    }

    async deleteEvent(id: number) {

        const eventFound = await this.eventRepository.findOne({
            where: {
                id
            }
        });

        if (!eventFound) {
            throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.eventRepository.delete({id});
    }

}
