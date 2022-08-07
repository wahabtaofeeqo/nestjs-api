import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'kycs'})
export class KYC {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum: ['BVN', 'NIN', 'CACID']})
    type: string

    @Column()
    document: string

    @ManyToOne(type => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}
