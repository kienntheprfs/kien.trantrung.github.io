

class BasicUserInfo {
    constructor(userID, name, age, gender, dateOfBirth, address) {
    this.name = name;
    this.age = age;
    this.userID = userID;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    }

    getStudentInfo() {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }

    study() {
    console.log(`${this.name} is studying.`);
    }

    takeExam() {
    console.log(`${this.name} is taking an exam.`);
    }
}

class Student extends BasicUserInfo {
    #learningSubject;
    #studentSchedule;
    constructor(userID, name, age, gender, dateOfBirth, address, major) {
    super(userID, name, age, gender, dateOfBirth, address);
    this.major = major;
    var defaultValue =  "not known yet";
    this.#learningSubject = ["HDH", "XSTK", "KTCT"];
    this.#studentSchedule = defaultValue;
    }

    getStudentInfo() {
    return `${super.getStudentInfo()}, Major: ${this.major}`;
    }

    attendLecture() {
    console.log(`${this.name} is attending a lecture.`);
    }

    extractObject() {
    return {
        userID : this.userID,
        name : this.name,
        age : this.age,
        gender : this.gender,
        dateOfBirth : this.dateOfBirth,
        address : this.address,
        major : this.major,
        learningSubject : this.#learningSubject,
        defaultValue : this.#studentSchedule
    };
    }
}
class Instructor extends BasicUserInfo {
    constructor() {
        super(userID, name, age, gender, dateOfBirth, address);
        this.certificate = certificate;
        this.teachingSubject = teachingSubject;
        this.studentList = studentList;
        this.teacherSchedule;
    }
}
class Course {
    #courseProgress;
    constructor(startTime, endTime, courseResource, grade) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.courseResource = courseResource;
        this.grade = grade;
    }

}

export {Student, BasicUserInfo, Instructor, Course};