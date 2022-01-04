import React, {  useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { defaultToaster } from '../../Constant/DefaultValue';
import { AuthHandler, getUrlById } from '../../Helpers/ApiHandler';
import { debounce } from '../../Helpers/Debounce';
import { jwtToken, userId } from '../../Recoil';
import { Toaster } from '../Toaster';
import './auth.css';

const AuthForm = () => {

    const [forLogin, setForLogin] = useState(true);
    const [toasterSet, setToaster] = useState(defaultToaster);
    const [, setJwtToken] = useRecoilState(jwtToken);
    const [, setUserId] = useRecoilState(userId);
    const [params, ] = useSearchParams();
    const navigate = useNavigate();

    const resetToast = () => {
        setToaster(defaultToaster);
    }

    useEffect(() => {
        const id = params.get('id');
        if (id) {
            getUrlById(id).then(res => {
                window.open(res.additionalData.UrlData.actualUrl, '_blank');
            });
        }
    });

    const handleAuth = async (e: any) => {
        try {
            const results = await AuthHandler(new FormData(e.target), forLogin);
            if(results.type == 'error') {
                setToaster(results);
                debounce(resetToast, 1000);
            } else {
                if(forLogin) {
                    setJwtToken(results.additionalData.jwt);
                    setUserId(results.additionalData.userDetails.id);
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
        handleAuth(e);
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