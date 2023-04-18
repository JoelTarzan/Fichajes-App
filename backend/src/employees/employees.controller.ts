import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
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

    @Get(':id')
    getOneEmployee(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.getOneEmployee(id);
    }

    @Post()
    createEmployee(@Body() newEmployee: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.createEmployee(newEmployee);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
        return this.employeesService.deleteEmployee(id);
    }
}
