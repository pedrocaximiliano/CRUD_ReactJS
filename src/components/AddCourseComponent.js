import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalError from '../components/ModalError'

import 'moment/locale/it.js';
import moment from 'moment'
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';

import { useSelector } from 'react-redux';

import { Jumbotron, Modal, Button } from 'react-bootstrap';
const AddCourseComponent = props => {
    
    //  const courses = useSelector(state => state.description);

    //  console.log('teste', courses);
     
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        category: '',
        description: '',
        startDate: '',
        endDate: ''
    })
    const [show, setShow] = useState(false);
    const [valueModal, setValueModel] = useState(false);
    const calenderDate = new Date;
    const [calenderEndDate, setCalenderEndDate] = useState({
        endDate: new Date
    });
    const [ showEndDate, setShowEndDate ] = useState({ endDate: true});

    function handleInputChangeStartCalender(e){
        const startDate = moment(e).format('DD/MM/yyyy');
        setFormData({ ...formData, startDate: startDate });
        setCalenderEndDate({ ...calenderEndDate,  endDate: e });
        setShowEndDate({ ...showEndDate, endDate: false });
    };

    function handleInputChangeReturnCalender(e){
        const endDate = moment(e).format('DD/MM/yyyy');
        setFormData({ ...formData, endDate: endDate });
    };

    function handleInputChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleChildClick(e){
        setShow(e)
    };
   
    async function handleSubmit(e){
        e.preventDefault();
        const { name, startDate,endDate, description} = formData;
        const data = {
            name,
            category: Number(props.valueCategory.value),
            description,
            startDate,
            endDate
        }
        const filter = data.name === '' || data.startDate === 'Invalid date' || data.description === '' || data.endDate === 'Invalid date' || data.category === props.valueCategory.value;
        if (filter) {
            return (
               setShow(true),
               setValueModel('Incomplet Form')
            )
     
        } else {
           const createCourse = await api.post('courses', data);
           if (createCourse.data.status !== 400) {
               return (
                  props.addCourse(createCourse.data),
                  setFormData({data: '' })
               )
             
           } else if ((createCourse.data.status === 400)) {
               return (
                   setShow(true),
                   setValueModel('Internal error')
               )
           } else {
               return setShow(true)
           }
        }
    }

	return (
        <>
        {show &&  <ModalError value={valueModal} show={show} handleClick={handleChildClick.bind(this)} /> }
        <Jumbotron>
        <form onSubmit={handleSubmit} autoComplete="off">
            <Link to="/">
            Voltar para Home
        </Link>
        <h1>Cadastre o curso</h1>
        <span>Categoria do curso: {props.valueCategory.label}</span>
        <fieldset>
        <div className="field" style={{fontSize: 12}}>
                </div>
            <div className="field">
                <label htmlFor="name">Nome do Curso</label>
                <input 
                    maxLength={10}
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
                       <DatePickerInput
                       required
                       minDate={calenderDate}
                       onChange={handleInputChangeStartCalender}
                       className='my-custom-datepicker-component'
                />
                </div>
                <div className="field">
                    <label htmlFor="endDate">data do termino</label>
                    <DatePickerInput
                    required
                    minDate={calenderEndDate.endDate}
                    onChange={handleInputChangeReturnCalender}
                    disabled={showEndDate.endDate}
                    className='my-custom-datepicker-component'
                />
                </div> 
             
            </div>
      
                <div className="field">
                    <label htmlFor="description">Discrição do Curso</label>
                    <input 
                        maxLength={100}
                        type="textarea"
                        name="description"
                        id="description"
                        onChange={handleInputChange}
                    />
                </div> 
                <button type="submit">Cadastrar Curso</button>

            </fieldset>
        </form>
            </Jumbotron>
            </>
	)
}

export default AddCourseComponent
