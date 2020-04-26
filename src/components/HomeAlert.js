import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'

export default function HomeAlert() {
    const context = useContext(RoomContext)

    const {homeAlert, handleHomeAlert} = context

    return (
        <div className={homeAlert ? 'homealert' : 'hideAlert'}>
            <span className="closebtnhome" onClick={handleHomeAlert}>&times;</span> 
            <span>
                This project was made with somebody's template.
                Everything from logical side was made by myself
                as is fully understandable for me.
                </span>
        </div>
    )
}