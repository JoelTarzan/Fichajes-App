import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Schedule} from "../../schedules/entities/schedule.entity";

@Entity('events')
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.events)
    user: User

    @ManyToOne(() => Schedule, schedule => schedule.events)
    schedule: Schedule

    @Column()
    name: string

    @Column({type: "date"})
    date: Date

    @Column({default: false})
    vacation: boolean

    @Column({default: false})
    sickLeave: boolean

    @Column({default: false})
    holiday: boolean
}