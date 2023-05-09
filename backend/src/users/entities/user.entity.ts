import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../records/entities/record.entity";

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

    @Column({nullable: true})
    phone: string

    @Column({type: "boolean", default: false})
    isAdmin: boolean

    @Column({type: "boolean", default: false})
    isSuperAdmin: boolean

    @OneToMany(() => Record, record => record.user)
    records: Record[]
}