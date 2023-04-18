import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee.entity";
import {Repository} from "typeorm";
import {CreateEmployeeDto} from "./dto/create-employee.dto";

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

    getOneEmployee(id: string) {
        return this.employeeRepository.findOne({
            where: {
                id
            }
        });
    }

    createEmployee(employee: CreateEmployeeDto) {
        const newEmployee = this.employeeRepository.create(employee);
        return this.employeeRepository.save(newEmployee);
    }

    deleteEmployee(id: string) {
        return this.employeeRepository.delete({ id });
    }

}
