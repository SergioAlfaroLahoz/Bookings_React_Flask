import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"

import APIService from './APIService'

// Styles
import "react-datepicker/dist/react-datepicker.css"
import '../css/form.css'


export default function BookingForm() {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [room, setRoom] = useState('room1')
    // const [data, setData] = useState([{}])
  
    // useEffect(() => {
    // fetch("/members").then(
    //     res => res.json()
    // ).then(
    //     data => {
    //     setData(data)
    //     console.log(data)
    //     }
    // )
    // }, [])

    // useEffect(() => {
    //   APIService.InsertArticle({title,body})
    //   .then((response) => console.log(response))
    //   .catch(error => console.log('error',error))
    // }, [title && body])

    const sendBooking = () => {
    APIService.InsertArticle({startDate, endDate, room})
    .then((response) => console.log(response))
    .catch(error => console.log('error',error))
    }

    const setRoomValue = () => {
    setRoom(document.getElementById("roomSelector").value)
    }

    // const insertArticle = () => {
    //   setBody("Test")
    //   setTitle("Hello world3")
    // }
    return (
        <div className="FormHolder">
            <h3>Starting date and hour</h3>
            <DatePicker className="DatePicker" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" timeIntervals={15}/>
            <h3>Ending date and hour</h3>
            <DatePicker className="DatePicker" selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp" timeIntervals={15}/>
            {/* <p>Actual date and Time: {JSON.stringify(startDate)}</p>
            <p>Last date and Time: {JSON.stringify(endDate)}</p> */}
            {/* <p>{data.members}</p> */}
            <select id="roomSelector" onChange={() => setRoomValue()}>
                <option value="room1">room 1</option>
                <option value="room2">room 2</option>
                <option value="room3">room 3</option>
            </select>
            {/* <p>{room}</p> */}
            <button className="BtnBook" onClick={sendBooking}>Book room</button>
        </div> 
    )

}


