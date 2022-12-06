import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, [])
  console.log(user);

  return user ? <h1>Hello, you are logged in as {user.displayName}</h1> : <h1>You are not logged in!</h1>
}

export default Profile;
