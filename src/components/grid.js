import React, { useState } from 'react'

import {BsFillTrashFill } from 'react-icons/bs';
import {GrEdit, GrCircleInformation } from 'react-icons/gr';
import { Jumbotron } from 'react-bootstrap';

import ModalInformation from '../components/ModalInformation'

const Grid = props => {

  const [showDescription, setShowDescription] = useState({
    show: false,
    name: ''
  });
  const [description, setDescription] = useState('');

  async function handleChildClick(show, description, name){
    setShowDescription({...showDescription, name: name, show: show});
    setDescription(description)
  };
  return (
  showDescription.show ? (
      <ModalInformation value={description} show={showDescription} type={'description'} handleClick={handleChildClick.bind(this)} />
  ) : (
    <Jumbotron>
    <table>
      <thead>
        <tr>
           <th></th>
          <th>Curso</th>
          <th>Início</th>
          <th>Término</th>
        </tr>
      </thead>
      <tbody>
      {props.courses.length > 0 ? (
          props.courses.map(course => (
            <tr key={course.id}>
           <td><GrCircleInformation onClick={() => handleChildClick(true, course.description, course.name)} /></td>
              <td>{course.name}</td>
              <td>{course.startDate}</td>
              <td>{course.endDate}</td>
              <td>
                <button style={{margin: "0px 16px 0px 0px"}}
                  onClick={() => {
                    props.editRow(course)
                  }}
                  className="button muted-button"
                >
                  <GrEdit/>
                </button>
                <button style={{margin: "0px 16px 0px 0px"}}
                  onClick={() => props.deleteCourse(course.id)}
                  className="button muted-button"
                >
                    <BsFillTrashFill/>
                </button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan={3}>Sem cursos cadastrados</td>
            </tr>
          )}
        </tbody>
    </table>
    </Jumbotron>
  )
    
    )
        }

export default Grid
