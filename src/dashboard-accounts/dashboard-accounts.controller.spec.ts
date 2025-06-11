import { Test } from '@nestjs/testing';
import { DashboardAccountController } from './dashboard-accounts.controller';
import { DashboardAccountService } from './dashboard-accounts.service';
import { CreateDashboardAccountDto } from './dto/create-dashboard-account.dto';
import { UpdateDashboardAccountDto } from './dto/update-dashboard-account.dto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';

describe('DashboardAccountController', () => {
  let controller: DashboardAccountController;
  let service: DashboardAccountService;

  const mockDashboardAccount = {
    email: 'test@example.com',
    password: 'hashedPassword123'
  };

  const mockService = {
    create: vi.fn(),
    getByUUID: vi.fn(),
    updateByUUID: vi.fn(),
    deleteByUUID: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DashboardAccountController],
      providers: [
        {
          provide: DashboardAccountService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DashboardAccountController>(DashboardAccountController);
    service = module.get<DashboardAccountService>(DashboardAccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a dashboard account', async () => {
      const dto: CreateDashboardAccountDto = {
        uuidDiscord: '123456789012345678',
        email: 'test@example.com',
        password: 'password123' 
      };

      mockService.create.mockResolvedValue(mockDashboardAccount);

      const result = await controller.create(dto);

      expect(result).toEqual(mockDashboardAccount);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });

    // Ajout d'un test pour la validation
    it('should validate the DTO', async () => {
        const invalidDto = new CreateDashboardAccountDto();
        invalidDto.email = 'invalid-email';
        invalidDto.password = 'short';

        const errors = await validate(invalidDto);
      
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(err => err.property === 'email')).toBeTruthy();
        expect(errors.some(err => err.property === 'password')).toBeTruthy();
      });
});

  describe('getByUUID', () => {
    it('should return a single dashboard account', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockService.getByUUID.mockResolvedValue(mockDashboardAccount);

      const result = await controller.getByUUID(uuid);

      expect(result).toEqual(mockDashboardAccount);
      expect(mockService.getByUUID).toHaveBeenCalledWith(uuid);
    });
  });

  describe('updateByUUID', () => {
    it('should update a dashboard account', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const updateDto: UpdateDashboardAccountDto = {
          email: 'updated@example.com',
          password: ''
      };
      const updatedAccount = { ...mockDashboardAccount, ...updateDto };
      mockService.updateByUUID.mockResolvedValue(updatedAccount);

      const result = await controller.updateByUUID(uuid, updateDto);

      expect(result).toEqual(updatedAccount);
      expect(mockService.updateByUUID).toHaveBeenCalledWith(uuid, updateDto);
    });
  });

  describe('deleteByUUID', () => {
    it('should delete a dashboard account', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockService.deleteByUUID.mockResolvedValue(undefined);

      await controller.deleteByUUID(uuid);

      expect(mockService.deleteByUUID).toHaveBeenCalledWith(uuid);
    });
  });
});