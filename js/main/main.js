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
        // return new Promise((resolve, reject) => {
          updateData("user/student/" + username + "/personal_info", student_data)
            // .then(() => {
            //   resolve("Success");
            // })
            // .catch((error) => {
            //   reject(error);
            // });
        // });
        this.onDataChanged()
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
      bindOnDataChanged(handler) {
        this.onDataChanged = handler
      }
    
}

class View {
    constructor(){
        
    }
    loadStudentView(data) {
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
      var html = template({student_data: arr1, personal_data: arr2, certificate_data, name: data.personal_info.name, type: data.academic_info.type});
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
    bindSubmitEditStudent(handler) {
      $(document).ready(function() {
        $('#submit').on('click', function(e) {
        
        
        // Code to run when the button is clicked
        // e.preventDefault()
        // alert('Button clicked!');
          handler(e)



        });
      });
    }
    LoadEditStudentView(data) {
      var source = $("#template").html();
      var template = Handlebars.compile(source);
      // alert(data.personal_email)
      var context = data.personal_info
      
      var selected_1;
      var selected_2;
      var selected_3;
      if (data.personal_info.gender == "Other") {
        context.selected_1 = "selected";
        context.selected_2 = "";
        context.selected_3 = "";
      }
      else if (data.personal_info.gender == "Female") {
        context.selected_1 = "";
        context.selected_2 = "selected";
        context.selected_3 = "";
      }
      else { 
        context.selected_1 = "";
        context.selected_2 = "";
        context.selected_3 = "selected";
      }

      var html = template(context);
      $("#target").html(html);
    }

}

class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.model.getStudentData("kien_trantrung")
        .then((data) => {

          var path = window.location.pathname;
          var filename = path.split('/').pop();

          if (filename == 'edit-student.html') {
            this.view.LoadEditStudentView(data);
            (function ($) {
              'use strict';
            
              $.mask.definitions['~'] = '[+-]';
              $('#bhxh-1').mask('9999 9999 99');
              $('#bhxh-2').mask('9999 / 9999');
              $('#bhxh-3').mask('B999999999999999-C999');
              $('#date').mask('99/99/9999');
              $('#phone').mask('9999 999 999');
              $('#guardian-phone').mask('9999 999 999');
              $('#phoneExt').mask('(999) 999-9999? x99999');
              $('#iphone').mask('+33 999 999 999');
              $('#tin').mask('99-9999999');
              $('#ccn').mask('9999 9999 9999 9999');
              $('#ssn').mask('999-99-9999');
              $('#currency').mask('999,999,999.99');
              $('#product').mask('a*-999-a999', {
                placeholder: ' '
              });
              $('#eyescript').mask('~9.99 ~9.99 999');
              $('#po').mask('PO: aaa-999-***');
              $('#pct').mask('99%');
              $('#phoneAutoclearFalse').mask('(999) 999-9999', {
                autoclear: false
              });
              $('#phoneExtAutoclearFalse').mask('(999) 999-9999? x99999', {
                autoclear: false
              });
              $('input').blur(function () {
                $('#info').html('Unmasked value: ' + $(this).mask());
              }).dblclick(function () {
                $(this).unmask();
              });
            })(jQuery);
          }  
          else if (filename == 'student-details.html') {
            this.view.loadStudentView(data);
          }

        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
          this.view.bindSubmitEditStudent(this.handleEditStudent)
        })
        .then(() => {
          this.model.bindOnDataChanged(this.handleOnDataChanged)
        })

        
    }
    handleOnDataChanged() {
      // this.model.getStudentData("kien_trantrung")
      //   .then((data) => {
      //     this.view.LoadEditStudentView()
      //   })
      //   .catch((error) => {
      //       console.log(error);
      //   })
      
    }
    handleEditStudent = (e) => {
      e.preventDefault()
      
      var emailInput = document.getElementById('personal_email');
      if (!emailInput.checkValidity() || emailInput.value == "") {
        alert("Invalid email address!")
        return false;
      }

      

      var saveToFirebaseObject = {
        name: $("#student-full-name").val(),
        gender: $("#gender").val(),
        personal_email: $("#personal_email").val(),
        date_of_birth: $("#date").val(),
        guardian_contact_number: $("#guardian-phone").val(),
        guardian_full_name: $("#guardian-full-name").val(),
        language: $("#language").val(),
        mobile: $("#phone").val(),
        social_insurance_number: $("#bhxh-1").val(),
        record_id: $("#bhxh-2").val(),
        personal_accident_insurance_number: $("#bhxh-3").val(),
        address: $("#address").val()
      }


      for (var key in saveToFirebaseObject) {
        if (saveToFirebaseObject[key] == "") {
            alert("Please fill in all the fields!")
            return false;
        }
      }


      // var m = new Model();
      //If this arrow function is called in the subclass of Controller, it will get error
      this.model.updateStudentData("kien_trantrung", saveToFirebaseObject);
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