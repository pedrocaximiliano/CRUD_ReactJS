import React from 'react'

import {BsFillTrashFill } from 'react-icons/bs';
import {GrEdit } from 'react-icons/gr';

const Grid = props => (
  <table>
    <thead>
      <tr>
        <th>Curso</th>
        <th>Início</th>
        <th>Término</th>
      </tr>
    </thead>
    <tbody>
    {props.courses.length > 0 ? (
        props.courses.map(course => (
          <tr key={course.id}>
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
)

export default Grid
