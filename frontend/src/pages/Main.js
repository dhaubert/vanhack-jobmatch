import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'

import './Main.css'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import itsamatch from '../assets/itsamatch.png'
import api from '../services/api';

export default function Main({ match }) {
    const [jobs, setJobs] = useState([])
    const [matchDev, setMatchDev] = useState(false)

    useEffect( () => {
        async function loadJobs() {
            const response = await api.get('/jobs', {
                headers: {
                    user: localStorage.getItem('user')
                }
            })

            setJobs(response.data)
        }

        loadJobs()
    }, [match.params.id])

    // useEffect(() => {
    //     const socket = io('http://localhost:3333', { 
    //         query: {
    //             user: match.params.id
    //         }
    //     })

    //     socket.on('match', dev => {
    //         setMatchDev(dev)
    //     })
    // }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/jobs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        })

        setJobs(jobs.filter(job => job._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/jobs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        })

        setJobs(jobs.filter(job => job._id !== id))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Logo Tindev" />
            </Link>

            { jobs.length > 0 ? (
                <ul>
                    {jobs.map(job => (
                        <li key={job._id}>
                            {/* <img src={user.avatar} alt={user.name}/> */}
                            <footer>
                                <strong>{job.title}</strong>
                                <p>{job.description}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(job._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>

                                <button type="button" onClick={() => handleLike(job._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
            <div className="empty">No jobs in the timeline.</div>
            )}

            { matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="" />

                    <img className="avatar" src={matchDev.avatar} alt="" />                    
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>

                    <button type="button" onClick={() => setMatchDev(false)}>Fechar</button>
                </div>

            )}
        </div>
    )
}