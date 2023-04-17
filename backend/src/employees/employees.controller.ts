import {Body, Controller, Post} from '@nestjs/common';
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {EmployeesService} from "./employees.service";

@Controller('employees')
export class EmployeesController {

    constructor(private employeesService: EmployeesService) {
    }

    @Post()
    createEmployee(@Body() newEmployee: CreateEmployeeDto) {
        return this.employeesService.createEmployee(newEmployee);
    }

}
