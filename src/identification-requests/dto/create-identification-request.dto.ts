import { PickType } from '@nestjs/swagger';
import { IsString, IsEmail, Length, Matches, MaxLength, IsUUID } from 'class-validator';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateIdentificationRequestDto extends PickType(PickableInternUUIDFields, [
    'uuidMember'
]) {

  @IsString()
  @Length(2, 50, { message: 'Le prénom doit contenir entre 2 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le prénom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
  firstname: string;

  @IsString()
  @Length(2, 50, { message: 'Le prénom doit contenir entre 2 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le prénom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
  lastname: string;

  @IsEmail()
  @MaxLength(255)
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-._]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
  email: string;

  @IsUUID()
  uuidMember: string; 

}
