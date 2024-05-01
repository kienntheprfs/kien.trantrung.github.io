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
}

class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.model.getStudentData("kien_trantrung")
        .then((data) => {
            console.log(data);  
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

let Controller1 = new Controller(new Model(), new View())