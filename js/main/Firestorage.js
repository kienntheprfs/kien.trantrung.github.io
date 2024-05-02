// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getStorage, getDownloadURL , ref, uploadBytesResumable, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";





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


function downloadFile() {
  var fileName = "NỘI-DUNG-CHUẨN-BỊ-THI-HỘI-THOẠI-CUỐI-KỲ.pdf"
  const starsRef = ref(storage, 'myFolder/' + fileName);

  // Get the download URL
  getDownloadURL(starsRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      console.log("File url available at: " + url);
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          console.log("File doesn't exist");
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log("User doesn't have permission to access the object");
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log("User canceled the upload");
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
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
uploadFile();
downloadFile();
deleteFile() 

export { uploadFile, downloadFile, deleteFile };








