import React, { useState } from 'react'
import InputsCustoms from './../../components/inputs/index';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import { useNavigate } from 'react-router-dom';
import "./style.scss";
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className='login'>
            <h2>LoginPage</h2>
            <InputsCustoms value={email} setValue={setEmail} type="text" placeholder="Ведите email" />
            <InputsCustoms value={password} setValue={setPassword} type="password" placeholder="Ведите пароль" />
            <button onClick={() => dispatch(login(email, password, navigate))}>Логин</button>
        </div>
    )
}


