import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateChannelDto } from './create-channel.dto';

describe('CreateChannelDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.uuidCategory = '234567890123456789';
    dto.name = 'test-channel';
    dto.type = 'text';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = 'invalid-uuid';
    dto.uuidGuild = '987654321098765432';
    dto.uuidCategory = '234567890123456789';
    dto.name = 'test-channel';
    dto.type = 'text';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid Guild UUID format', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = 'invalid-guild';
    dto.uuidCategory = '234567890123456789';
    dto.name = 'test-channel';
    dto.type = 'text';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid Category UUID format', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.uuidCategory = 'invalid-category';
    dto.name = 'test-channel';
    dto.type = 'text';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid name format', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.uuidCategory = '234567890123456789';
    dto.name = 'test@channel';
    dto.type = 'text';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid channel type', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.uuidCategory = '234567890123456789';
    dto.name = 'test-channel';
    dto.type = 'invalid-type';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should fail with negative position', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';
    dto.uuidGuild = '987654321098765432';
    dto.uuidCategory = '234567890123456789';
    dto.name = 'test-channel';
    dto.type = 'text';
    dto.channelPosition = -1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateChannelDto();
    dto.uuid = '123456789012345678';

    dto.uuidCategory = '234567890123456789';
    dto.name = 'test-channel';
    dto.type = 'text';
    dto.channelPosition = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});