// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJwaGXLNJ_QAeHK0qrVdcqIis1mEt_ykQ",
  authDomain: "nctn-fronend.firebaseapp.com",
  projectId: "nctn-fronend",
  storageBucket: "nctn-fronend.appspot.com",
  messagingSenderId: "571429087187",
  appId: "1:571429087187:web:5477c86168a19fa88b7126",
  measurementId: "G-HJRST22SWR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export const uploadImgae = (file) =>
{
  const storageRef = ref(storage,"images/"+file.name);
  const uploadTask = uploadBytesResumable(storageRef,file)
  let imageUrl;

  uploadTask.on('state_changed',
  (snapshot) => {}, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  async () => {
    // Upload completed successfully, now we can get the download URL
    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>console.log(downloadURL))
  })

}
export const getImage = (name,returnUrl) =>
{
  console.log(name)
  const starsRef = ref(storage, "images/"+name);
  getDownloadURL(starsRef)
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    returnUrl=url;
  })
  .catch((error) => {
    // Handle any errors
  });
}

export {storage};