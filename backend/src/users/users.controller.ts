import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getOneUser(id);
    }

    @Get('email/:email')
    getOneUserByEmail(@Param('email') email: string): Promise<User> {
        return this.usersService.getOneUserByEmail(email);
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
        return this.usersService.createUser(newUser);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(id, user);
    }

}
