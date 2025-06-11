import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateDiscordUserDto } from './create-discord-user.dto';

describe('CreateDiscordUserDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '123456789012345678';
    dto.discordUsername = 'JohnDoe';
    dto.discriminator = '1234';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid Discord UUID format', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = 'invalid-uuid';
    dto.discordUsername = 'JohnDoe';
    dto.discriminator = '1234';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with Discord UUID length not between 17-19', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '1234567890123456';
    dto.discordUsername = 'JohnDoe';
    dto.discriminator = '1234';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid username format', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '123456789012345678';
    dto.discordUsername = 'John@Doe';
    dto.discriminator = '1234';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with username length not between 2-32', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '123456789012345678';
    dto.discordUsername = 'J';
    dto.discriminator = '1234';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid discriminator format', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '123456789012345678';
    dto.discordUsername = 'JohnDoe';
    dto.discriminator = '12345';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with non-numeric discriminator', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '123456789012345678';
    dto.discordUsername = 'JohnDoe';
    dto.discriminator = '123a';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateDiscordUserDto();
    dto.uuidDiscord = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});