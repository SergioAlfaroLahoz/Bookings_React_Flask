import React, { useState, useEffect } from "react"

import BookingForm from "./Components/js/BookingForm"
import Rooms from "./Components/js/rooms"

function App() {

  return (
    <div>
      <BookingForm/>
      <Rooms/>
    </div>
  );

}

export default App;
