// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getStorage, getDownloadURL , ref, uploadBytesResumable, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import { FirebaseController } from "./Firebase.js";





/// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCAK2oEzu8ZyYtJRc4Lg8Nw4qYj3RD-uFI",
    authDomain: "btl-ltnc-232.firebaseapp.com",
    databaseURL: "https://btl-ltnc-232-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "btl-ltnc-232",
    storageBucket: "btl-ltnc-232.appspot.com",
    messagingSenderId: "623706960775",
    appId: "1:623706960775:web:1108d77673e0ffc9fa1922",
    measurementId: "G-P9BZ7FC3DW"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


function uploadFile(file) {
  var fileInput = document.getElementById('take-file');

$('#take-file').on('change', function(event) {
    function uploadFileName()  {
      var firebaseController = new FirebaseController();
      var currentFileName = []
      firebaseController.getData("/course/CO2007/course_content/files")
      .then((files) => {
        currentFileName = Object.entries(files).map(([key, value]) => value);
        return currentFileName;
      })
      .then((currentFileName) => {
        currentFileName.push(fileInput.files[0].name);
        firebaseController.updateData("/course/CO2007/course_content/", {files: currentFileName});
      })
    }
    uploadFileName();
    console.log(fileInput.files[0]);   

    const imageRef = ref(storage, 'myFolder/' + fileInput.files[0].name);
    uploadBytes(imageRef, fileInput.files[0])
    .then((snapshot) => {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        // console.log('File metadata:', snapshot.metadata);
        // Let's get a download URL for the file.
        getDownloadURL(snapshot.ref).then((url) => {
        console.log('File available at', url);
        // ...
        });
    }).catch((error) => {
        console.error('Upload failed', error);
        // ...
    });

    
})
}


function downloadFile(fileName) {
  return new Promise((resolve, reject) => {
    const starsRef = ref(storage, 'myFolder/' + fileName);

    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        console.log("File url available at: " + url + "\n");
        resolve(url); // Resolve the Promise with the download URL
      })
      .catch((error) => {
        // Handle any errors and reject the Promise
        console.error("Error downloading file:", error);
        reject(error);
      });
  });
}
function deleteFile() {
  var fileName = "NỘI-DUNG-CHUẨN-BỊ-THI-HỘI-THOẠI-CUỐI-KỲ.pdf"
  const desertRef = ref(storage, 'images/' + fileName);
  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
    console.log("File deleted successfully");
  }).catch((error) => {
    // Uh-oh, an error occurred!
    console.log("Uh-oh, an error occurred, cannot delete file!");
  });
}





function downloadMultipleFiles() {
  var fbController = new FirebaseController();
    fbController.getData("/course/CO2007/course_content/files")
    .then((files) => {
      // console.log("Files to download: ", files, files.length);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(Promise.resolve(downloadFile(files[i])));
      }

      Promise.all(promises) 
        .then(values => {
          console.log(values); 
          for (let i = 0; i < values.length; i++) {
            fbController.updateData("/course/CO2007/course_content/", {links: values});
          }
        })
        .catch(error => {
          console.error(error);
        });
    })
      .catch((error) => {
        reject(error);
      });

}



uploadFile();
downloadMultipleFiles()
// downloadFile();
// deleteFile() 

export { uploadFile, downloadFile, deleteFile };








