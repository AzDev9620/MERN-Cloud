import React, { useState } from 'react'
import InputsCustoms from '../../components/inputs'
import { register } from '../../actions/user';
import "./style.scss";
export default function RegistPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(email);
    console.log(password);
    return (
        <div className='registration'>
            <h2>RegistPage</h2>
            <InputsCustoms value={email} setValue={setEmail} type="text" placeholder="Ведите email" />
            <InputsCustoms value={password} setValue={setPassword} type="password" placeholder="Ведите пароль" />
            <button onClick={() => register(email, password)}>Регистрация</button>
        </div>
    )
}
