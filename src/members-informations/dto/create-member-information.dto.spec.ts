import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateMemberInformationsDto } from './create-member-informations.dto';

describe('CreateMemberInformationsDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'Jean';
    dto.lastName = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format for uuidMember', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = 'invalid-uuid';
    dto.firstName = 'Jean';
    dto.lastName = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid firstName format', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'Jean123';
    dto.lastName = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with firstName length not between 2-50', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'J';
    dto.lastName = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid lastName format', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'Jean';
    dto.lastName = 'Dupont123';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with lastName length not between 2-50', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'Jean';
    dto.lastName = 'D';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid email format', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'Jean';
    dto.lastName = 'Dupont';
    dto.email = 'invalid-email';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail with email length exceeding 100 characters', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstName = 'Jean';
    dto.lastName = 'Dupont';
    dto.email = 'a'.repeat(101) + '@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateMemberInformationsDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});