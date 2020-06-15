import React, { useState, useEffect } from 'react'

const EditCourseComponent = props => {
  const [ course, setCourse ] = useState(props.currentCourse)
  
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

  return (
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
      <input type="date" name="startDate" onChange={handleInputChange} required/>
      <label>Data do término</label>
      <input type="date" name="endDate" onChange={handleInputChange} required />
      <button>editar curso</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        cancelar
      </button>
    </form>
  )
}

export default EditCourseComponent
