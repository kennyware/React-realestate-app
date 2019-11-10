import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { SubmitBtn } from './Login';
import styled from 'styled-components';
import Alert from '../misc/Alert';

const RegisterInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px 15px;
    margin-top: 5px;
    border: none;
`;

const Register = ({register, isAuthenticated, history, error}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [hasRequired, setHasRequired] = useState(false)

    const { username, email, password, confirmPassword } = formData;

    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }
        
        if(username && email && password && confirmPassword){
            setHasRequired(true);
        } else {
            setHasRequired(false);
        }
    }, [username, email, password, confirmPassword, history, isAuthenticated])

    const submitForm = e => {
        e.preventDefault();
        register(formData);
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div className="register-section">
            <h2 className="register-heading">Sign Up</h2>
            <form onSubmit={e => submitForm(e)} id="register-form">
                {error && <Alert errorTxt={error}/>}
                <div>
                    <label htmlFor="username">Username</label>
                    <RegisterInput type="text" value={username} onChange={e => onChange(e)} name="username" placeholder="Username" required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <RegisterInput type="text" value={email} onChange={e => onChange(e)} name="email" placeholder="Email" required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <RegisterInput type="password" value={password} onChange={e => onChange(e)} name="password" placeholder="Password" required/>
                </div>
                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <RegisterInput type="password" value={confirmPassword} onChange={e => onChange(e)} name="confirmPassword" placeholder="Confirm Password" required/>
                </div>
                <SubmitBtn type="submit" isDisabled={!hasRequired}>Sign Up</SubmitBtn>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
})

export default connect(mapStateToProps, {register})(Register)
