import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

const Home = () => {
    return (
           <div id="page-home">
           <div className="content">
               <header>
                <h1>Cadastre seu curso da Cast Group</h1>
               </header>
               <main>
               <div className="button-navigator">
                   <Link className="link" to="/course-programação">
                       <strong>Programação</strong>
                   </Link>
                   <Link className="link" to="/course-comportamental">
                       <strong>Comportamental</strong>
                   </Link>
               </div>
               <div className="button-navigator">
                    <Link className="link" to="/course-processos">
                       <strong>Processos</strong>
                   </Link>
                   <Link  className="link"to="/course-qualidade">
                       <strong>Qualidade</strong>
                   </Link>
               </div>
               </main>
           </div>
       </div>
    )
}
export default Home;