import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateIdentificationRequestDto } from './create-identification-request.dto';

describe('CreateIdentificationRequestDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'Jean';
    dto.lastname = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format for uuidMember', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = 'invalid-uuid';
    dto.firstname = 'Jean';
    dto.lastname = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid firstname format', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'Jean123';
    dto.lastname = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with firstname length not between 2-50', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'J';
    dto.lastname = 'Dupont';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid lastname format', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'Jean';
    dto.lastname = 'Dupont123';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with lastname length not between 2-50', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'Jean';
    dto.lastname = 'D';
    dto.email = 'jean.dupont@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid email format', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'Jean';
    dto.lastname = 'Dupont';
    dto.email = 'invalid-email';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail with email length exceeding 255 characters', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';
    dto.firstname = 'Jean';
    dto.lastname = 'Dupont';
    dto.email = 'a'.repeat(256) + '@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateIdentificationRequestDto();
    dto.uuidMember = '123e4567-e89b-12d3-a456-426614174000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});