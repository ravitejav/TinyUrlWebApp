import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { defaultToaster } from '../../Constant/DefaultValue';
import { AuthHandler } from '../../Helpers/ApiHandler';
import { debounce } from '../../Helpers/Debounce';
import { jwtToken } from '../../Recoil';
import { Toaster } from '../Toaster';
import './auth.css';

const AuthForm = () => {

    const[forLogin, setForLogin] = useState(true);
    const[toasterSet, setToaster] = useState(defaultToaster);
    const[, setJwtToken] = useRecoilState(jwtToken);
    const navigate = useNavigate();

    const handleLogin = () => { 
        
    };

    const resetToast = () => {
        setToaster(defaultToaster);
    }

    const handleSignUp = async (e: any) => {
        try {
            const results = await AuthHandler(new FormData(e.target), forLogin);
            if(results.type == 'error') {
                setToaster(results);
                debounce(resetToast, 1000);
            } else {
                if(forLogin) {
                    setJwtToken(results.jwt);
                    navigate('/createUrl');
                }
                e.target.reset();
            }
        } catch(error: any) {
            setToaster({
                show: true,
                message: "Invalid details, Please Check",
                type: 'error'
            });
            debounce(resetToast, 1000);
        }
        
        
    }

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        handleSignUp(e);
    }
    
    return (
        <div className='loginFormContainer'>
            <h2>{forLogin ? "Login" : "SignUp"} Form</h2>
            <form onSubmit={handleFormSubmit}>
                {!forLogin && (<input type="text" placeholder="Name" name="name" />)}
                <input type="text" placeholder='Username' name="userName" />
                <input type="password" placeholder='Password' name="password" />
                <button type='submit'> {!forLogin ? "Register" : "Login"} </button>
            </form>
            <div className='register' onClick={() => setForLogin((status) => !status)}>
                <p>{forLogin ? "Don't" : "I"} have an account?</p>
                <span>{forLogin ? "Register" : "Login"}</span>
            </div>
            <Toaster message={toasterSet.message} type={toasterSet.type} show={toasterSet.show} />
        </div>
        
    );
}

export default AuthForm;