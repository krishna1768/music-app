// checking if user is signed in or not
auth.onAuthStateChanged(user => {
    //const usernm = document.getElementById('signupUsername');
    if (user) {
        //console.log(usernm);
        fs.collection('usersSongs').doc(user.uid).get().then((snapshot) => {
            document.getElementById('audio').src = snapshot.data().Song;
        })
        console.log('user is signed in at users.html');
        uploadForm = document.querySelector(".uploadMusic");
        uploadForm.addEventListener("change", function (e) {
            console.log(e);
            var audio = e.target.files[0];
            var fs = firebase.firestore();
            var storageRef = firebase.storage().ref().child(user.uid);
            var task = storageRef.put(audio);
            storageRef.put(audio).then(() => {
                storageRef.getDownloadURL().then((url) => {
                    document.getElementById('audio').src = url;
                    fs.collection('usersSongs').doc(user.uid).update({
                        Song: url
                  });
               });
            });
            //databaseRef.ref("users/").set({Song: document.querySelector(".uploadSongName").value });
            task.on("state_changed", function progress(snapshot) {
                console.log((snapshot.bytesTransferred / audio.size) * 100 + "%");
                document.querySelector("#audioUpload").value =
                    (snapshot.bytesTransferred / audio.size) * 100;
                if(document.querySelector("#audioUpload").value == 100) {
                    alert('Song has been added successfully');
                    document.querySelector(".uploadMusic").value = "";
                    document.querySelector("#audioUpload").value = "";
                }   
            }); 
               
        });
         
    }
    
    else {
        alert('your login session has expired or you have logged out, login again to continue');
        location = "login.html";
    }
    
})

//logout
function logout() {
    auth.signOut();
}