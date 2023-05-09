import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({type: "boolean", default: false})
    isAdmin: boolean
}