import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Schedule} from "./entities/schedule.entity";
import {Repository} from "typeorm";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Injectable()
export class SchedulesService {

    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>
    ) {
    }

    getShcedules() {
        return this.scheduleRepository.find();
    }

    async getOneSchedule(id: number) {

        const scheduleFound = await this.scheduleRepository.findOne({
           where: {
               id
           }
        });

        if (!scheduleFound) {
            throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
        }

        return scheduleFound;
    }

    async createSchedule(schedule: CreateScheduleDto) {

        const scheduleFound = await this.scheduleRepository.findOne({
           where: {
               name: schedule.name
           }
        });

        if (scheduleFound) {
            throw new HttpException('Ya existe un usuario con este nombre', HttpStatus.CONFLICT);
        }

        const newSchedule = this.scheduleRepository.create(schedule);
        return this.scheduleRepository.save(newSchedule);
    }

    async deleteSchedule(id: number) {

        const scheduleFound = await this.scheduleRepository.findOne({
            where: {
                id
            }
        });

        if (!scheduleFound) {
            throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.scheduleRepository.delete({id});
    }

    async updateSchedule(id: number, schedule: UpdateScheduleDto) {

        const scheduleFound = await this.scheduleRepository.findOne({
            where: {
                id
            }
        });

        if (!scheduleFound) {
            throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.scheduleRepository.update({ id }, schedule);
    }

}
