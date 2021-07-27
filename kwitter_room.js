  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBhuzBgMocQEZDmGheFvsXjAwk5x0FHKCg",
    authDomain: "my-app-f477a.firebaseapp.com",
    projectId: "my-app-f477a",
    storageBucket: "my-app-f477a.appspot.com",
    messagingSenderId: "974499422816",
    appId: "1:974499422816:web:a8f50f4e3f696647be9905"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var user_name2 = localStorage.getItem("user_name2");
  document.getElementById("user_name2").innerHTML = "Welcome " + user_name2 + "!";
  firebase.analytics();
  
  function addRoom() {
    var room_name = document.getElementById("room_name").value;
  
    firebase.database().ref("/").child(room_name).update({
      purpose: "adding room name",
    });
  
    localStorage.setItem("room_name", room_name);
    getData();
  }
  
  function getData() {
    firebase
      .database()
      .ref("/")
      .on("value", function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var Room_names = childKey;
          //Start code
          console.log("Room Name - " + Room_names);
          var row =
            "<div class = 'room_name' id = " +
            Room_names +
            " onclick = 'redirectToRoomName(this.id)' >#" +
            Room_names +
            "</div><hr>";
          document.getElementById("output").innerHTML += row;
  
          //End code
        });
      });
  }
  getData();
  
  function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
  }
  
  function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter.html");
  } 