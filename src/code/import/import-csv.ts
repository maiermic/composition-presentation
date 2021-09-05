import { addStudentDataToDatabase, StudentData } from "./import-students";

declare const parseCsv: any;

// parse -> IR -> save to DB
function importCsv(file) {
  for (const studentData of parseStudentsCsv(file)) {
    addStudentDataToDatabase(studentData);
  }
}

function* parseStudentsCsv(file): Generator<StudentData> {
  for (const line of parseCsv(file)) {
    if (line.isEmpty()) {
      continue;
    }
    const studentData: StudentData = {
      forename: line[0].trim(),
      surname: line[1].trim(),
    };
    if (line.length >= 3) {
      studentData.course = line[2].trim();
    }
    yield studentData;
  }
}
