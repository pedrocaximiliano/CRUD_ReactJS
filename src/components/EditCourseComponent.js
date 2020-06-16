import React, { useState, useEffect } from 'react'
import { Jumbotron } from 'react-bootstrap';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import 'moment/locale/it.js';
import moment from 'moment'

const EditCourseComponent = props => {
  const [ course, setCourse ] = useState(props.currentCourse);
  const [ showEndDate, setShowEndDate ] = useState({ endDate: true});
  const calenderDate = new Date;
  const [calenderEndDate, setCalenderEndDate] = useState({
      endDate: new Date
  });
  useEffect(
    () => {
      setCourse(props.currentCourse)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target
    setCourse({ ...course, [name]: value })
  }

  function handleInputChangeStartCalender(e){
    const startDate = moment(e).format('DD/MM/yyyy');
    setCourse({ ...course, startDate: startDate });
    setCalenderEndDate({ ...calenderEndDate,  date: e });
    setShowEndDate({ ...showEndDate, endDate: false });
};

function handleInputChangeReturnCalender(e){
    const endDate = moment(e).format('DD/MM/yyyy');
    setCourse({ ...course, endDate: endDate });
};

  return (
    <Jumbotron>
 <form
      onSubmit={event => {
        event.preventDefault()
       
        props.updateCourse(course.id, course)
      }}
    >
      <h2>Editar Curso</h2>
      <label>Nome do Curso</label>
      <input type="text" name="name" value={course.name} onChange={handleInputChange} required/>
      <label>Data do início</label>
      <DatePickerInput
          required
          minDate={calenderDate}
          onChange={handleInputChangeStartCalender}
          className='my-custom-datepicker-component'
        />
      <label>Data do término</label>
        <DatePickerInput
          required
          disabled={showEndDate.endDate}
          minDate={calenderEndDate.date}
          onChange={handleInputChangeReturnCalender}
          className='my-custom-datepicker-component'
        />
      <button style={{marginBottom: 10}}> editar curso</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        cancelar
      </button>
    </form>
    </Jumbotron>
   
  )
}

export default EditCourseComponent
