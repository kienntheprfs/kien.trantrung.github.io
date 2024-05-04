import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {getDatabase, ref, child, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";


var db
function initFirebase() {
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
    
    
    //Using database
    db = getDatabase();
}




// Data setting
function setData(path, object_data) {
    set(ref(db, path), object_data)
    .then(() => {
        // alert("data set succesfully");
    }).catch(() => {
        alert("Unsuccesful");
        console.log(error);
    })
}





// Data getting
async function getData(path) {
    try {
        const snapshot = await get(child(ref(db), path));
        if (snapshot.exists()) {
        return snapshot.val();
        } else {
        throw new Error("Object name does not exist");
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        throw error;
    }
    }



    
//Data updating
function updateData(path, object_data) {
    update(ref(db, path), object_data)
    .then(() => {
            // alert("data updated succesfully");
        })
    .catch(() => {
            alert("Unsuccesful");
            console.log(error);
        })

}


//Data deleting
function removeData(path) {
    remove(ref(db, path))
    .then(() => {alert("Data removed succesfully");})
    .catch(() => {alert("Unsuccesful removing");})
}


export {initFirebase, setData, getData, updateData, removeData};











class FirebaseController {




    constructor() {
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
        this.app = initializeApp(firebaseConfig);
        
        
        //Using database
        this.db = getDatabase();
    }




    // Data setting
    setData(path, object_data) {
        set(ref(this.db, path), object_data)
        .then(() => {
            // alert("data set succesfully");
        }).catch(() => {
            alert("Unsuccesful");
            console.log(error);
        })
    }





    // Data getting 
    async getData(path) {
        try {
            const snapshot = await get(child(ref(this.db), path));
            if (snapshot.exists()) {
            return snapshot.val();
            } else {
            throw new Error("Object name does not exist");
            }
        } catch (error) {
            console.error("Error retrieving data:", error);
            throw error;
        }
        }



        
    //Data updating with no alert
    updateData(path, object_data) {
        update(ref(this.db, path), object_data)
        .then(() => {
                // alert("data updated succesfully");
            })
        .catch(() => {
                alert("Unsuccesful");
                console.log(error);
            })

    }


    //Data deleting
    removeData(path) {
        remove(ref(this.db, path))
        .then(() => {alert("Data removed succesfully");})
        .catch(() => {alert("Unsuccesful removing");})
    }




}

export {FirebaseController};