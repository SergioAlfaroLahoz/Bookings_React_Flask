import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import BookingForm from "./Components/js/BookingForm"
import Rooms from "./Components/js/rooms"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm/>}/>
        <Route path="/rooms" element={<Rooms/>}/>
      </Routes>
    </Router>
  );

}

export default App;
