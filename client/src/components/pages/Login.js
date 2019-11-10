import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import styled from 'styled-components';
import Alert from '../misc/Alert';

const LoginInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px 15px;
    margin-top: 5px;
    border: none;
`;

export const SubmitBtn = styled.button`
    border: none;
    background-color: ${props => props.isDisabled ? '#666' : '#0faac5'};
    color: ${props => props.isDisabled ? '#444' : '#fff'};
    padding: 10px 15px;
    margin-top: 40px;

    :hover {
        cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
    }
`;

const Login = ({login, error, isAuthenticated, history}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [hasRequired, setHasRequired] = useState(false);

    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }
        
        if(formData.email && formData.password){
            setHasRequired(true);
        } else {
            setHasRequired(false);
        }
    },[formData, isAuthenticated, history])

    const submitForm = e => {
        e.preventDefault();
        login(formData);
    }
    
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})    
    }

    return (
        <div className="login-section">
            <h2 className="login-heading">Login</h2>
            <form onSubmit={e => submitForm(e)} id="login-form">
                {error && <Alert errorTxt={error}/>}
                <div>
                    <label htmlFor="email">Email</label>
                    <LoginInput type="text" value={formData.email} onChange={e => onChange(e)} name="email" placeholder="Email" required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <LoginInput type="password" value={formData.password} onChange={e => onChange(e)} name="password" placeholder="Password" required/>
                </div>
                <SubmitBtn type="submit" isDisabled={!hasRequired}>Login</SubmitBtn>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
