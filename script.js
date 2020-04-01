document.getElementById("nav_home_content").style.display = "block";
document.getElementById("nav_home").className = "nav_item active";
var n = 1;
function carousel(left) {
  if(left==true){
    if(n==1){
      n = 4;
    }
    else{
    n--;
    }
  }
  else{
    if(n==4){
      n=1;
    }
    else{
    n++;
    }
  }
  document.getElementById("carousel").src = "assets/a" + n + ".jpg";
  // if (n == 4) {
  //   n = 1;
  // } else {
  //   n++;
  // }
  // setTimeout(carousel, 3000);
}
// window.onload = function(){
//   console.log("onload");
//   window.onscroll = function() {
//   console.log("onscroll");
//   console.log(window.pageYOffset);
//   scrollFunction();
//   };
// }

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    console.log("Scroll");
    var navs = document.getElementsByClassName("nav_item");
  for (var i = 0; i < navs.length; i++) {
    navs[i].className = navs[i].className.replace(" active", "");
  }
  document.getElementById("nav_home").className+=" active";
  } else {

  }
}
get_societyname();
get_vacant_flats();
get_house_keeper();
get_society_members();
function nav_select(event, selected_nav) {
  var navs = document.getElementsByClassName("nav_item");
  for (var i = 0; i < navs.length; i++) {
    navs[i].className = navs[i].className.replace(" active", "");
  }
  event.currentTarget.className += " active";
  // document.getElementById("nav_home_content").style.display = "none";
  // document.getElementById("nav_contactus_content").style.display = "none";
  // document.getElementById("nav_society_details_content").style.display = "none";
  // console.log(event.currentTarget.id);
  // document.getElementById(event.currentTarget.id+"_content").style.display = "table";
}
function signup_on() {
  document.getElementById("signin_container").style.display = "none";
  document.getElementById("signup_container").style.display = "block";
}
function signup_off() {
  document.getElementById("signup_container").style.display = "none";
}
function signin_on() {
  document.getElementById("signin_container").style.display = "block";
}
function signin_off() {
  document.getElementById("signin_container").style.display = "none";
}

function email() {
  console.log("Email Started");
  db.collection("users")
    .doc("ibNn51CmclU7neCxHSiBBJbaZaW2")
    .get()
    .then(function(data) {
      alert(data.email);
      console.log("Email : " + data.email);
      document.getElementById("show_email").innerHTML = data.email;
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

  db.collection("users")
    .doc("ibNn51CmclU7neCxHSiBBJbaZaW2")
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}
function signup() {
  var email = document.getElementById("signup_email").value;
  var pass = document.getElementById("signup_pass").value;
  var cpass = document.getElementById("signup_cpass").value;
  var name = document.getElementById("signup_name").value;
  var block = document.getElementById("signup_block").value;
  var flat = document.getElementById("signup_flat").value;
  var residents = document.getElementById("signup_residents").innerText;
  console.log(email + " - " + pass);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch(function(err) {});
  firebase
    .auth()
    .onAuthStateChanged(function(user) {
      db.collection("users")
        .doc(user.uid)
        .set({
          email: email,
          uid: user.uid,
          name: name,
          block: block,
          flat: flat,
          residents: parseInt(residents)
        });
    })
    .then(function(user) {
      console.log("Signup", user.email);
      alert("Signup : " + user.email);
    });
  signup_off();
}

function signin() {
  var userEmail = document.getElementById("signin_email").value;
  var userPass = document.getElementById("signin_pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function(user) {
      signin_off();
      db.collection("users")
        .doc(user.user.uid)
        .get()
        .then(function(data) {
          console.log(data.data());
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

function logout() {
  firebase.auth().signOut();
}

function resident_inc() {
  var number = document.getElementById("signup_residents").innerText;
  document.getElementById("signup_residents").innerHTML = parseInt(number) + 1;
}
function resident_dec() {
  var number = document.getElementById("signup_residents").innerText;
  if (parseInt(number) > 1) {
    document.getElementById("signup_residents").innerHTML =
      parseInt(number) - 1;
  }
}
// function get_contact_details(){
//   db.collection("admin").doc("info").get().then(function(snapshot){
//     var data = snapshot.data();
//     console.log(data.phone);
//     document.getElementById("contactus_phone").innerHTML = data.phone;
//   }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
// }
function get_societyname() {
  db.collection("admin")
    .doc("info")
    .get()
    .then(function(snapshot) {
      var data = snapshot.data();
      console.log(data);
      document.getElementById("society_name").innerHTML = data.societyname;
      document.getElementById("contactus_societyname").innerHTML =
        data.societyname;
      document.getElementById("contactus_near").innerHTML = data.near;
      document.getElementById("contactus_area").innerHTML = data.area;
      document.getElementById("contactus_city").innerHTML = data.city;
      document.getElementById("contactus_pincode").innerHTML = data.pincode;
      document.getElementById("contactus_phone").innerHTML = data.contact;
      document.getElementById("contactus_email").innerHTML = data.email;
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}
function get_society_members() {
  db.collection("admin")
    .doc("members")
    .get()
    .then(function(snapshot) {
      var data = snapshot.data();
      for (var i = 0; i <= data.member_list.length; i++) {
        db.collection("users")
          .doc(data.member_list[i])
          .get()
          .then(function(snap) {
            var user_data = snap.data();
            var table = document.getElementById("mem_body");

            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            var cell1 = row.insertCell(0);

            var member_name = document.createElement("a");
            member_name.innerHTML = user_data.name;
            cell1.appendChild(member_name);
            var cell2 = row.insertCell(1);

            var member_position = document.createElement("a");
            member_position.innerHTML = user_data.position;
            cell2.appendChild(member_position);
            var cell3 = row.insertCell(2);

            var member_phone = document.createElement("a");
            member_phone.innerHTML = user_data.phone;
            cell3.appendChild(member_phone);
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

function get_vacant_flats() {
  db.collection("vacant_flats")
    .doc("owners")
    .get()
    .then(function(snapshot) {
      var data = snapshot.data();
      console.log(data)
      for (var i = 0; i <= data.owner_list.length; i++) {
        db.collection("users")
          .doc(data.owner_list[i])
          .get()
          .then(function(snap) {
            var user_data = snap.data();
            var table = document.getElementById("vacantflats_body");

            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            var cell1 = row.insertCell(0);

            var member_name = document.createElement("a");
            member_name.innerHTML = user_data.name;
            cell1.appendChild(member_name);
            var cell2 = row.insertCell(1);

            var member_position = document.createElement("a");
            member_position.innerHTML = user_data.flat;
            cell2.appendChild(member_position);
            var cell3 = row.insertCell(2);

            var member_phone = document.createElement("a");
            member_phone.innerHTML = user_data.phone;
            cell3.appendChild(member_phone);
            var cell4 = row.insertCell(3);

            var member_bhk = document.createElement("a");
            member_bhk.innerHTML = user_data.bhk;
            cell4.appendChild(member_bhk);
             
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

function get_house_keeper() {
  db.collection("housekeepers")
    .get()
    .then(function(snapshot) {
      snapshot.forEach(function(doc) {
        console.log(doc.data().Name);
        var table = document.getElementById("housekeeper_list_body");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var cell1 = row.insertCell(0);

        var hk_name = document.createElement("a");
        hk_name.innerHTML = doc.data().Name;
        cell1.appendChild(hk_name);
        var cell2 = row.insertCell(1);

        var hk_phone = document.createElement("a");
        hk_phone.innerHTML = doc.data().Phone;
        cell2.appendChild(hk_phone);
       
      });
    }).catch(function(error) {
            console.log("Error getting document:", error);
          });
}
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.

//     document.getElementById("user_div").style.display = "block";
//     document.getElementById("login_div").style.display = "none";

//     var user = firebase.auth().currentUser;

//     if(user != null){

//       var email_id = user.email;
//       document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

//     }

//   } else {
//     // No user is signed in.

//     document.getElementById("user_div").style.display = "none";
//     document.getElementById("login_div").style.display = "block";

//   }
// });

// function show_email(){

// db.collection("users").doc("ibNn51CmclU7neCxHSiBBJbaZaW2").get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
// }
// function login(){
//   var userEmail = document.getElementById("signin_email").value;
//   var userPass = document.getElementById("signin_pass").value;
//   console.log(userEmail+" - "+userPass);
//   firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
//   .then(function(user){
//     signin_off();
//   db.collection("users").document(user.uid).get().then(function(data){
//   document.getElementById("show_email").innerHTML = data.email;
//   });
//   })

// }

// function signUp(){
//   console.log("SIGNUP");
//   var email = document.getElementById("signup_email").value;
//   var pass = document.getElementById("signup_pass").value;
//   var cpass = document.getElementById("signup_cpass").value;
//   var name = document.getElementById("signup_name").value;
//   var block = document.getElementById("signup_block").value;
//   var flat = document.getElementById("signup_flat").value;
//   var residents = document.getElementById("signup_residents").innerText;
//   console.log(email + " - " + pass);
//   firebase.auth().createUserWithEmailAndPassword(email, pass)
//  .catch(function (err) {
//  });
//  firebase.auth().onAuthStateChanged(function(user){
//    db.collection("users").doc(user.uid).set({
//      email: email,
//      uid: user.uid,
//      name: name,
//      block: block,
//      flat: flat,
//      residents: parseInt(residents),
//    });
//  });
// }

function scroll(){
  var top = window.scrollY;
  console.log(top);
}