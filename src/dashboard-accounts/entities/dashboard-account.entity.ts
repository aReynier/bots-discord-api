import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { DiscordUser } from '../../discord-users/entities/discord-user.entity';
import { IsEmail, Matches, Length, MinLength, IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

@Entity('dashboard_accounts')
export class DashboardAccount {
    @PrimaryGeneratedColumn('uuid', { name: 'uuid_dashboard_account' })
    uuid: string;

    @Column({ type: 'varchar', unique: true })
    @IsEmail()
    @Length(5,255)
    @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-._]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
    email: string;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
    @IsDate()
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
      })
    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @Column({ type: 'uuid', name: 'uuid_discord' })
    uuidDiscord: string;

    @OneToOne(() => DiscordUser, discordUser => discordUser.dashboardAccount)
    @JoinColumn({ name: 'uuidDiscord' })
    discordUser: DiscordUser;
}