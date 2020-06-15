import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)
  
  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
       
        props.updateUser(user.id, user)
      }}
    >
      <h2>Editar Curso</h2>
      <label>Nome do Curso</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Data do início</label>
      <input type="date" name="startDate" onChange={handleInputChange} />
      <label>Data do término</label>
      <input type="date" name="endDate" onChange={handleInputChange} />
      <button>editar curso</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        cancelar
      </button>
    </form>
  )
}

export default EditUserForm
