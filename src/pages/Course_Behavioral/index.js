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
				setUsers(response.data)
			});
		},
		[]
	  )

	const initialFormState = { id: null, name: '', startDate: '', endDate: '', category: '' }

	const [ users, setUsers ] = useState({})
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addCourse = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)
		api.delete('/courses', {
			params: {
				id: id
			}
		}).then(response => {
			console.log(response.data);
		});
		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = async (id, updatedUser) => {
		setEditing(false)
        const { name, startDate,endDate } = updatedUser;
        
        const update = await api.put(`courses/${id}`, { name, startDate, endDate
		});
         if (update) {
             return (
              setUsers(users.map(user => (user.id === id ? updatedUser : user)))
             )
         } else {
            return console.log('erro', update);
         }
	}

	const editRow = user => {
		setEditing(true)
		setCurrentUser({ id: user.id, name: user.name, startDate: user.startDate, endDate: user.endDate, category: user.category })
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
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<AddCourseComponent addCourse={addCourse} />
						</Fragment>
					)}
				</div>
				<div className="flex-large grid">
					<Grid users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default Bahavioral
