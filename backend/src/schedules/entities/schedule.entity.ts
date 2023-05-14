import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Event} from "../../events/entities/event.entity";

@Entity('schedules')
export class Schedule {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({type: "time", default: "00:00"})
    mondayEntry: Date

    @Column({type: "time", default: "00:00"})
    mondayExit: Date

    @Column({default: 0})
    mondayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnMonday: boolean

    @Column({type: "time", default: "00:00"})
    tuesdayEntry: Date

    @Column({type: "time", default: "00:00"})
    tuesdayExit: Date

    @Column({default: 0})
    tuesdayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnTuesday: boolean

    @Column({type: "time", default: "00:00"})
    wednesdayEntry: Date

    @Column({type: "time", default: "00:00"})
    wednesdayExit: Date

    @Column({default: 0})
    wednesdayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnWednesday: boolean

    @Column({type: "time", default: "00:00"})
    thursdayEntry: Date

    @Column({type: "time", default: "00:00"})
    thursdayExit: Date

    @Column({default: 0})
    thursdayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnThursday: boolean

    @Column({type: "time", default: "00:00"})
    fridayEntry: Date

    @Column({type: "time", default: "00:00"})
    fridayExit: Date

    @Column({default: 0})
    fridayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnFriday: boolean

    @Column({type: "time", default: "00:00"})
    saturdayEntry: Date

    @Column({type: "time", default: "00:00"})
    saturdayExit: Date

    @Column({default: 0})
    saturdayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnSaturday: boolean

    @Column({type: "time", default: "00:00"})
    sundayEntry: Date

    @Column({type: "time", default: "00:00"})
    sundayExit: Date

    @Column({default: 0})
    sundayBreakTimeMinutes: number

    @Column({type: "boolean", default: false})
    workOnSunday: boolean

    @OneToMany(() => Event, event => event.schedule, {onDelete: "SET NULL"})
    events: Event[]

}