import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "../../users/entities/user.entity";

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

    @Column({default: 0})
    breakTimeMinutes: number

    @ManyToOne(() => User, user => user.records)
    user: User

}