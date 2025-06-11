import { IsString, IsEmail, MaxLength, Length, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateMemberInformationsDto extends PickType(PickableInternUUIDFields, [
    'uuidMember'
]) {

    @ApiProperty({
        description: 'Prénom du membre',
        example: 'Jean'
    })
    @IsString()
    @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
    @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
    firstName: string;

    @ApiProperty({
        description: 'Nom de famille du membre',
        example: 'Dupont'
    })
    @IsString()
    @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
    @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
    lastName: string;

    @ApiProperty({
        description: 'Adresse email du membre',
        example: 'jean.dupont@example.com'
    })
    @IsEmail()
    @MaxLength(100)
    @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-._]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
    email: string;

    uuidMember: string;
}
