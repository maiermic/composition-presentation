export class BaseEntity {
  id: number;

  constructor(fields) {
    Object.assign(this, fields);
  }
}

export class StudentEntity extends BaseEntity {
  forename: string;
  surname: string;
  course?: CourseEntity;
}

export class CourseEntity extends BaseEntity {
  name: string;
}

export const database = {
  findCourse(courseName: string): CourseEntity | null {
    // find entity in database and return it
    return null;
  },
  addCourse(course: CourseEntity) {
    // write entity to database
  },
  addStudent(student: StudentEntity) {
    // write entity to database
  },
};
