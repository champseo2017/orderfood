import React, { Component } from "react";

class Users extends Component {
  componentDidMount() {
    if (typeof window !== "undefined") {
      const showNotification = () => {
        const notification = new Notification("New message from dcode!", {
          body: "hey mate, how are ya?",
          icon: "/smile.png",
        });

        notification.onclick = (e) => {
          window.location.href = "https://google.com"
        }

        return false;
      };
      console.log(Notification.permission);

      if (Notification.permission === "granted") {
        showNotification();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showNotification();
          }
        });
      }
    }
  }
  render() {
    return <div>hello noti</div>;
  }
}

export default Users;
