import { Route, Routes } from "react-router-dom";
import LandingPage from "./lib/features/auth/LandingPage";
import HomePage from "./lib/features/home/HomePage";
import NotFound from "./lib/features/not-found/NotFound";

export default function App(){
  return(
    <Routes>
      <Route path = "/" element={<LandingPage/>}/>
      <Route path ="/home" element={<HomePage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}