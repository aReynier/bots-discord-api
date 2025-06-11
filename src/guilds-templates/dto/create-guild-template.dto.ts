import { IsString, MaxLength, Length, IsOptional, IsJSON, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { IntersectionType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateGuildTemplateDto extends PickType(IntersectionType(PickableDiscordUUIDFields, PickableInternUUIDFields), [
  'uuidGuild',
  'uuidCategory'
]) {
  @ApiProperty({
    description: 'ID Discord du template',
    example: '123456789012345678'
  })
  @IsString()
  @Length(17, 19)
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  uuid: string;

  @ApiProperty({
    description: 'Nom du template',
    example: 'Template Simplon'
  })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  name: string;

  @ApiProperty({
    description: 'Description du template',
    example: 'Template pour les serveurs Simplon',
    required: false
  })
  @IsString()
  @Length(1, 500, { message: 'La description doit contenir entre 1 et 500 caractères' })
  @Matches(
    /^[a-zA-ZÀ-ÿ0-9\s\-_.,!?;:'"()\[\]]+$/, 
    { message: 'La description peut contenir des lettres (avec accents), chiffres, espaces, ponctuation basique (.!?;:,), guillemets, parenthèses et crochets' }
  )
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Configuration du template',
    example: {
      channels: ['général', 'annonces'],
      roles: ['admin', 'formateur', 'apprenant'],
      permissions: { default: ['READ_MESSAGES'] }
    },
    required: false
  })
  @IsJSON()
  @IsOptional()
  configuration?: Record<string, any>;
}
