import React, { useState, useEffect } from "react"

// Styles
import '../css/rooms.css'


export default function Rooms() {

    const [rooms, setRooms] = useState([{}])
    const [colorRoom1, setColorR1] = useState('#30c07d')
    const [colorRoom2, setColorR2] = useState('#30c07d')
    const [colorRoom3, setColorR3] = useState('#30c07d')

    useEffect(() => {
    fetch("/now").then(
        res => res.json()
    ).then(
        rooms => {
        setRooms(rooms)
        }
    )
    }, [])

    useEffect(() => {
        console.log(rooms)
        if(rooms['room1']==="booked"){
            setColorR1('#D32F2F')
        }else{
            setColorR1('#30c07d')
        }
        if(rooms['room2']==="booked"){
            setColorR2('#D32F2F')
        }else{
            setColorR2('#30c07d')
        }
        if(rooms['room3']==="booked"){
            setColorR3('#D32F2F')
        }else{
            setColorR3('#30c07d')
        }
    }, [rooms])

    return (
        <div className="RoomsHolder">
            <div className="room" style={{backgroundColor: colorRoom1}}><h3>Room1</h3></div>
            <div className="room" style={{backgroundColor: colorRoom2}}><h3>Room2</h3></div>
            <div className="room" style={{backgroundColor: colorRoom3}}><h3>Room3</h3></div>
        </div> 
    )

}


