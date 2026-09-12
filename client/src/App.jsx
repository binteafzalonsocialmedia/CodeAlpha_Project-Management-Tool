import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'

import Registration from "./pages/shared/Registeration";
import Login from "./pages/shared/Login";
import ForgotPassword from "./pages/shared/ForgotPasword";
import Userdashboard from "./pages/Users/Dashboard";
import Resetpassword from "./pages/shared/ResetPassword";
import Task from "./pages/Users/TaskForm";
import ProjectDetails from './pages/Users/ProjectDetails';

function App() {
  const [FormData, setFormData] = useState(0)

  async function createUser(username, email, password, role) {
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(role);
    if (!username.trim()) return;
    const newUser = {
      id: Date.now(),
      username: username.trim(),
      email,
      password,
      role,
    };

    try {
      const response = await API.post("/auth/register", newUser);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
    setFormData([...FormData, newUser]);
  };

  return (
    <div>

      <Routes>
        <Route path="/auth/registration" element={<Registration createUser={createUser} />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/auth/resetpassword/:resetToken" element={<Resetpassword />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/task/create" element={<Task />} />
      </Routes>
    </div>
  )
}

export default App;
