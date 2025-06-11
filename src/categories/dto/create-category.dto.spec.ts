import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

describe('CreateCategoryDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateCategoryDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.name = 'Test Category';
    dto.position = 1;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid uuid format', async () => {
    const dto = new CreateCategoryDto();
    dto.uuid = 'invalid-uuid';
    dto.uuidGuild = '987654321098765432';
    dto.name = 'Test Category';
    dto.position = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid uuidGuild format', async () => {
    const dto = new CreateCategoryDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = 'invalid-guild';
    dto.name = 'Test Category';
    dto.position = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid name format', async () => {
    const dto = new CreateCategoryDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.name = 'Test@Category';
    dto.position = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with negative position', async () => {
    const dto = new CreateCategoryDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.name = 'Test Category';
    dto.position = -1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateCategoryDto();
    dto.uuid = '123456789012345678';

    dto.name = 'Test Category';
    dto.position = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});