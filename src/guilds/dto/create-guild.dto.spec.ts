import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateGuildDto } from './create-guild.dto';

describe('CreateGuildDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Guild';
    dto.memberCount = '100';
    dto.configuration = { welcomeChannel: '123456789012345678' };

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = 'invalid-uuid';
    dto.name = 'Test Guild';
    dto.memberCount = '100';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with UUID length not between 17-19', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '1234567890123456';
    dto.name = 'Test Guild';
    dto.memberCount = '100';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid name format', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test@Guild';
    dto.memberCount = '100';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with name length not between 2-100', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '123456789012345678';
    dto.name = 'T';
    dto.memberCount = '100';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid member count format', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Guild';
    dto.memberCount = '1000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should be valid without configuration (optional)', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '123456789012345678';
    dto.name = 'Test Guild';
    dto.memberCount = '100';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateGuildDto();
    dto.uuid = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});