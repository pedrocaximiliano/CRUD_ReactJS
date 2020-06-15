import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/index'
import Process from './pages/Course_Process/index'
import Quality from './pages/Course_Quality/index'
import Programmer from './pages/Course_Programmer/index'
import Behaviral from './pages/Course_Behavioral/index'

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/course-programação" exact component={Programmer} />
            <Route path="/course-qualidade" exact component={Quality} />
            <Route path="/course-comportamental" exact component={Behaviral} />
            <Route path="/course-processos" exact component={Process} />
        </Switch>
    </BrowserRouter>
    )
}
export default Routes;