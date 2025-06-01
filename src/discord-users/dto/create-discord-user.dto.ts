import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateDiscordUserDto extends PickType(PickableDiscordUUIDFields, [
  'uuidDiscord',
]) {
  @ApiProperty({
    description: "Nom d'utilisateur Discord",
    example: 'JohnDoe#1234',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[A-Za-z0-9_.]+$/)
  discordUsername: string;

  @ApiProperty({
    description: 'Discriminateur Discord',
    example: '1234',
  })
  @IsString()
  @Length(1, 50)
  discriminator: string;
}
