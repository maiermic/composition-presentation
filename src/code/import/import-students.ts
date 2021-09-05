import { CourseEntity, database, StudentEntity } from "./database";

export interface StudentData {
  forename: string;
  surname: string;
  course?: string;
}

export function addStudentDataToDatabase(studentData: StudentData) {
  const student: StudentEntity = new StudentEntity({
    forename: studentData.forename,
    surname: studentData.surname,
  });
  if (studentData.course) {
    const courseName = studentData.course;
    let course: CourseEntity = database.findCourse(courseName);
    if (course === null) {
      course = new CourseEntity({ name: courseName });
      database.addCourse(course);
    }
    student.course = course;
  }
  database.addStudent(student);
}
