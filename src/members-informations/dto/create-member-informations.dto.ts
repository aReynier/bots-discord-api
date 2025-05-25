import { IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateMemberInformationsDto extends PickType(
  PickableInternUUIDFields,
  ['uuidMember'],
) {
  @ApiProperty({
    description: 'Prénom du membre',
    example: 'Jean',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  firstName: string;

  @ApiProperty({
    description: 'Nom de famille du membre',
    example: 'Dupont',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Za-zÀ-ÿ0-9 \-]+$/)
  lastName: string;

  @ApiProperty({
    description: 'Adresse email du membre',
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  @MaxLength(100)
  email: string;

  uuidMember: string;
}
