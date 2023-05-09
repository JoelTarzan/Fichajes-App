export class CreateUserDto {
    name: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
}