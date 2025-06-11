import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateMemberDto } from './create-member.dto';

describe('CreateMemberDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format for uuidDiscord', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = 'invalid-uuid';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid UUID format for uuidGuild', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = 'invalid-uuid';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid guildUsername format', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'John@Doe';
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with guildUsername length not between 1-32', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'J'.repeat(33); 
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid xp format', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with negative level', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100.00';
    dto.level = -1;
    dto.communityRole = 'Member';
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail with invalid communityRole length', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'R'.repeat(51);
    dto.status = 'Active';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });

  it('should fail with invalid status', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';
    dto.guildUsername = 'JohnDoe';
    dto.xp = '100.00';
    dto.level = 1;
    dto.communityRole = 'Member';
    dto.status = 'InvalidStatus'; 

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateMemberDto();
    dto.uuidDiscord = '123456789012345678';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});