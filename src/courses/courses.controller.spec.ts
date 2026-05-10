import { Test } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  ICoursesService,
  ICoursesServiceToken,
} from './interfaces/course.interface';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: ICoursesService;

  const mockCourse = {
    idCourse: '123e4567-e89b-12d3-a456-426614174000',
    nameCourse: 'Développeur web',
    isCertified: true,
    idCategory: '123456789012345678',
    idGuild: '123456789012345678',
    createdAtCourse: new Date(),
    updatedAtCourse: null,
  };

  const mockService = {
    createCourse: vi.fn(),
    getAllCourses: vi.fn(),
    getCourseByID: vi.fn(),
    updateCourseByID: vi.fn(),
    deleteCourseByID: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: ICoursesServiceToken,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<ICoursesService>(ICoursesServiceToken);
  });

  describe('createCourse', () => {
    it('should create a course', async () => {
      const dto: CreateCourseDto = {
        nameCourse: 'Développeur web',
        isCertified: true,
        uuidCategory: '123456789012345678',
        uuidGuild: '123456789012345678',
        uuidRole: '',
      };

      mockService.createCourse.mockResolvedValue({
        idCourse: '123e4567-e89b-12d3-a456-426614174000',
        ...dto,
        createdAtCourse: expect.any(Date),
        updatedAtCourse: null,
      });

      const result = await controller.createCourse(dto);

      expect(result).toHaveProperty('idCourse');
      expect(result.nameCourse).toBe(dto.nameCourse);
      expect(result.isCertified).toBe(dto.isCertified);
      expect(mockService.createCourse).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllCourses', () => {
    it('should return an array of courses', async () => {
      const courses = [mockCourse, { ...mockCourse, idCourse: '456' }];
      mockService.getAllCourses.mockResolvedValue(courses);

      const result = await controller.getAllCourses();

      expect(result).toEqual(courses);
      expect(mockService.getAllCourses).toHaveBeenCalled();
    });
  });

  describe('getCourseByID', () => {
    it('should return a course', async () => {
      const idCourse = '123e4567-e89b-12d3-a456-426614174000';
      mockService.getCourseByID.mockResolvedValue(mockCourse);

      const result = await controller.getCourseByID(idCourse);

      expect(result).toEqual(mockCourse);
      expect(mockService.getCourseByID).toHaveBeenCalledWith(idCourse);
    });
  });

  describe('updateCourseByID', () => {
    it('should update a course', async () => {
      const idCourse = '123e4567-e89b-12d3-a456-426614174000';
      const updateDto: UpdateCourseDto = {
        nameCourse: 'updated-course',
      };
      const updatedCourse = { ...mockCourse, ...updateDto };
      mockService.updateCourseByID.mockResolvedValue(updatedCourse);

      const result = await controller.updateCourseByID(idCourse, updateDto);

      expect(result).toEqual(updatedCourse);
      expect(mockService.updateCourseByID).toHaveBeenCalledWith(
        idCourse,
        updateDto,
      );
    });
  });

  describe('deleteByID', () => {
    it('should delete a course', async () => {
      const idCourse = '123e4567-e89b-12d3-a456-426614174000';
      mockService.deleteCourseByID.mockResolvedValue(undefined);

      await controller.deleteCourseByID(idCourse);

      expect(mockService.deleteCourseByID).toHaveBeenCalledWith(idCourse);
    });
  });
});
