import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Main from './pages/Main.js'
import MainEmployer from './pages/MainEmployer.js'
import newJob from './pages/newJob.js'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/talent/:id" component={Main} />
            <Route path="/employer/:id" component={MainEmployer} />
            <Route path="/newJob" component={newJob} />
        </BrowserRouter>
    )
}