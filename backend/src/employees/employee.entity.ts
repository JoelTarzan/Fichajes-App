import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('employees')
export class Employee {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column({nullable: true})
    phone: string

}