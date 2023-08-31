import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main";
import { Settings } from "./Pages/Settings";
import { User } from "./Types/Types";
import { useEffect, useState } from "react";
import { fetchUserData } from "./Other/fetchUserData";

function App() {

  const [user, setUser] = useState<User>();

  async function getUserData(token: string) {
    const fetchedUser = await fetchUserData(token);

    setUser(fetchedUser);
  }

  useEffect(() => {
    const token: string = sessionStorage.getItem("token") as string;
    
    if(token !== null){
      getUserData(token)
    }
  }, [setUser]);

  return (
  <BrowserRouter>
    <Routes>
      <Route index element={<Login setUser={setUser} />}/>
      {user !== undefined && 
      <>
        <Route path="/main" element={<Main user={user} setUser={setUser} />}/>
        <Route path="/settings" element={<Settings user={user} setUser={setUser} />}/>
      </>}
      <Route path="*" element={<h1>This is not the page you are looking for...</h1>}/>
    </Routes>
  </BrowserRouter>);
}

export default App;
