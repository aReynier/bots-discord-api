import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { IsUUID, IsString, Length, Matches, IsDate, IsOptional, IsArray } from 'class-validator';


@Entity('Campuses')
export class Campus {
  @ApiProperty({
    description: 'UUID unique du campus',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'uuid_campus' })
  @IsUUID()
  uuidCampus: string;

  @ApiProperty({
    description: 'Nom du campus',
    example: 'Simplon Paris',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @Length(2,50, { message: 'Le nom doit contenir entre 2 et 50 caractères'})
  @Matches(
    /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
    { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
  )
  name: string;

  @ApiProperty({
    description: 'UUID Discord du serveur associé',
    example: '123456789012345678'
  })
  @Column({ name: 'uuid_guild', type: 'varchar', length: 19 })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  uuidGuild: string;

  @ApiProperty({
    description: 'Date de création'
  })
  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: 'Le serveur Discord associé au campus',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.campuses)
  @JoinColumn({ name: 'uuid_guild' })
  guild: Guild;

  @Column({ type: 'varchar', name: 'uuid_role' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  uuidRole: string;

  @OneToOne(() => Role, role => role.campus)
  @JoinColumn({ name: 'uuid_role' })
  role: Role

  @ApiProperty({
    description: 'Promotions associées à ce campus',
    type: () => [Promotion]
  })
  @OneToMany(() => Promotion, promotion => promotion.campus)
  @IsArray()
  promotions: Promotion[];
}
