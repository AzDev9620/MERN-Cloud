import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegistPage from "./pages/RegistPage";
import LayoutCustom from "./layouts/index";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/user";
import DiskPage from "./pages/DiskPage";
import ProfilePage from "./pages/ProfilePage";
export default function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  console.log(isAuth);
  useEffect(() => {
    dispatch(auth());
  }, []);
  return !isAuth ? (
    <Routes>
      <Route element={<LayoutCustom />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistPage />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route element={<LayoutCustom />}>
        <Route index element={<MainPage />} />
        <Route path="login/disc" element={<DiskPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}
