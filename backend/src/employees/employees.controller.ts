import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {EmployeesService} from "./employees.service";
import {Employee} from "./employee.entity";

@Controller('employees')
export class EmployeesController {

    constructor(private employeesService: EmployeesService) {
    }

    @Get()
    getEmployees(): Promise<Employee[]> {
        return this.employeesService.getEmployees();
    }

    @Post()
    createEmployee(@Body() newEmployee: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.createEmployee(newEmployee);
    }
}
