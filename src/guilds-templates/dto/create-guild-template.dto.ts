import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsOptional,
  IsJSON,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { IntersectionType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateGuildTemplateDto extends PickType(
  IntersectionType(PickableDiscordUUIDFields, PickableInternUUIDFields),
  ['uuidGuild', 'uuidCategory'],
) {
  @ApiProperty({
    description: 'ID Discord du template',
    example: '123456789012345678',
  })
  @IsString()
  @IsNotEmpty()
  @Length(17, 19)
  @Matches(/^\d+$/)
  uuid: string;

  @ApiProperty({
    description: 'Nom du template',
    example: 'Template Simplon',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  name: string;

  @ApiProperty({
    description: 'Description du template',
    example: 'Template pour les serveurs Simplon',
    required: false,
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Configuration du template',
    example: {
      channels: ['général', 'annonces'],
      roles: ['admin', 'formateur', 'apprenant'],
      permissions: { default: ['READ_MESSAGES'] },
    },
    required: false,
  })
  @IsJSON()
  @IsOptional()
  configuration?: Record<string, any>;
}
