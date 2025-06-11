import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateDashboardAccountDto extends PickType(PickableDiscordUUIDFields, [
    'uuidDiscord'
]) {

    @ApiProperty({
        description: 'Email associé au compte du dashboard',
        type: String,
        example: 'test@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    @Length(5,255)
    @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-._]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
    email: string;

    @ApiProperty({
        description: 'Mot de passe associé au compte du dashboard',
        type: String,
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    uuidDiscord: string;
}