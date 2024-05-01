
class Course {
    #courseProgress;
    constructor(startTime, endTime, courseResource, grade) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.courseResource = courseResource;
        this.grade = grade;
    }

}
export { Course };