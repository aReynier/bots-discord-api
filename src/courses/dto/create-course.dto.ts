import { IsString, IsNotEmpty, IsBoolean, Length, Matches, IsOptional, MinLength } from "class-validator";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PickableDiscordUUIDFields } from "src/utils/pickable-discord-uuid-fields";
import { PickableDtoFields } from "src/utils/pickable-dto-fields";

export class CreateCourseDto extends PickType(IntersectionType(PickableDiscordUUIDFields, PickableDtoFields), [
    'name', 
    'uuidGuild', 
    'uuidRole',
    'uuidCategory'
]) {
    @IsString()
    @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
    @Matches(
        /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
        { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
    )
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