import { CourseEntity, database, StudentEntity } from "./database";

declare const parseCsv: any;

function importCsv(file) {
  for (const line of parseCsv(file)) {
    if (line.isEmpty()) {
      continue;
    }
    const student: StudentEntity = new StudentEntity({
      forename: line[0].trim(),
      surname: line[1].trim(),
    });
    if (line.length >= 3) {
      const courseName = line[2].trim();
      if (courseName !== "") {
        let course: CourseEntity = database.findCourse(courseName);
        if (course === null) {
          course = new CourseEntity({ name: courseName });
          database.addCourse(course);
        }
        student.course = course;
      }
    }
    database.addStudent(student);
  }
}
