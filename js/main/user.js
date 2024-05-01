

class BasicUserInfo {
    constructor(userID, name, age, gender, dateOfBirth, address) {
    this.name = name;
    this.age = age;
    this.userID = userID;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    }
    showPersonalInfo() {
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
    login() {
    console.log(`${this.name} is logging in.`);
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
    showTeachingCourse() {
        // console.log(`${this.name} is teaching ${this.teachingSubject}`);
        
    }
    viewStudentList() {
        // console.log(`${this.name} is viewing the student list.`);

    }
    viewStudentList() {
        // console.log(`${this.name} is viewing the student list.`);


    }
    gradeStudent() {
        // console.log(`${this.name} is grading the student.`);

    }
    ediCourseResource() {
        // console.log(`${this.name} is editing the course resource.`);

    }



}
class Administrator extends BasicUserInfo {
    constructor(userID, name) {

    }



}

export {Student, BasicUserInfo, Instructor};