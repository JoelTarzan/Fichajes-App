import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {RecordsService} from "./records.service";
import {Record} from "./entities/record.entity";
import {CreateRecordDto} from "./dto/create-record.dto";
import {UpdateRecordDto} from "./dto/update-record.dto";

@Controller('records')
export class RecordsController {

    constructor(private recordsService: RecordsService) {
    }

    @Get()
    getRecords(): Promise<Record[]> {
        return this.recordsService.getRecords();
    }

    @Get(':id')
    getOneRecord(@Param('id', ParseIntPipe) id: number): Promise<Record> {
        return this.recordsService.getOneRecord(id);
    }

    @Get('all/:id')
    getRecordsByUser(@Param('id') id: string): Promise<Record[]> {
        return this.recordsService.getRecordsByUser(id);
    }

    @Get('today/:id')
    getRecordByUserToday(@Param('id') id: string) {
        return this.recordsService.getRecordByUserToday(id);
    }

    @Post()
    createRecord(@Body() newRecord: CreateRecordDto): Promise<Record> {
        return this.recordsService.createRecord(newRecord);
    }

    @Delete(':id')
    deleteRecord(@Param('id', ParseIntPipe) id: number) {
        return this.recordsService.deleteRecord(id);
    }

    @Patch(':id')
    updateRecord(@Param('id', ParseIntPipe) id: number, @Body() record: UpdateRecordDto) {
        return this.recordsService.updateRecord(id, record);
    }
}
