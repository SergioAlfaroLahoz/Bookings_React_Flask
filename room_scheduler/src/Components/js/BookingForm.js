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
    const [rooms, setRooms] = useState()
    const [reactRooms, setReactRooms] = useState(<select id="roomSelector" onChange={() => setRoomValue()}></select>)

    // useEffect(() => {
    //   APIService.InsertArticle({title,body})
    //   .then((response) => console.log(response))
    //   .catch(error => console.log('error',error))
    // }, [title && body])

    const sendBooking = () => { //TODO add fields check to send data
        APIService.InsertArticle({startDate, endDate, room})
        .then((response) => console.log(response))
        .catch(error => console.log('error',error))
    }

    const setRoomValue = () => {
        setRoom(document.getElementById("roomSelector").value)
    }

    useEffect(() => {
        console.log(JSON.stringify(startDate))
        console.log(JSON.stringify(endDate))
        var url = "/rooms?startDate=" + JSON.stringify(startDate) + "&endDate=" + JSON.stringify(endDate)
        fetch(url).then(
            res => res.json()
        ).then(
            rooms => {
            setRooms(rooms)
            }
        )
    }, [startDate, endDate])

    useEffect(() => {
        console.log(rooms)
        var room1 = null
        var room2 = null
        var room3 = null
        try{
            if(rooms['room1']=='available'){
                room1 =<option value="room1">room 1</option>
            }
            if(rooms['room2']=='available'){
                room2 =<option value="room2">room 2</option>
            }
            if(rooms['room3']=='available'){
                room3 =<option value="room3">room 3</option>
            }
        }catch{

        }
        setReactRooms(<select id="roomSelector" onChange={() => setRoomValue()}>{room1}{room2}{room3}</select>)
    }, [rooms])

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
            {reactRooms}
            {/* <p>{room}</p> */}
            <button className="BtnBook" onClick={sendBooking}>Book room</button>
        </div> 
    )

}


