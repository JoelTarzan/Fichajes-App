import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee.entity";
import {Repository} from "typeorm";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {UpdateEmployeeDto} from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ) {
    }

    getEmployees() {
        return this.employeeRepository.find();
    }

    async getOneEmployee(id: string) {

        const employeeFound = await this.employeeRepository.findOne({
            where: {
                id
            }
        });

        if (!employeeFound) {
            throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
        }

        return employeeFound;
    }

    async createEmployee(employee: CreateEmployeeDto) {

        const employeeFound = await this.employeeRepository.findOne({
          where: {
              name: employee.name,
              lastname: employee.lastname
          }
        });

        if (employeeFound) {
            throw new HttpException('El empleado ya existe', HttpStatus.CONFLICT);
        }

        const newEmployee = this.employeeRepository.create(employee);
        return this.employeeRepository.save(newEmployee);
    }

    async deleteEmployee(id: string) {

        const employeeFound = await this.employeeRepository.findOne({
            where: {
                id
            }
        });

        if (!employeeFound) {
            throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.employeeRepository.delete({ id });
    }

    async updateEmployee(id: string, employee: UpdateEmployeeDto) {

        const employeeFound = await this.employeeRepository.findOne({
            where: {
                id
            }
        });

        if (!employeeFound) {
            throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.employeeRepository.update({ id }, employee);
    }
}
