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
  var user_name = localStorage.getItem("user_name");
  var room_name = localStorage.getItem("room_name");
  var user_name2 = localStorage.getItem("user_name2");
  document.getElementById("user_name2").innerHTML =
    "Welcome " + user_name2 + " to " + room_name + " room!";
  getData();
  firebase.analytics();
  
  function getData() {
    firebase
      .database()
      .ref("/" + room_name)
      .on("value", function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
  
          if (childKey != "purpose") {
            var firebase_message_id = childKey;
            var message_data = childData;
            //Start code
            console.log(firebase_message_id);
            console.log(message_data);
            var name = message_data["name"];
            var message = message_data["message"];
            var like = message_data["like"];
            var name_with_tag =
              "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
            var message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            var like_button =
              "<button class='btn btn-warning' id=" +
              firebase_message_id +
              " value=" +
              like +
              " onclick='updateLike(this.id)'>";
            var span_with_tag =
              "<span class='glyphicon glyphicon-thumbs-up'>Like: " +
              like +
              "</span></button><hr>";
  
            var row =
              name_with_tag + message_with_tag + like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;
            //End code
          }
        });
      });
  }
  
  function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    var button_id = message_id;
    var likes = document.getElementById(button_id).value;
    var updated_likes = Number(likes) + 1;
    console.log(updated_likes);
  
    firebase.database().ref(room_name).child(message_id).update({
      like: updated_likes,
    });
  }
  
  function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter.html");
  }
  
  function send() {
    var msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      name: user_name2,
      message: msg,
      like: 0,
    });
    getData();
    document.getElementById("msg").value = "";
  }