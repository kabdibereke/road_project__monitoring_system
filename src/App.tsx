import React from 'react';
import Header from './components/Header/Header';
import RoadLine from './components/RoadLine/RoadLine';
import { Routes, Route,Navigate } from "react-router-dom";

function App() {
  return (
   <>
    <Header/>
    <Routes>
				<Route path='/3lot' element={<RoadLine/>} />
				<Route path='/4lot' element={<RoadLine/>} />
        <Route
        path="/"
        element={<Navigate to="/3lot" replace />}
      />
			</Routes>
    
   </>
  );
}

export default App;
