import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Event} from "./entities/event.entity";
import {CreateEventDto} from "./dto/create-event.dto";
import {SchedulesService} from "../schedules/schedules.service";
import {UpdateEventDto} from "./dto/update-event.dto";

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
            event.breakTimeMinutesExpected = schedule.sundayBreakTimeMinutes;

        } else if (dayOfWeek == 1) {
            event.entryHour = schedule.mondayEntry;
            event.exitHour = schedule.mondayExit;
            event.breakTimeMinutesExpected = schedule.mondayBreakTimeMinutes;

        } else if (dayOfWeek == 2) {
            event.entryHour = schedule.tuesdayEntry;
            event.exitHour = schedule.tuesdayExit;
            event.breakTimeMinutesExpected = schedule.tuesdayBreakTimeMinutes;

        } else if (dayOfWeek == 3) {
            event.entryHour = schedule.wednesdayEntry;
            event.exitHour = schedule.wednesdayExit;
            event.breakTimeMinutesExpected = schedule.wednesdayBreakTimeMinutes;

        } else if (dayOfWeek == 4) {
            event.entryHour = schedule.thursdayEntry;
            event.exitHour = schedule.thursdayExit;
            event.breakTimeMinutesExpected = schedule.thursdayBreakTimeMinutes;

        } else if (dayOfWeek == 5) {
            event.entryHour = schedule.fridayEntry;
            event.exitHour = schedule.fridayExit;
            event.breakTimeMinutesExpected = schedule.fridayBreakTimeMinutes;

        } else if (dayOfWeek == 6) {
            event.entryHour = schedule.saturdayEntry;
            event.exitHour = schedule.saturdayExit;
            event.breakTimeMinutesExpected = schedule.saturdayBreakTimeMinutes;
        }

        const newEvent = this.eventRepository.create(event);
        return this.eventRepository.save(newEvent);
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

    async updateEvent(id: number, event: UpdateEventDto) {

        const eventFound = await this.eventRepository.findOne({
           where: {
               id
           }
        });

        if (!eventFound) {
            throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
        }

        const nameFormatted = eventFound.name.split('-')[0];

        if (event.vacation) {
            event.name = nameFormatted + ' - Vacaciones';
            event.sickLeave = false;
            event.holiday = false;

        } else if (event.sickLeave) {
            event.name = nameFormatted + ' - Baja';
            event.vacation = false;
            event.holiday = false;

        } else if (event.holiday) {
            event.name = nameFormatted + ' - Festivo';
            event.sickLeave = false;
            event.vacation = false;

        } else {
            event.name = nameFormatted;
        }

        return this.eventRepository.update({ id }, event);
    }

}
