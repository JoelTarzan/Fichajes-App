import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {RegisterAuthDto} from "./dto/register-auth.dto";
import {LoginAuthDto} from "./dto/login-auth.dto";
import { hash, compare } from 'bcrypt';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService
    ) {
    }

    async registerUser(user: RegisterAuthDto) {

        const { password } = user;
        const plainToHash = await hash(password, 10);

        user = {...user, password:plainToHash};

        return this.usersService.createUser(user);
    }

    async loginUser(user: LoginAuthDto) {

        const { email, password } = user;
        const findUser = await this.usersService.getOneUserByEmail(email);

        if (!findUser) {
            throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }

        const checkPassword = await compare(password, findUser.password);

        if (!checkPassword) {
            throw new HttpException('La contraseña es incorrecta', HttpStatus.BAD_REQUEST);
        }

        const data = findUser;

        return data;
    }

    async superAdminExists() {
        return await this.usersService.superAdminExists();
    }

}
