import { addStudentDataToDatabase, StudentData } from "./import-students";

declare const parseXml: any;

// parse -> IR -> save to DB
function importCsv(file) {
  for (const studentData of parseStudentsXml(file)) {
    addStudentDataToDatabase(studentData);
  }
}

function* parseStudentsXml(file): Generator<StudentData> {
  for (const studentXml of parseXml(file).select("student")) {
    const studentData: StudentData = {
      forename: studentXml.select("forename").text().trim(),
      surname: studentXml.select("surname").text().trim(),
    };
    if (studentXml.hasChild("course")) {
      studentData.course = studentXml.select("course").text().trim();
    }
    yield studentData;
  }
}
