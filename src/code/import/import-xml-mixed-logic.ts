import { database, CourseEntity, StudentEntity } from "./database";

declare const parseXml: any;

function importXml(file) {
  for (const studentXml of parseXml(file).select("student")) {
    const student: StudentEntity = new StudentEntity({
      forename: studentXml.select("forename").text().trim(),
      surname: studentXml.select("surname").text().trim(),
    });
    if (studentXml.hasChild("course")) {
      const courseName = studentXml.select("course").text().trim();
      let course: CourseEntity = database.findCourse(courseName);
      if (course === null) {
        course = new CourseEntity({ name: courseName });
        database.addCourse(course);
      }
      student.course = course;
    }
    database.addStudent(student);
  }
}
