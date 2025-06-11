import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, Length } from 'class-validator';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

enum PromotionStatus {
  ACTIVE = 'active',
  COMPLETED =  'completed',
  CANCELLED =  'cancelled',
}

export class CreatePromotionDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordUUIDFields, PickableInternUUIDFields), [
  'name',
  'uuidRole',
  'uuidGuild',
  'uuidCourse',
  'uuidCampus',
  'uuidCategory'
]) {
  
  @ApiProperty({
    description: 'Statut de la promotion',
    example: 'active',
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  })
  @IsString()
  @Length(1,20)
  @IsEnum(PromotionStatus)
  status: string;
  

  @ApiProperty({
    description: 'Date de début de la promotion',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la promotion',
    example: '2024-12-31T23:59:59.999Z'
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
} 