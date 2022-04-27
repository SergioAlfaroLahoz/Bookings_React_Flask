import React, { useState, useEffect } from "react"

// Styles
import '../css/rooms.css'


export default function Rooms() {

    const [rooms, setRooms] = useState([{}])
    const [colorRoom1, setColorR1] = useState([{}])
    const [colorRoom2, setColorR2] = useState([{}])
    const [colorRoom3, setColorR3] = useState([{}])

    useEffect(() => {
    fetch("/rooms").then(
        res => res.json()
    ).then(
        rooms => {
        setRooms(rooms)
        }
    )
    }, [])

    useEffect(() => {
        if(rooms['room1']=="available"){
            setColorR1('#30c07d')
        }else{
            setColorR1('#D32F2F')
        }
        if(rooms['room2']=="available"){
            setColorR2('#30c07d')
        }else{
            setColorR2('#D32F2F')
        }
        if(rooms['room3']=="available"){
            setColorR3('#30c07d')
        }else{
            setColorR3('#D32F2F')
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


