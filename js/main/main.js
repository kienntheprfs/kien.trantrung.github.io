import { getData, setData, updateData, removeData, initFirebase} from './Firebase.js'
import { FirebaseController } from './Firebase.js';
import { uploadFile, downloadFile, downloadMultipleFiles } from './Firestorage.js'
// import {BasicUserInfo, Student, Instructor} from "./user_info.js";
class Model {
    constructor(){
        initFirebase();   
    }
    get(login_type, username) {
      return new Promise((resolve, reject) => {
        getData("user/"+login_type+"/" + username)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    }
    getCourseData(course_id) {
      return new Promise((resolve, reject) => {
        getData("course/" + course_id)
        .then((data) => {
        //   console.log("couse data: ", data)
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    }
    addTeacherData(username, teacher_data) {
      // return new Promise((resolve, reject) => {
        updateData("user/teacher/" + username, teacher_data)
          // .then(() => {
          //   resolve("Success");
          // })
          // .catch((error) => {
          //   reject(error);
          // });
      // });
      this.onDataChanged()
    }
    addCourseData(course_id, course_data) {
      // return new Promise((resolve, reject) => {
        updateData("course/" + course_id, course_data)
          // .then(() => {
          //   resolve("Success");
          // })
          // .catch((error) => {
          //   reject(error);
          // });
      // });
      this.onDataChanged()
    }
    addStudentData(username, student_data) {
      // return new Promise((resolve, reject) => {
        updateData("user/student/" + username, student_data)
          // .then(() => {
          //   resolve("Success");
          // })
          // .catch((error) => {
          //   reject(error);
          // });
      // });
      this.onDataChanged()
    }
    setTempData(data) {
        return new Promise((resolve, reject) => {
            setData("temp_data/", data)
            // .then(() => {
            //     resolve();
            // })
            // .catch((error) => {
            //     reject(error);
            // });
        });
    }

    getTempData() {
        return new Promise((resolve, reject) => {
            getData("temp_data/")
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }



    setCurrentUser(login_type, username) {
      return new Promise((resolve, reject) => {
        setData("current_user/", {login_type: login_type, user_name: username})
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    getCurrentUser() {
      return new Promise((resolve, reject) => {
        getData("current_user/")
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    }
    getStudentData = (username) => {
        return this.get("student", username)
    }
    getTeacherData = (username) => {
        return this.get("teacher", username)
    }
    getAdminData = (username) => {
        return this.get("admin", username)
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
      
      var selected_1 = "";
      var selected_2 = "";
      var selected_3 = "";
      if (data.personal_info.gender == "Other") {
        context.selected_1 = "selected";
      }
      else if (data.personal_info.gender == "Female") {
        context.selected_2 = "selected";
      }
      else { 
        context.selected_3 = "selected";
      }

      var html = template(context);
      $("#target").html(html);
    }

    


    loadStudentCourse(data, handler) {
      var source = $("#template").html();
      var template = Handlebars.compile(source);

      var context = data;
      console.log(context)

      var html = template({courses: context});
      $("#target").html(html);


    

    // Select the parent element
    var parentElement = document.getElementById('parentList');

    // Get all child elements
    var childElements = parentElement.children;

    // Create an array to store the child element IDs
    var course_IDs = [];
    // Iterate through the child elements and get their IDs
    for (var i = 0; i < childElements.length; i++) {
    var childId = childElements[i].id;
    // console.log('Child ID:', childId);
        course_IDs.push(childId)
    }

    
    document.addEventListener('click', function(e) {
        for (var i = 0; i < course_IDs.length; i++) {
            if (e.target && e.target.id === course_IDs[i]) {
                // var model = new Model()
                // var res = model.getCourseData(e.target.id)
                // res.then((data) => {
                //     console.log(data)
                // })
                handler(e.target.id)
            }
        }
    })
    
    






    }
    loadRegisterNewCourse(data, handler) {
      var source = $("#template").html();
      var template = Handlebars.compile(source);
      
      var context = data;
      console.log(context)

      const outputArray = context.map(([_, value]) => value);
      console.log(outputArray[1].course_info);

      var finalArray = []
      for (var i = 0; i < outputArray.length; i++) {
        finalArray.push(outputArray[i].course_info)
      }

      var html = template({courses: finalArray});
      $("#target").html(html);


    

    // Select the parent element
    var parentElement = document.getElementById('parentList');

    // Get all child elements
    var childElements = parentElement.children;

    // Create an array to store the child element IDs
    var course_IDs = [];
    // Iterate through the child elements and get their IDs
    for (var i = 0; i < childElements.length; i++) {
    var childId = childElements[i].id;
    // console.log('Child ID:', childId);
        course_IDs.push(childId)
    }

    
    document.addEventListener('click', function(e) {
        for (var i = 0; i < course_IDs.length; i++) {
            if (e.target && e.target.id === course_IDs[i]) {
                // var model = new Model()
                // var res = model.getCourseData(e.target.id)
                // res.then((data) => {
                //     console.log(data)
                // })
                handler(e.target.id)
            }
        }
    })
    
    






    }
    
    loadEditTeachingCourse(data) {
      var source = $("#template").html();
      var template = Handlebars.compile(source);

      var context = data.teaching_courses;

      var html = template(context);
      $("#target").html(html);
    }
    bindLogin(handler) {
      handler()
    }
    bindLogout(handler) {
      handler()
    }
    loadCourseDetails(data) {
      var source = $("#template").html();
      var template = Handlebars.compile(source);


      console.log(data)

      var  file_names = Object.entries(data.files);
      var file_links = Object.entries(data.links);
      

      // console.log(context)
      // console.log(file_names)
      // console.log(file_links)
      // console.log(typeof downloadMultipleFiles)
      
      downloadMultipleFiles()
      // .then(() => {
        var arr = []
        for (var i = 0; i < file_names.length; i++) {
          arr.push({name: file_names[i][1], link: file_links[i][1]})
        }
        console.log(arr)


        var html = template({links: arr});
        $("#target").html(html);
      // })
    
    }

    bindStudentCourse(handler) {
        // alert("bindStudentCourse not implemented yet")
        this.StudentCourseCallback = handler
    }
    loadAddTeacher() {
      var source = $("#template").html();
      var template = Handlebars.compile(source);
      var html = template();
      $("#target").html(html);
    }
    bindAddTeacher(handler) {
      // alert("bindAddTeacher not implemented yet")
      $(document).ready(function() {
        $("#submit").on("click", function(e) {
          handler(e)
        })
      })
    }
    bindAddStudent(handler) {
      $(document).ready(function() {
        $("#submit").on("click", function(e) {
          handler(e)
        })
      })
    }


    




}
var user_name = "onLogin"
var login_type = ""
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
        

        this.model.getCurrentUser()
        .then((data) => {
          console.log(data)
          if (data.user_name != "onLogin") {
            console.log("User logged in")
            login_type = data.login_type  
            user_name = data.user_name
          }
          else if (data.user_name == "") {
            console.log("No user logged in")
            var fbcontroller = new FirebaseController()
            fbcontroller.setData("current_user", {user_name: "onLogin"})
            window.location.href = "login.html"
          }
          else if (data.user_name == "onLogin") {
            this.handleLogin()
          }
          
        })
        .then(() => {
          var get_current_user_data;
          if (login_type == "student") {
            get_current_user_data = this.model.getStudentData
          }
          else if (login_type == "teacher") {
            get_current_user_data = this.model.getTeacherData
          }
          else {
            get_current_user_data = this.model.getAdminData
          }
          var path = window.location.pathname;
          var filename = path.split('/').pop();

          get_current_user_data(user_name)
          .then((data) => {


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
            else if (filename == 'student-course.html') {
              var registered_courses = data.registered_course
              var course_IDs = Object.keys(registered_courses) 
              
              // console.log(course_IDs)
            //   console.log(registered_courses)


              const promises = [];
              for (let i = 0; i < course_IDs.length; i++) {
                promises.push(Promise.resolve(this.model.getCourseData(course_IDs[i])));
              }
        
              Promise.all(promises)
              .then(data => {
                // console.log(data);
                // this.model.getCourseData("CO2007")
                // .then((data) => {
                  var course_INFOs = data.map((course) => course.course_info )
                //   console.log(course_INFOs)
                  this.view.loadStudentCourse(course_INFOs, this.handleStudentCourse);
                // })

            })



            }
            else if (filename == 'edit-teaching-course.html') {
              this.view.loadEditTeachingCourse(data);
            }
            else if (filename == 'course-details.html') {
              // alert("Course details")
              var courseId = this.model.getTempData("course_id");
              
              this.model.getTempData("course_id").then((data) => {
                console.log(data)
                return data.course_id
                })
                .then((courseId) => {
                this.model.getCourseData(courseId)
                .then((data) => {
                    this.view.loadCourseDetails(data.course_content);
              })
            })
              
            }
            else if (filename == "teacher-add-resources.html") {
              
              var courseId = "CO2009"
              this.model.getCourseData(courseId)
              .then((data) => {
                this.view.loadCourseDetails(data.course_content);
              })
            }
            else if (filename == "add-teacher.html") {
              this.view.loadAddTeacher()
            }
            else if (filename == "register-new-course.html") {
              if (login_type == "student") {
                
                this.model.getCourseData("").then((data) => {
                  var all_courses = Object.entries(data)
                  // console.log(all_courses.values())
                  // var all_courses = data.map((course) => course.course_info )
                  this.view.loadRegisterNewCourse(all_courses, this.handleRegisterNewCourse)
                  
                })
            }
          }

            return filename
            
          })
          .catch((error) => {
              console.log(error);
          })
          .then((filename) => {
            if (filename == 'edit-student.html')
              this.view.bindSubmitEditStudent(this.handleEditStudent)
            return filename
          })
          .then(() => {
            this.model.bindOnDataChanged(this.handleOnDataChanged)
          })
          .then(() => {
            this.view.bindLogin(this.handleLogin)
          })
          .then(() => {
            this.view.bindLogout(this.handleLogout)
          })
          .then(() => {
            this.view.bindStudentCourse(this.handleStudentCourse)
          })
          .then(() => {
            if (filename == "add-teacher.html") {
              this.view.bindAddTeacher(this.handleAddTeacher)
            }
            // this.view.bindAddTeacher(this.handleAddTeacher)
          })
          .then(() => {
            if (filename == "add-student.html") {
            this.view.bindAddStudent(this.handleAddStudent)
            }
          })
        })

        
    }
    handleRegisterNewCourse = () => {
      //pull all course data from the database
      var model = new Model()
      model.getCourseData()
      .then((data) => {
        console.log(data)
        // var course_data = data
        // var registered_courses = data.registered_course
        // var course_IDs = Object.keys(registered_courses) 
        // var course_INFOs = course_data.map((course) => course.course_info )
        // // console.log(course_INFOs)
        // this.view.loadStudentCourse(course_INFOs, this.handleStudentCourse);
      })
      

    }

    handleLogout() {
      $("#logout").on("click", function(e) {
        var fbcontroller = new FirebaseController()
        fbcontroller.updateData("current_user", {user_name: "onLogin", login_type: ""})
      })
    }
    handleOnDataChanged() {
      // this.model.getStudentData(user_name)
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
      this.model.updateStudentData(user_name, saveToFirebaseObject);
    }
    handleLogin() {

      // var model = this.model
      $(document).ready(function() {
        $("#submit-button").on("click", function(e) {
          e.preventDefault()
          if (login_type == "") {
            alert("Please select a login type!")
          }
          
          var login = function() {
            var password = ""
            var model = new Model()
            if (login_type == "student") {
              model = model.getStudentData
            }
            else if (login_type == "teacher") {
              model = model.getTeacherData
            }
            else if (login_type == "admin") {
              model = model.getAdminData
            }
            model(username).then((data) => {
              console.log(data)
              console.log ("data password ", data.password)  
              password = data.password
            })
            .then(() => { 
              if (password == $('#password').val()) {
                model = new Model()
                model.setCurrentUser(login_type, username)
                window.location.href = location
              } else {
                alert("Wrong password!")
              }})
            .catch((error) => {
              // console.log(error)
              alert("User not found!")
            })
          }
          login()
          
          



        })

        var login_type = ""
        var location = "#"
        $('#login-type').on('change', function(e) {
          login_type = $("input[type='radio'][name='option']:checked").val()
          if (login_type == "student") {
            location = "student-details.html";
          }
          else if (login_type == "teacher") {
            location = "teacher-details.html";
          }
          else if (login_type == "admin") {
            location = "add-student.html";
          }
          
          
        })

        var username
        var password
        $('#username').on('input', function(e) {
          username = $('#username').val()
          console.log(username)
        })
        $('#password').on('input', function(e) {
          password = $('#password').val()
          console.log(password)
        })





      });

      


      

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
    handleStudentCourse = (course_id) => {
        // console.log("Student course");
        // var model = new Model()
        // model.getCourseData("CO2009").
        // then((data) => {
        //   console.log(data)
        // })

        var model = new Model()
        var res = model.getCourseData(course_id)
        var handleCourseDetails = this.handleCourseDetails
        res.then((data) => {
            // console.log(data)
            handleCourseDetails(data)
            
        })

    }
    handleCourseDetails = (data) => {
        // console.log("Course details");
        this.model.setTempData({course_id: data.course_info.course_id})
        // .then(() => {
            window.location.href = "course-details.html"
        // })
        
    }
    handleAddTeacher = (e) => {
      e.preventDefault()
      
      // var emailInput = document.getElementById('personal_email');
      // if (!emailInput.checkValidity() || emailInput.value == "") {
      //   alert("Invalid email address!")
      //   return false;
      // }

      

      var name = $("#user-name").val()
      var password = $("#password").val()
      var repeat_password = $("#repeat-password").val()
      var teaching_courses_id = $("#teaching-courses-id").val()
      var saveToFirebaseObject = {
        course_name: $("#course-name").val(),
        course_type: $("#course-type").val(),
        course_description: $("#course-description").val(),
        course_introduction: $("#course-introduction").val(),
        course_requirements: $("#course-requirements").val(),
        
        start_time: $("#start-time").val(),
        end_time: $("#end-time").val(),
        number_of_months: $("#number-of-months").val(),
        instructor: name,
        course_id: teaching_courses_id,
        start_date: $("#start-date").val(),
      }

      if (password != repeat_password) {
        alert("Passwords do not match!")
        return false;
      }



      for (var key in saveToFirebaseObject) {
        if (saveToFirebaseObject[key] == "") {
            alert("Please fill in all the fields!")
            return false;
        }
      }

      //check if the user name already exists
      this.model.getTeacherData(saveToFirebaseObject.name)
      .then((data) => {
        alert("User name already exists!")
        $("#user-name").val("")
      })
      .catch(() => {
        // var m = new Model();
        //If this arrow function is called in the subclass of Controller, it will get error  
        this.model.addTeacherData(name, {password: password, teaching_courses_id: teaching_courses_id 
        });
        this.model.addCourseData(teaching_courses_id, {course_info: saveToFirebaseObject})
        alert("Teacher added successfully!")
        
          
          
        })
    }
    handleAddStudent = (e) => {
      e.preventDefault()


      var saveToFirebaseObject = {
        name: $("#user-name").val(),
        password: $("#password").val(),
        repeat_password: $("#repeat-password").val(),
      }

      if (saveToFirebaseObject.password != saveToFirebaseObject.repeat_password) {
        alert("Passwords do not match!")
        return false;
      }



      for (var key in saveToFirebaseObject) {
        if (saveToFirebaseObject[key] == "") {
            alert("Please fill in all the fields!")
            return false;
        }
      }

      //check if the user name already exists
      this.model.getStudentData(saveToFirebaseObject.name)
      .then((data) => {
        alert("User name already exists!")
        $("#user-name").val("")
      })
      .catch(() => {
        // var m = new Model();
        //If this arrow function is called in the subclass of Controller, it will get error  
        this.model.addStudentData(saveToFirebaseObject.name, {
          password: saveToFirebaseObject.password, 
        });
        alert("Student added successfully!")
        
          
          
        })

    }

}


let Controller1 = new Controller(new Model(), new View())