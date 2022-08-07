import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({name: 'wallets'})
export class Wallet {

    constructor(user: User) {
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type => User)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column({type: "double"})
    balance: number
}
