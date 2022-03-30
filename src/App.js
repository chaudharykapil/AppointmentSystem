import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaqScreen from "./screens/FaqScreen";
import Homepage from "./screens/Homepage";
import SignUpScreen from "./screens/SignUpScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path = "/signup" element = {<SignUpScreen />} />
        <Route path="/faqs" element = {<FaqScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
