import React, { useState } from 'react'
import Select from 'react-select'

import { Link } from 'react-router-dom';
import api from '../services/api';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalError from '../components/ModalError'
import 'moment/locale/it.js';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';



import { Jumbotron } from 'react-bootstrap';

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
    const [show, setShow] = useState(false);
    const [valueModal, setValueModel] = useState(false);
    const calenderDate = new Date;
    const [calenderEndDate, setCalenderEndDate] = useState({
        endDate: new Date
    });
    const [ showEndDate, setShowEndDate ] = useState({ endDate: true});

    function handleInputChangeStartCalender(e){
        const startDate = moment(e).format('DD/MM/yyyy');
        console.log('sss0', e)
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
        const { name, startDate,endDate } = formData;
        const { value } = selectCategory;
        const data = {
            name,
            category: Number(value),
            //description,
            startDate,
            endDate
        }
        const filter = data.name === '' || data.startDate === 'Invalid date' || data.endDate === 'Invalid date' || data.category === 0;
        if (filter) {
            return (
               setShow(true),
               setValueModel('Incomplet Form')
            )
     
        } else {
           const createCourse = await api.post('courses', data);
           if (options[0].value = '1') {
               return console.log('salvou')
           } else if (createCourse.data.status !== 400) {
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

    function handleSelectChange(e){
      setSelectCategory({ ...selectCategory, value: e.value });
    };

	return (
        show ? (
          <ModalError value={valueModal} show={show} handleClick={handleChildClick.bind(this)} />
        ) : ( 
            <Jumbotron>
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
            <div className="field" style={{fontSize: 12}}>
                    <label htmlFor="category">Categoria</label>
                    <Select 
                    onChange={handleSelectChange} 
                    
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
                    />
                </div> 
                <button type="submit">Cadastrar Curso</button>

            </fieldset>
        </form>
            </Jumbotron>
        )
	)
}

export default AddCourseComponent
