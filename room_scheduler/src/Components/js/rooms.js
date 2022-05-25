import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Styles
import '../css/rooms.css'

//Pictures
import user1 from '../img/user1.png'
import user2 from '../img/user2.png'
import user3 from '../img/user3.png'
import user4 from '../img/user4.png'
import user5 from '../img/user5.png'
import blankUser from '../img/blankUser.png'


export default function Rooms() {

    const [rooms, setRooms] = useState([{}])
    const [colorRoom1, setColorR1] = useState('#30c07d')
    const [colorRoom2, setColorR2] = useState('#30c07d')
    const [colorRoom3, setColorR3] = useState('#30c07d')
    const [userRoom1, setUserR1] = useState(blankUser)
    const [userRoom2, setUserR2] = useState(blankUser)
    const [userRoom3, setUserR3] = useState(blankUser)
    const [temperatureRoom1, setTemperatureR1] = useState('')
    const [temperatureRoom2, setTemperatureR2] = useState('')
    const [temperatureRoom3, setTemperatureR3] = useState('')
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
          setDate(new Date)
        }, 1000);
    }, []);

    const setUsers = (users) => {
        if(users==="user1") return user1
        else if(users==="user2") return user2
        else if(users==="user3") return user3
        else if(users==="user4") return user4
        else if(users==="user5") return user5
        else if(users==="none") return blankUser
    }

    useEffect(() => {
        // const iuserInterval = setInterval(() => {
            fetch("/users").then(
                res => res.json()
            ).then(
                users => {
                    setUserR1(setUsers(users["room1"]))
                    setUserR2(setUsers(users["room2"]))
                    setUserR3(setUsers(users["room3"]))
                }
            )
        // }, 2000);
    }, []);

    useEffect(() => {
        fetch("/temperature").then(
            res => res.json()
        ).then(
            temperature => {
                setTemperatureR1(temperature["room1"])
                setTemperatureR2(temperature["room2"])
                setTemperatureR3(temperature["room3"])
            }
        )
    }, []);

    useEffect(() => {
        const iuserInterval = setInterval(() => {
            fetch("/temperature").then(
                res => res.json()
            ).then(
                temperature => {
                    setTemperatureR1(temperature["room1"])
                    setTemperatureR2(temperature["room2"])
                    setTemperatureR3(temperature["room3"])
                }
            )
        }, 10000);
    }, []);

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
        <div>
            <h2 className="Clock">{date.toLocaleString()}</h2>
            <div className="RoomsHolder">
                <div className="room" style={{backgroundColor: colorRoom1}}>
                    <h3>Room1</h3>
                    <img src={userRoom1} alt="user"></img>
                    <h3>Temperature: {temperatureRoom1}°C</h3>
                </div>
                <div className="room" style={{backgroundColor: colorRoom2}}>
                    <h3>Room2</h3>
                    <img src={userRoom2} alt="user"></img>
                    <h3>Temperature: {temperatureRoom2}°C</h3>
                </div>
                <div className="room" style={{backgroundColor: colorRoom3}}>
                    <h3>Room3</h3>
                    <img src={userRoom3} alt="user"></img>
                    <h3>Temperature: {temperatureRoom3}°C</h3>
                </div>
            </div> 
            <Link className="BookingsLink" to="/">Bookings</Link>
        </div>
    )

}


