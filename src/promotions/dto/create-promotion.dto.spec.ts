import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreatePromotionDto } from './create-promotion.dto';

describe('CreatePromotionDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid name format', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024!'; // Caractère spécial invalide
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with name length not between 2-100', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'D'; // Trop court
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid UUID format for uuidRole', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = 'invalid-uuid';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid UUID format for uuidGuild', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = 'invalid-uuid';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid UUID format for uuidCourse', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = 'invalid-uuid';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid UUID format for uuidCampus', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = 'invalid-uuid';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid UUID format for uuidCategory', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = 'invalid-uuid';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid status', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'invalid-status';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should fail with invalid startDate', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = 'invalid-date' as any;
    dto.endDate = new Date('2024-12-31T23:59:59.999Z');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail with invalid endDate', async () => {
    const dto = new CreatePromotionDto();
    dto.name = 'Développeur Web 2024';
    dto.uuidRole = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCourse = '123456789012345678';
    dto.uuidCampus = '123e4567-e89b-12d3-a456-426614174000';
    dto.uuidCategory = '123456789012345678';
    dto.status = 'active';
    dto.startDate = new Date('2024-01-01T00:00:00.000Z');
    dto.endDate = 'invalid-date' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreatePromotionDto();
    // Aucun champ n'est défini

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});