import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';
import { Course } from '../../courses/entities/course.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { IsDate, IsOptional, IsString, Length, Matches, IsInt, IsEnum, Min } from 'class-validator';

enum ChannelType {
  TEXT = 'text',
  VOICE = 'voice',
  ANNOUNCEMENT = 'announcement'
}

@Entity('Channels')
export class Channel {
  @ApiProperty({
    description: 'ID Discord du channel',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19 , name: 'uuid_channel' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  uuid: string;

  @ApiProperty({
    description: 'Le nom du channel',
    example: 'général',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(
    /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
    { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
  )
  name: string;

  @ApiProperty({
    description: 'Le type de channel',
    example: 'text',
    enum: ['text', 'voice', 'announcement']
  })
  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @IsEnum(ChannelType)
  type: string;

  @ApiProperty({
    description: 'La position du channel',
    example: 1
  })
  @Column({ name: 'channel_position' })
  @IsInt()
  @Min(0)
  channelPosition: number;

  @ApiProperty({
    description: 'ID Discord de la catégorie associée',
    example: '123456789012345678',
    required: false
  })
  @Column({ name: 'uuid_category', type: 'varchar', length: 19, nullable: true })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  @IsOptional()
  uuidCategory: string;

  @ApiProperty({
    description: 'ID Discord du serveur associé',
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
    description: 'La catégorie à laquelle appartient le channel',
    type: () => Category,
    required: false
  })
  @ManyToOne(() => Category, category => category.channels, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinColumn({ name: 'uuid_category' })
  category: Category;

  @ApiProperty({
    description: 'Formation associées aux channels',
    type: () => [Course],
    isArray: true
  })
  @ManyToOne(() => Course, course => course.channels)
  @JoinColumn({ name: 'uuid_course' })
  course: Course;

  @ApiProperty({
    description: 'Le serveur Discord associé au channel',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.channels)
  @JoinColumn({ name: 'uuid_guild' })
  guild: Guild;
} 