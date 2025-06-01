import { IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateCampusDto extends PickType(
  IntersectionType(PickableDtoFields, PickableDiscordUUIDFields),
  ['name', 'uuidRole', 'uuidGuild'],
) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  name: string;

  @IsOptional()
  uuidRole: string;

  @IsOptional()
  uuidGuild: string;
}
