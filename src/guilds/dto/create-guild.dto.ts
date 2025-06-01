import { IsString, MinLength, MaxLength, IsObject, Length, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuildDto {
  @ApiProperty({
    description: 'ID Discord du serveur',
    example: '123456789012345678'
  })
  @IsString()
  @IsNotEmpty()
  @Length(17, 19)
  @Matches(/^\d+$/)
  uuid: string;

  @ApiProperty({
    description: 'Nom du serveur',
    example: 'Simplon Server'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  name: string;

  @ApiProperty({
    description: 'Nombre de membres dans le serveur',
    example: '100'
  })
  @IsString()
  @MaxLength(50)
  memberCount: string;

  @ApiProperty({
    description: 'Configuration du serveur',
    example: { welcomeChannel: '123456789012345678', prefix: '!' },
    required: false
  })
  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;
}
