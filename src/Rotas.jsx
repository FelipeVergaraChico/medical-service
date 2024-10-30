import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Message from "./components/layout/Message";
import CreateOrs from "./components/pages/Ors/CreateOrs";

import { UserProvider } from "./context/UserContext";
import Header from "./components/layout/Header";
import ViewOrs from "./components/pages/Ors/View/ViewOrs";
import Users from "./components/pages/Users/Users";
import OrsUsers from "./components/pages/Users/OrsUsers";
import EditOrs from "./components/pages/Ors/View/EditOrs/EditOrs";

export default function Rotas() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
            <Message />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<OrsUsers />} />
                    <Route path="/ors/add" element={<CreateOrs />} />
                    <Route path="/ors/myors" element={<ViewOrs />} />
                    <Route path="/ors/myors/edit/:id" element={<EditOrs />} />
                </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}
