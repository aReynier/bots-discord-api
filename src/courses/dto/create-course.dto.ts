import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  Length,
  Matches,
  IsOptional,
  MinLength,
  maxLength,
} from 'class-validator';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';

export class CreateCourseDto extends PickType(
  IntersectionType(PickableDiscordUUIDFields, PickableDtoFields),
  ['name', 'uuidGuild', 'uuidRole', 'uuidCategory'],
) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  name: string;

  @ApiProperty({
    description: 'Si la formation est certifiante',
    type: String,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isCertified: boolean;

  @IsOptional()
  uuidRole: string;
}
