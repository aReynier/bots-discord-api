import { Test } from '@nestjs/testing';
import { GuildsTemplatesController } from './guilds-templates.controller';
import { GuildsTemplatesService } from './guilds-templates.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('GuildsTemplatesController', () => {
  let controller: GuildsTemplatesController;
  let service: GuildsTemplatesService;

  const mockService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GuildsTemplatesController],
      providers: [
        {
          provide: GuildsTemplatesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<GuildsTemplatesController>(GuildsTemplatesController);
    service = module.get<GuildsTemplatesService>(GuildsTemplatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new guild template', async () => {
      const createDto = {
        uuid: '123456789012345678',
        name: 'Test Template',
        uuidGuild: '123456789012345678',
        uuidCategory: '234567890123456789',
        description: 'Test Description',
        configuration: {
          welcomeChannel: '123456789',
          prefix: '!',
          language: 'fr'
        }
      };
      const expectedResult = { id: 1, ...createDto };
      mockService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of guild templates', async () => {
      const expectedResult = [
        { id: 1, name: 'Template 1' },
        { id: 2, name: 'Template 2' },
      ];
      mockService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a guild template by uuid', async () => {
      const uuid = '123456789012345678';
      const expectedResult = { id: 1, name: 'Template 1' };
      mockService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(uuid);

      expect(service.findOne).toHaveBeenCalledWith(uuid);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a guild template', async () => {
      const uuid = '123456789012345678';
      const updateDto = { name: 'Updated Template' };
      const expectedResult = { id: 1, ...updateDto };
      mockService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(uuid, updateDto);

      expect(service.update).toHaveBeenCalledWith(uuid, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a guild template', async () => {
      const uuid = '123456789012345678';
      mockService.remove.mockResolvedValue(undefined);

      await controller.remove(uuid);

      expect(service.remove).toHaveBeenCalledWith(uuid);
    });
  });
});
