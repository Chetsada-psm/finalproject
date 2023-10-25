import { Routes, Route } from "react-router-dom";

import Navbar from './Navbar';
import User from "./User";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
          <Route path='/' element={<User />} />
          <Route path='/Add' element={<UserAdd />} />
          <Route path='/Edit/:id' element={<UserEdit />} />

          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
