import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddDepartment from "./screens/addDepartment";
import AddFaqScreen from "./screens/AddFaqScreen";
import UserLoginScreen from "./screens/customer/LoginScreen";
import UserSignUpScreen from "./screens/customer/SignUpScreen";
import ViewList from "./screens/customer/ViewList";
import DashBoard from "./screens/DashBoard";
import FaqScreen from "./screens/FaqScreen";
import Homepage from "./screens/Homepage";
import LoginScreen from "./screens/LoginScreen";
import ShowAppoitment from "./screens/ShowAppoitment";
import SignUpScreen from "./screens/SignUpScreen";
import WorkingDays from "./screens/WorkingDays";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path = "/signup" element = {<SignUpScreen />} />
        <Route path = "/user/signup" element = {<UserSignUpScreen />} />
        <Route path = "/addworking" element = {<WorkingDays />} />
        <Route path = "/add-department" element = {<AddDepartment />} />
        <Route path= "/login" element = {<LoginScreen />} />
        <Route path= "/user/login" element = {<UserLoginScreen />} />
        <Route path= "/faqs" element = {<FaqScreen />}/>
        <Route path= "/addfaq" element = {<AddFaqScreen />} />
        <Route path = "/dashboard" element = {<DashBoard />} />
        <Route path="/viewlist" element = {<ViewList />} />
        <Route path="/showappointment" element = {<ShowAppoitment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
