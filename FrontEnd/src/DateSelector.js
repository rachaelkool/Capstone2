import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelecter = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker 
        selected={startDate} 
        onChange={(date) => {
            setStartDate(date);  
            props.setDate(date)}}
        dateFormat='yyyy-MM-dd'
       />
    );
  };

  export default DateSelecter