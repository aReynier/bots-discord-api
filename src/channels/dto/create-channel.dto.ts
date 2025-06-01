import {
  IsString,
  IsInt,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
  Length,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

enum ChannelType {
  TEXT = 'text',
  VOICE = 'voice',
  ANNOUNCEMENT = 'announcement',
}

export class CreateChannelDto extends PickType(PickableDiscordUUIDFields, [
  'uuidGuild',
  'uuidCategory',
]) {
  @ApiProperty({
    description: 'ID Discord du channel',
    example: '123456789012345678',
  })
  @IsString()
  @IsNotEmpty()
  @Length(17, 19)
  @Matches(/^\d+$/)
  uuid: string;

  @ApiProperty({
    description: 'Le nom du channel',
    example: 'général',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  name: string;

  @ApiProperty({
    description: 'Le type de channel',
    example: 'text',
    enum: ChannelType,
  })
  @IsString()
  @IsEnum(ChannelType)
  type: string;

  @ApiProperty({
    description: 'La position du channel',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  channelPosition: number;

  uuidGuild: string;
  uuidCategory: string;
}
