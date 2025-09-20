import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import IssueDashboard from "./components/issue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repo/:owner/:repo" element={<IssueDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;