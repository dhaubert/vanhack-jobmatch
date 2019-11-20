import React, { useState } from "react";
import "./Signup.css";

import api from "../services/api.js";


export default function Login({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [techs, setTechs] = useState([]);
  const [tags, setTags] = useState([]);
  const [experience, setExperience] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const user = localStorage.getItem("user");

    const response = await api.post(`/jobs`, {
      title: title,
      description: description,
      salary: salary,
      techs: techs.split(",").map(tech => tech.trim()),
      location: location,
      tags: tags.split(",").map(tech => tech.trim()),
      experience: experience
    },
    {
        headers: {
            user: user
        }
    });

    const { _id } = response.data;

    history.push(`/employer/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>VanHack Match</h1>
        <h3>Create new job</h3>
        
        <input
          placeholder="Title of the awesome job"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          placeholder="Type the description of the job here"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <input
          placeholder="How much the job pays in a year?"
          value={salary}
          onChange={event => setSalary(event.target.value)}
        />

        <input
          placeholder="Where is it located?"
          value={location}
          onChange={event => setLocation(event.target.value)}
        />

        <input
          placeholder="What are the techs required?"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />

        <input
          placeholder="What are the desired skills?"
          value={tags}
          onChange={event => setTags(event.target.value)}
        />

        {/* <img src={logo} alt="Tindev Logo"/> */}
        <select onChange={event => setExperience(event.target.value)}>
          <option value="">Not informed</option>
          <option value="0-3">0 to 3 years</option>
          <option value="4-6">4 to 6 yers</option>
          <option value="7+">7+</option>
        </select>

        <button type="submit">Create awesome job</button>
      </form>
    </div>
  );
}
