import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';
import Constants from '../../constants';

const Home = () => {
    return (
           <div id="page-home">
           <div className="content">
               <header>
                <h1>Cadastre seu curso da Cast Group</h1>
               </header>
               <main>
               <div className="button-navigator">
                   <Link className="link" to={{pathname:"/course-programação", state: {
                        pathValue: Constants[0],
                    }}}>
                       <strong>Programação</strong>
                   </Link>
                   <Link className="link" to={{pathname:"/course-comportamental", state: {
                        pathValue: Constants[1],
                    }}}>
                       <strong>Comportamental</strong>
                   </Link>
               </div>
               <div className="button-navigator">
                    <Link className="link" to={{pathname:"/course-processos", state: {
                        pathValue: Constants[2],
                    }}}>
                       <strong>Processos</strong>
                   </Link>
                   <Link className="link" to={{pathname:"/course-qualidade", state: {
                        pathValue:  Constants[3],
                    }}}>
                       <strong>Qualidade</strong>
                   </Link>
               </div>
               </main>
           </div>
       </div>
    )
}
export default Home;