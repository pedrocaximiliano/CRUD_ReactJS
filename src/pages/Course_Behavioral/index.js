import React, { useState, useEffect, Fragment } from 'react'
import AddCourseComponent from '../../components/AddCourseComponent'
import EditCourseComponent from '../../components/EditCourseComponent'
import Grid from '../../components/grid'

import './styles.css';

import api from '../../services/api';

const Bahavioral = (props) => {
	useEffect(() => {
			api.get('/courses', {
				params: {
					category: 1
				}
			}).then(response => {
				setCourse(response.data)
			});
		},
		[]
	  )

	const initialFormState = { id: null, name: '', startDate: '', endDate: '', category: '' }

	const [ courses, setCourse ] = useState({})
	const [ currentCourse, setCurrentCourse ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addCourse = course => {
		course.id = courses.length + 1
		setCourse([ ...courses, course ])
	}

	const deleteCourse = id => {
		setEditing(false)
		api.delete('/courses', {
			params: {
				id: id
			}
		}).then(response => {
			console.log(response.data);
		});
		setCourse(courses.filter(course => course.id !== id))
	}

	const updateCourse = async (id, updCourse) => {
		setEditing(false)
        const { name, startDate,endDate } = updCourse;
        
        const update = await api.put(`courses/${id}`, { name, startDate, endDate
		});
         if (update) {
             return (
				setCourse(courses.map(course => (course.id === id ? updCourse : course)))
             )
         } else {
            return console.log('erro', update);
         }
	}

	const editRow = course => {
		setEditing(true)
		setCurrentCourse({ id: course.id, name: course.name, startDate: course.startDate, endDate: course.endDate, category: course.category })
	}

	return (
		<div className="container">
			<div className="flex-row">
				<div className="flex-large addCourse">
					{editing ? (
						<Fragment>
							<EditCourseComponent
								editing={editing}
								setEditing={setEditing}
								currentCourse={currentCourse}
								updateCourse={updateCourse}
							/>
						</Fragment>
					) : (
						<Fragment>
							<AddCourseComponent addCourse={addCourse} />
						</Fragment>
					)}
				</div>
				<div className="flex-large grid">
					<Grid courses={courses} editRow={editRow} deleteCourse={deleteCourse} />
				</div>
			</div>
		</div>
	)
}

export default Bahavioral
