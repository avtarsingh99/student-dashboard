import React, { useState } from 'react'

function Card() {

    // const [isVisible, setIsVisible] = useState(true)
    // const handleDelete = () => {
    //     setIsVisible(!isVisible)
    // }

    return (
        <div className="student-card passed">
        {/* <div className={`student-card passed ${isVisible ? "" : "invisible"}`}> */}

            <div className='card-header'>
                <h3>Venkatraj Srivastav</h3>
            </div>

            <div className='card-data'>
                <p><strong>Subject: </strong>Tamil</p>
                <p><strong>Marks: </strong>76</p>
                <p><strong>Result: </strong>Pass</p>
            </div>

            <div className='card-bottom'>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Card
