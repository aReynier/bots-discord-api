import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class PickableDtoFields {

    @ApiProperty({
        description: 'Nom de la ressource',
        example: 'Idetaka',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50)
    @Matches(
        /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
        { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
      )
    name: string;

}