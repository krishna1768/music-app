// signup
const url = "https://firebasestorage.googleapis.com/v0/b/music-app-9669f.appspot.com/o/whoopty.mp3?alt=media&token=3028b9b1-8168-482a-bf63-0a6ef759d574";
const signupForm = document.getElementById("createAccount");
const btnsignUp = document.getElementById("btnsignUp");
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signupForm['signupUsername'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    console.log(name, email, password);
    signupForm.reset();

    
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        //console.log(success);
        fs.collection("usersSongs").doc(cred.user.uid).set({
            Song: url
        }),
        fs.collection("users").doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password
        }).then(() => {
            //console.log('success');
            location = "login.html";
        }).catch(err => {
            // console.log(err.message);
            alert('Could not redirect');
        })
    }).catch(err => {
        // console.log(err.message);
       alert('Sign Up unsuccessful');
    })
})
