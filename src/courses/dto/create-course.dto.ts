import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  MinLength,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';

export class CreateCourseDto extends PickType(
  IntersectionType(PickableDiscordUUIDFields, PickableDtoFields),
  ['uuidGuild', 'uuidRole', 'uuidCategory'],
) {
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  nameCourse: string; //name_course dans le MCD

  @ApiProperty({
    description: 'Si la formation est certifiante',
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isCertified: boolean;

  @IsOptional()
  uuidRole: string;
}
