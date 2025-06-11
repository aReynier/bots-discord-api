import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Guild } from '../guilds/entities/guild.entity';
import { plainToInstance } from 'class-transformer';
import { GuildTemplate } from 'src/guilds-templates/entities/guild-template.entity';

describe('RolesController', () => {
  let controller: RolesController;
  let rolesService: RolesService;

  const mockGuild: Guild = {
    uuid: '123456789012345678',
    name: 'Test Guild',
    memberCount: "10",
    configuration: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    members: Promise.resolve([]),
    promotions: [],
    courses: [],
    roles: [],
    channels: [],
    categories: [],
    template: new GuildTemplate(),
    campuses: []
  }

  const mockRole = {
    uuidRole: '123456789012345679',
    name: 'Test Role',
    memberCount: 10,
    rolePosition: 1,
    hoist: true,
    color: '#FF0000',
    createdAt: new Date(),
    updatedAt: new Date(),
    uuidGuild: '123456789012345678',
    guild: mockGuild
  } as Role;

  beforeEach(() => {
    rolesService = {
      create: vi.fn(),
      findAll: vi.fn(),
      findOne: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    } as unknown as RolesService;

    controller = new RolesController(rolesService);
  });

  describe('create', () => {
    it('devrait créer un nouveau rôle', async () => {
      const createRoleDto: CreateRoleDto = {
        uuidRole: '563456789012345678',
        name: 'Test Role',
        memberCount: '10',
        rolePosition: '1',
        hoist: true,
        color: '#FF0000',
        uuidGuild: '123456789012345678'
      };

      vi.mocked(rolesService.create).mockResolvedValue(mockRole);

      const result = await controller.create(createRoleDto);

      expect(result).toEqual(mockRole);
      expect(rolesService.create).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de rôles', async () => {
      const roles = [mockRole];
      vi.mocked(rolesService.findAll).mockResolvedValue(roles);

      const result = await controller.findAll();

      expect(result).toEqual(roles);
      expect(rolesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un rôle par son uuid', async () => {
      vi.mocked(rolesService.findOne).mockResolvedValue(mockRole);

      const result = await controller.findOne(mockRole.uuidRole);

      expect(result).toEqual(mockRole);
      expect(rolesService.findOne).toHaveBeenCalledWith(mockRole.uuidRole);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un rôle', async () => {
      const updateRoleDto: UpdateRoleDto = {
        name: 'Updated Role',
        color: '#00FF00'
      };
      const updatedRole = plainToInstance(Role, { ...mockRole, ...updateRoleDto });

      vi.mocked(rolesService.update).mockResolvedValue(updatedRole);

      const result = await controller.update(mockRole.uuidRole, updateRoleDto);

      expect(result).toEqual(updatedRole);
      expect(rolesService.update).toHaveBeenCalledWith(mockRole.uuidRole, updateRoleDto);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un rôle', async () => {
      vi.mocked(rolesService.remove).mockResolvedValue(undefined);

      const result = await controller.remove(mockRole.uuidRole);

      expect(result).toBeUndefined();
      expect(rolesService.remove).toHaveBeenCalledWith(mockRole.uuidRole);
    });
  });
});
