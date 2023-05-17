import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Record} from "./entities/record.entity";
import {Repository} from "typeorm";
import {CreateRecordDto} from "./dto/create-record.dto";
import {UpdateRecordDto} from "./dto/update-record.dto";
import { format, startOfDay, parseISO } from 'date-fns';

@Injectable()
export class RecordsService {

    constructor(
        @InjectRepository(Record)
        private recordRepository: Repository<Record>
    ) {
    }

    getRecords() {
        return this.recordRepository.find();
    }

    async getOneRecord(id: number) {

        const recordFound = await this.recordRepository.findOne({
           where: {
               id: id
           }
        });

        if (!recordFound) {
            throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
        }

        return recordFound;
    }

    async getRecordsByUser(id: number) {

        return await this.recordRepository.find({
           where: {
               user: {
                   id
               }
           }
        });
    }

    async getRecordByUserToday(id: number) {

        const date = startOfDay(new Date());

        const recordFound = await this.recordRepository.findOne({
           where: {
               user: {
                   id
               },
               date
           }
        });

        if (!recordFound) {
            throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
        }

        return recordFound;
    }

    async createRecord(record: CreateRecordDto) {
        const newRecord = this.recordRepository.create(record);
        return this.recordRepository.save(newRecord);
    }

    async deleteRecord(id: number) {

        const recordFound = await this.recordRepository.findOne({
            where: {
                id: id
            }
        });

        if (!recordFound) {
            throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.recordRepository.delete({ id });
    }

    async updateRecord(id: number, record: UpdateRecordDto) {

        const recordFound = await this.recordRepository.findOne({
            where: {
                id: id
            }
        });

        if (!recordFound) {
            throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.recordRepository.update({ id }, record);
    }

}
