import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusRoutes from './BusRoutes';
import MetroArterialSystemupdated from './resources/Metro-Arterial-System-updated.jpg';
function App() {
  return (
    <div className="App flex w-screen flex-col justify-center">
      <h1 className="font-bold text-xl font-mono my-6">Metro Transit Next Trip</h1>
      <div className=" flex justify-center">
        <img className="hover:border-solid hover:border-2 hover:border-indigo-700 transition ease-in duration-200" src={MetroArterialSystemupdated} width={600} height={600} alt='map of metro routes' />
      </div>
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
