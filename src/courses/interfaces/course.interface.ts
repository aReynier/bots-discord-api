import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Course } from '../entities/course.entity';

export interface ICoursesService {
  createCourse(createCourseDto: CreateCourseDto): Promise<Course>;
  getAllCourses(): Promise<Course[]>;
  getCourseByID(idCourse: string): Promise<Course>;
  updateCourseByID(
    idCourse: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course>;
  deleteCourseByID(idCourse: string): Promise<void>;
}

export const ICoursesServiceToken = Symbol('ICoursesService');
