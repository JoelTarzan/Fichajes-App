import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    getUsers() {
        return this.userRepository.find();
    }

    async getOneUser(id: string) {

        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async createUser(user: CreateUserDto) {

        const userFound = await this.userRepository.findOne({
            where: {
                name: user.name,
                lastname: user.lastname
            }
        });

        if (userFound) {
            throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
        }

        const superAdminExists = await this.userRepository.findOne({
           where: {
               isSuperAdmin: true
           }
        });

        if (!superAdminExists) {
            user.isSuperAdmin = true;
            user.isAdmin = true;
        }

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async deleteUser(id: string) {

        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.userRepository.delete({ id });
    }

    async updateUser(id: string, user: UpdateUserDto) {

        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        return this.userRepository.update({ id }, user);
    }

}
