import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Employee} from "../../employees/entities/employee.entity";

@Entity('records')
export class Record {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date"})
    date: Date

    @Column({type: "time"})
    entry: Date

    @Column({type: "time", nullable: true})
    exit: Date

    @Column({nullable: true})
    breakTimeMinutes: number

    @ManyToOne(() => Employee, employee => employee.records)
    employee: Employee

}