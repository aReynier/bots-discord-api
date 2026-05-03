import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Role } from 'src/roles/entities/role.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ICoursesService } from './interfaces/course.interface';

@Injectable()
export class CoursesService implements ICoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const existingCourse = await this.courseRepository.findOne({
        where: { nameCourse: createCourseDto.nameCourse },
      });

      if (existingCourse) {
        throw new ConflictException(
          `Course with name ${createCourseDto.nameCourse} already exists`,
        );
      }

      const courseData = {
        nameCourse: createCourseDto.nameCourse,
        isCertified: createCourseDto.isCertified,
        uuidGuild: createCourseDto.uuidGuild,
        uuidCategory: createCourseDto.uuidCategory,
      };

      const newCourse = this.courseRepository.create(courseData);
      const savedCourse = await this.courseRepository.save(newCourse);

      if (createCourseDto.uuidRole) {
        const role = await this.roleRepository.findOne({
          where: { uuidRole: createCourseDto.uuidRole },
        });

        if (role) {
          await this.courseRepository
            .createQueryBuilder()
            .relation(Course, 'roles')
            .of(savedCourse)
            .add(role.uuidRole);
        }
      }

      const courseWithRelations = await this.courseRepository.findOne({
        where: { idCourse: savedCourse.idCourse },
        relations: {
          category: true,
          guild: true,
          roles: true,
          promotions: true,
          channels: true,
        },
      });

      if (!courseWithRelations) {
        throw new NotFoundException(
          `Course with ID ${savedCourse.idCourse} not found after creation`,
        );
      }

      return courseWithRelations;
    } catch (error) {
      throw new BadRequestException(
        'Erreur lors de la création du cours: ' + error.message,
      );
    }
  }

  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find({
      relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
    });
  }

  async getCourseByID(idCourse: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { idCourse },
      relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${idCourse} not found`);
    }
    return course;
  }

  async updateCourseByID(
    idCourse: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { idCourse },
      relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${idCourse} not found`);
    }

    if (updateCourseDto.nameCourse) {
      const existingCourse = await this.courseRepository.findOne({
        where: { nameCourse: updateCourseDto.nameCourse },
      });
      if (existingCourse && existingCourse.idCourse !== idCourse) {
        throw new ConflictException(
          `Course with name ${updateCourseDto.nameCourse} already exists`,
        );
      }
    }

    Object.assign(course, updateCourseDto);
    return await this.courseRepository.save(course);
  }

  async deleteCourseByID(idCourse: string): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { idCourse },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${idCourse} not found`);
    }
    const result = await this.courseRepository.delete({ idCourse });
    if (result.affected === 0) {
      throw new BadRequestException('Failed to delete course');
    }
  }
}
