import { getData, setData, updateData, removeData, initFirebase} from './Firebase.js'
// import {BasicUserInfo, Student, Instructor} from "./user_info.js";
class Model {
    constructor(){
        initFirebase();   
    }
    getStudentData(username) {
        return new Promise((resolve, reject) => {
            getData("user/student/" + username)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
    }

    setStudentData(username, student_data) {
        return new Promise((resolve, reject) => {
          setData("user/student/" + username, student_data)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
      
      updateStudentData(username, student_data) {
        return new Promise((resolve, reject) => {
          updateData("user/student/" + username, student_data)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
      
      removeStudentData(username) {
        return new Promise((resolve, reject) => {
          removeData("user/student/" + username)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
    
    
}

class View {
    constructor(){
        
    }
    updateStudentView(data) {
      var source = $("#template").html();
      var template = Handlebars.compile(source);
      
      var academic_data = data.academic_info;
      var personal_data = data.personal_info;
      var certificate_data = data.certificate_info;

      var arr1 = [academic_data];
      var arr2 = [personal_data];


      for (const certificate in certificate_data) {
        certificate_data[certificate].percentage = Math.floor(certificate_data[certificate].got / certificate_data[certificate].max * 100);
      }
      var html = template({student_data: arr1, personal_data: arr2, certificate_data});
      $("#target").html(html);
    }

    updateInstructorView(data) {
      // var source = $("#template").html();
      // var template = Handlebars.compile(source);
      
      // var academic_data = data.academic_info;
      // var personal_data = data.personal_info;
      // var certificate_data = data.certificate_info;

      // var arr1 = [academic_data];
      // var arr2 = [personal_data];
    }

}

class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.model.getStudentData("kien_trantrung")
        .then((data) => {
            // console.log(data);  
            this.view.updateStudentView(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleCourseRegistration() {
        // console.log("Course registration");
    }
    handleCourseWithdrawal() {
        // console.log("Course withdrawal");
    }
    handleCourseGrade() {
        // console.log("Course grade");
    }
    handleCourseEditResource() {
        // console.log("Course resource");
    }
    handleStudentList() {
        // console.log("Student list");
    }
    handleStudentGrade() {
        // console.log("Student grade");
    }
    handleTeachingSchedule() {
        // console.log("Student schedule");
    }

}

let Controller1 = new Controller(new Model(), new View())