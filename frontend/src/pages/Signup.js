import React, { useState } from 'react'
import './Signup.css'

import api from '../services/api.js'

import logo from '../assets/logo.svg'

export default function Login( { history }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();        

        const userType = type || 'talent'; 
        const response = await api.post(`/${userType}`, {
            email: email,
            name: name,
            password: password
        })

        const { _id } = response.data

        localStorage.setItem('user', _id);

        history.push(`/${userType}/${_id}`)
    }

    async function handleTypeChange(event) {
        event.preventDefault();
        console.log('Typechanged', event.target.value);
        setType(event.target.value);
    }



    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>VanHack Match</h1>
                <h3>Connecting employers and talents from all over the world.</h3>
                {/* <img src={logo} alt="Tindev Logo"/> */}
                <select onChange={handleTypeChange} >
                    <option value='talent'>Talent</option>
                    <option value='employer'>Employer</option>
                </select>

                <input
                    placeholder="Type your email here"
                    value={ email }
                    onChange={ event => setEmail(event.target.value) }
                />

                <input
                    placeholder="Type your name here"
                    value={ name }
                    onChange={ event => setName(event.target.value) }
                />

                <input
                    type="password"
                    placeholder="Type your password here"
                    value={ password }
                    onChange={ event => setPassword(event.target.value) }
                />
                <button type="submit">Register</button>
                
            </form>
        </div>
    )
}

