import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFaqScreen from "./screens/AddFaqScreen";
import DashBoard from "./screens/DashBoard";
import FaqScreen from "./screens/FaqScreen";
import Homepage from "./screens/Homepage";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path = "/signup" element = {<SignUpScreen />} />
        <Route path="/login" element = {<LoginScreen />} />
        <Route path="/faqs" element = {<FaqScreen />}/>
        <Route path="/addfaq" element = {<AddFaqScreen />} />
        <Route path = "/dashboard" element = {<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
