import { IsString, IsUUID, MaxLength, IsBoolean, Matches, Length } from 'class-validator';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';

export class CreateRoleDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordUUIDFields), [
    'uuidRole', 'name', 'uuidGuild'
]) {
    
    @ApiProperty({
        description: 'Nombre de membres ayant ce rôle',
        example: '0',
        default: '0'
    })
    @IsString()
    @Length(1,6, { message: 'Un serveur peut contenir entre "1" et "500000" membres' })
    @Matches(/^\d+$/, { message: 'memberCount doit être une chaîne numérique' })
    memberCount: string = '0';

    @ApiProperty({
        description: 'Position du rôle dans la hiérarchie',
        example: '1'
    })
    @IsString()
    @Length(1,6, { message: 'Un serveur peut contenir entre "1" et "500000" membres' })
    @Matches(/^\d+$/, { message: 'rolePosition doit être une chaîne numérique' })
    rolePosition: string;

    @ApiProperty({
        description: 'Indique si le rôle est affiché séparément dans la liste des membres',
        example: true
    })
    @IsBoolean()
    hoist: boolean;

    @ApiProperty({
        description: 'Couleur du rôle en format hexadécimal',
        example: '#FF0000',
        pattern: '^#[0-9A-Fa-f]{6}$'
    })
    @IsString()
    @Length(7, 7, { message: 'La couleur doit contenir 7 caractères' })
    @Matches(/^#([0-9a-fA-F]{6})$/, { message: 'La couleur doit être au format hexadécimal' })
   color: string;
}