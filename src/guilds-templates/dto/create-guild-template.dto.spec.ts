import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateGuildTemplateDto } from './create-guild-template.dto';

describe('CreateGuildTemplateDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';
    dto.description = 'Description du template';
    dto.configuration = {
      channels: ['général', 'annonces'],
      roles: ['admin', 'formateur']
    };

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = 'invalid-uuid';
    dto.name = 'Test Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with UUID length not between 17-19', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '1234567890123456';
    dto.name = 'Test Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid name format', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test@Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with name length not between 2-100', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';
    dto.name = 'T';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid description format', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';
    dto.description = 'Description avec caractères spéciaux @#$%';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with description length not between 1-500', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';
    dto.description = 'D'.repeat(501);

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be valid without optional fields', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Template';
    dto.uuidGuild = '123456789012345678';
    dto.uuidCategory = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateGuildTemplateDto();
    dto.uuid = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});