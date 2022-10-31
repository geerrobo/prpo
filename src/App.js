import Nav from "./component/Nav";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import PurchaseList from "./routes/PurchaseList";

function App() {
  return (
    <div className="h-screen overflow-hidden flex background flex-col items-center bg-slate-300">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home operation={false} />} />
          <Route path="/purchase-list" element={<PurchaseList />} />
          <Route path="/operation" element={<Home operation={true} />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home logout={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
