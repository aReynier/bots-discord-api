import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

describe('CreateRoleDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'Modérateur';
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid UUID format for uuidRole', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = 'invalid-uuid';
    dto.name = 'Modérateur';
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with uuidRole length not between 17-19', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '1234567890123456';
    dto.name = 'Modérateur';
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid name format', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'Modérateur!';
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with name length not between 2-50', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'M'; 
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with negative memberCount', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'Modérateur';
    dto.memberCount = '-1';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with negative rolePosition', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'Modérateur';
    dto.memberCount = '10';
    dto.rolePosition = '-1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid color format', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'Modérateur';
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = 'invalid-color';
    dto.uuidGuild = '123456789012345678';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with invalid UUID format for uuidGuild', async () => {
    const dto = new CreateRoleDto();
    dto.uuidRole = '123456789012345678';
    dto.name = 'Modérateur';
    dto.memberCount = '10';
    dto.rolePosition = '1';
    dto.hoist = false;
    dto.color = '#000000';
    dto.uuidGuild = 'invalid-uuid';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail with missing required fields', async () => {
    const dto = new CreateRoleDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});