import { IsString, MaxLength, IsInt, Min, Matches, IsIn, Length } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateMemberDto extends PickType(PickableDiscordUUIDFields, [
  'uuidDiscord',
  'uuidGuild'
]) {
  @ApiProperty({
    description: 'Nom d\'utilisateur du membre dans la guilde',
    example: 'JohnDoe',
    maxLength: 32
  })
  @IsString()
  @Length(1, 32)
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom d\'utilisateur ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  guildUsername: string;

  @ApiProperty({
    description: 'Points d\'expérience du membre',
    example: '100.00'
  })
  @IsString()
  @Matches(/^\d+\.\d{2}$/, { message: 'xp doit être un nombre décimal avec 2 décimales (ex: 100.00)' })
  xp: string;

  @ApiProperty({
    description: 'Niveau du membre',
    example: 1,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  level: number;

  @ApiProperty({
    description: 'Rôle communautaire du membre',
    example: 'Member',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  communityRole: string;

  @ApiProperty({
    description: 'Statut du membre',
    example: 'Active',
    enum: ['Active', 'Inactive', 'Banned']
  })
  @IsString()
  @IsIn(['Active', 'Inactive', 'Banned'])
  status: string;
}
