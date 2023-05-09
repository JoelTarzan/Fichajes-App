import { Injectable } from '@nestjs/common';
import {RegisterAuthDto} from "./dto/register-auth.dto";
import {LoginAuthDto} from "./dto/login-auth.dto";
import { hash } from 'bcrypt';
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

    }

}
