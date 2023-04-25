import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Record} from "../../records/entities/record.entity";

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

    @OneToMany(() => Record, record => record.employee)
    records: Record[]

}