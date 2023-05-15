import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {SchedulesService} from "./schedules.service";
import {Schedule} from "./entities/schedule.entity";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Controller('schedules')
export class SchedulesController {

    constructor(private schedulesService: SchedulesService) {
    }

    @Get()
    getSchedules(): Promise<Schedule[]> {
        return this.schedulesService.getShcedules();
    }

    @Get(':id')
    getOneSchedule(@Param('id', ParseIntPipe) id: number): Promise<Schedule> {
        return this.schedulesService.getOneSchedule(id);
    }

    @Post()
    createSchedule(@Body() newSchedule: CreateScheduleDto): Promise<Schedule> {
        return this.schedulesService.createSchedule(newSchedule);
    }

    @Delete(':id')
    deleteSchedule(@Param('id', ParseIntPipe) id: number) {
        return this.schedulesService.deleteSchedule(id);
    }

    @Patch(':id')
    updateSchedule(@Param('id', ParseIntPipe) id: number, @Body() schedule: UpdateScheduleDto) {
        return this.schedulesService.updateSchedule(id, schedule);
    }
}
