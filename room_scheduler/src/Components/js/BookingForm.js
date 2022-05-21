import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { Link } from "react-router-dom"

import APIService from './APIService'

// Styles
import "react-datepicker/dist/react-datepicker.css"
import '../css/form.css'


export default function BookingForm() {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [rooms, setRooms] = useState()
    const [reactRooms, setReactRooms] = useState(<select id="roomSelector"></select>)

    const sendBooking = () => { //TODO add fields check to send data
        var room = document.getElementById("roomSelector").value
        var user = document.getElementById("userSelector").value
        APIService.InsertArticle({startDate, endDate, room, user})
        .then((response) => console.log(response))
        .catch(error => console.log('error',error))
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
            if(rooms['room1']==='available'){
                room1 = <option value="room1">room 1</option>
            }
            if(rooms['room2']==='available'){
                room2 = <option value="room2">room 2</option>
            }
            if(rooms['room3']==='available'){
                room3 = <option value="room3">room 3</option>
            }
        }catch{

        }
        setReactRooms(<select id="roomSelector">{room1}{room2}{room3}</select>)
    }, [rooms])

    return (
        <div>
            <div className="FormHolder">
                <h3>Starting date and hour</h3>
                <DatePicker className="DatePicker" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" timeIntervals={15}/>
                <h3>Ending date and hour</h3>
                <DatePicker className="DatePicker" selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp" timeIntervals={15}/>
                <h3>Room</h3>
                {reactRooms}
                <h3>User</h3>
                <select id="userSelector">
                    <option value="user1">user 1</option>
                    <option value="user2">user 2</option>
                    <option value="user3">user 3</option>
                    <option value="user4">user 4</option>
                    <option value="user5">user 5</option>
                </select>
                <button className="BtnBook" onClick={sendBooking}>Book room</button>
            </div> 
            <Link className="BookingsLink" to="/rooms">Rooms</Link>
        </div>
    )

}


