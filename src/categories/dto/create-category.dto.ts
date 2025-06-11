import { IsString, IsInt, Min, Length, Matches } from 'class-validator';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateCategoryDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordUUIDFields), [
    'name',
    'uuidGuild'
]) { 
    @ApiProperty({
        description: 'ID Discord de la catégorie',
        example: '123456789012345678'
    })
    @IsString()
    @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
    @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
    uuid: string;

    @ApiProperty({
        description: 'Position de la catégorie dans le serveur',
        example: 0
    })
    @IsInt()
    @Min(0)
    position: number;
}
