import React from 'react'
import ReactDatePicker from 'react-datepicker'

function Calendar() {
    return (
        <div>
        <ReactDatePicker selectedDate={myDate} onChange={(d) => console.log(d)} isClearable={true} />
        </div>
    )
}

export default Calendar
