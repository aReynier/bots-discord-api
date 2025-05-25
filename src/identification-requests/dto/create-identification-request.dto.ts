import { PickType } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateIdentificationRequestDto extends PickType(PickableInternUUIDFields, [
    'uuidMember'
]) {

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  uuidMember: string; 

}
