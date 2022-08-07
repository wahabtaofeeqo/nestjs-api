import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { KYC } from "./kyc.entity";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({ default: true })
    isActive: boolean;

    @OneToOne(type => Wallet, wallet => wallet.user)
    wallet: Wallet

    @OneToMany(type => KYC, kyc => kyc.user)
    kyc: KYC[]

    @Column({default: 0})
    kyc_level: number;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}
