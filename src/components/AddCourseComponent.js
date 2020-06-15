import React, { useState } from 'react'
import Select from 'react-select'

import { Link } from 'react-router-dom';
import api from '../services/api';
import moment from 'moment'

const AddCourseComponent = props => {
    const options = [
        { value: '1', label: 'Comportamental' },
        { value: '2', label: 'Programação' },
        { value: '3', label: 'Qualidade' },
        { value: '3', label: 'Processos' }
      ]

    const [selectCategory, setSelectCategory] = useState({
        name: '',
        value: '',
    })
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        category: '',
        description: '',
        startDate: '',
        endDate: ''
    })
    
    function handleInputChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(e){
        e.preventDefault();
        const { name, startDate,endDate } = formData;
        const { value } = selectCategory;
        const formatStartDate = moment(startDate).format('DD/MM/yyyy');
        const formatEndDate= moment(endDate).format('DD/MM/yyyy');
        const data = {
            name,
            category: Number(value),
            //description,
            startDate: formatStartDate,
            endDate: formatEndDate
        }

        const filter = data.name === '' || data.startDate === 'Invalid date' || data.endDate === 'Invalid date' || data.category === 0;
         if (filter) {
             alert('preencha os campos faltantes');
         } else {
            const createCourse = await api.post('courses', data);
            if (createCourse.data.status !== 400) {
                return (
                   props.addCourse(createCourse.data),
                   setFormData({data: '' })
                )
              
            } else if ((createCourse.data.status === 500)) {
               return alert('preencha os campos');
            } else {
               return alert('Curso já Cadastrado');
            }
         }
    }

    function handleSelectChange(e){
      setSelectCategory({ ...selectCategory, value: e.value });
    };

	return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Link to="/">
            Voltar para Home
        </Link>
        <h1>Cadastre o curso</h1>
        
        <fieldset>
            <div className="field">
                <label htmlFor="name">Nome do Curso</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="field-group">
                <div className="field">
                    <label htmlFor="startDate">Data de inicio</label>
                    <input 
                        type="date"
                        name="startDate"
                        id="startDate"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="endDate">data do termino</label>
                    <input 
                        type="date"
                        name="endDate"
                        id="endDate"
                        onChange={handleInputChange}
                        required
                    />
                </div> 
             
            </div>
            <div className="field" style={{fontSize: 12}}>
                    <label htmlFor="category">Categoria</label>
                    <Select 
                    onChange={handleSelectChange} 
                    required
                    options={options} 
                    name="category"
                    id="category"
                    />
                </div>
                <div className="field">
                    <label htmlFor="description">Discrição do Curso</label>
                    <input 
                        type="textarea"
                        name="description"
                        id="description"
                        onChange={handleInputChange}
                        required
                    />
                </div> 
                <button type="submit">Cadastrar Curso</button>

        </fieldset>
    </form>
	)
}

export default AddCourseComponent
