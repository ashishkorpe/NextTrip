import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusRoutes from './BusRoutes';

function App() {
  return (
    <div className="App">
      <p>Welcome to my Next Trip Application</p>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BusRoutes />}>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
