import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Event} from "../../events/entities/event.entity";

@Entity('schedules')
export class Schedule {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({type: "time", nullable: true})
    mondayEntry: Date

    @Column({type: "time", nullable: true})
    mondayExit: Date

    @Column({nullable: true})
    mondayBreakTimeMinutes: number

    @Column({type: "time", nullable: true})
    tuesdayEntry: Date

    @Column({type: "time", nullable: true})
    tuesdayExit: Date

    @Column({nullable: true})
    tuesdayBreakTimeMinutes: number

    @Column({type: "time", nullable: true})
    wednesdayEntry: Date

    @Column({type: "time", nullable: true})
    wednesdayExit: Date

    @Column({nullable: true})
    wednesdayBreakTimeMinutes: number

    @Column({type: "time", nullable: true})
    thursdayEntry: Date

    @Column({type: "time", nullable: true})
    thursdayExit: Date

    @Column({nullable: true})
    thursdayBreakTimeMinutes: number

    @Column({type: "time", nullable: true})
    fridayEntry: Date

    @Column({type: "time", nullable: true})
    fridayExit: Date

    @Column({nullable: true})
    fridayBreakTimeMinutes: number

    @Column({type: "time", nullable: true})
    saturdayEntry: Date

    @Column({type: "time", nullable: true})
    saturdayExit: Date

    @Column({nullable: true})
    saturdayBreakTimeMinutes: number

    @Column({type: "time", nullable: true})
    sundayEntry: Date

    @Column({type: "time", nullable: true})
    sundayExit: Date

    @Column({nullable: true})
    sundayBreakTimeMinutes: number

    @OneToMany(() => Event, event => event.schedule, {onDelete: "SET NULL"})
    events: Event[]

}