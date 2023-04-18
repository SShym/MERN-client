import './Auth.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { loginUser, registerNewUser, registerNewUserViaPhone, loginUserViaPhone, sendSMS } from '../../redux/actions';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import background from '../../images/authBackground.jpg';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import Phone from './Phone/Phone';
import Email from './Email/Email';
import Password from './Password/Password';
import Name from './Name/Name';
import Verification from './Verification/Verification'
import GoogleButton from './GoogleButton/GoogleButton';

const Auth = () => {
    const [authMode, setAuthMode] = useState({
        mode: 'login', // login || register
        option: 'email' // phone || email
    });

    const [verifyMode, setVerifyMode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register, getValues, handleSubmit, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.appReducer.loading);

    useEffect(() => {
        reset();
    }, [authMode.mode, authMode.option]) // eslint-disable-line
    
    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const onSubmit = (data) => {
        if(authMode.mode === 'register' && authMode.option === 'email'){
            dispatch(registerNewUser(data, navigate, toast));
        } else if(authMode.mode === 'login' && authMode.option === 'email'){
            dispatch(loginUser(data, navigate, toast));
        } 
        else if(authMode.mode === 'login' && authMode.option === 'phone'){
            if(parseInt(data.verificationCode) === verificationCode){
                dispatch(loginUserViaPhone(data.phone, navigate, toast));
            } else {
                toast.error('You have entered an invalid code!')
            }
        } else if(authMode.mode === 'register' && authMode.option === 'phone'){
            if(parseInt(data.verificationCode) === verificationCode){
                dispatch(registerNewUserViaPhone(data, navigate, toast, setVerificationCode));
            } else {
                toast.error('You have entered an invalid code!')
            }
        }
    }

    const handleSendSMS = () => {
        const values = getValues();
        
        dispatch(sendSMS(values.phone, toast, setVerificationCode, setVerifyMode, authMode));
    }

    return(
        <>
            <div style={{ backgroundImage: `url(${background})` }} className='auth'>
                <div className='auth__auth-block'>   
                    <div className='auth__auth-block-left'>
                        {authMode.mode === 'login'
                            ? <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                                {authMode.option === 'phone' 
                                    ? <div>
                                        <Phone register={register} errors={errors} />  
                                        {!verifyMode &&
                                            <Button 
                                                onClick={handleSubmit(handleSendSMS)}
                                                sx={{ mt: 1.5, mb: 3 }}
                                                disabled={loading} 
                                                size="large" 
                                                fullWidth 
                                                variant="contained" 
                                                type="submit"
                                            >
                                                SEND SMS
                                            </Button>
                                        }
                                    </div>                                      
                                    : <>
                                        <Email register={register} errors={errors} />
                                        <Password 
                                            register={register} 
                                            errors={errors} 
                                            showPassword={showPassword}
                                            handleClickShowPassword={handleClickShowPassword}
                                            handleMouseDownPassword={handleMouseDownPassword}
                                        />
                                    </>
                                }
                                
                                {verificationCode &&
                                    <Verification register={register} errors={errors} />
                                }

                                {(verifyMode || authMode.option === 'email') &&
                                    <Button disabled={loading} size="large" sx={{ mt: 1.5, mb: authMode.option === 'phone' ? 3 : 0 }} fullWidth variant="contained" type="submit">
                                        Login
                                    </Button>
                                }                     

                                {authMode.option === 'email' && <GoogleButton /> }
                                
                                <div onClick={() => setAuthMode({ ...authMode, mode: 'register' })} className='auth-block__auth-mode'>
                                    Don't have an account?
                                </div>
                            </form>
                            : <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                                {authMode.option === 'phone' 
                                    ? <Phone register={register} errors={errors} />
                                    : <Email register={register} errors={errors} />
                                }

                                <Name register={register} errors={errors} />

                                {authMode.option === 'email' &&
                                    <Password register={register} errors={errors} />
                                }

                                {(!verifyMode && authMode.option === 'phone') &&
                                    <Button 
                                        onClick={handleSubmit(handleSendSMS)}
                                        sx={{ mt: 1.5, mb: 3 }}
                                        disabled={loading} 
                                        size="large" 
                                        fullWidth 
                                        variant="contained" 
                                        type="submit"
                                    >
                                        SEND SMS
                                    </Button>
                                }

                                {verificationCode &&
                                    <Verification register={register} errors={errors} />
                                }

                                {(verifyMode || authMode.option === 'email') &&
                                    <Button disabled={loading} size="large" sx={{ mt: 1.5, mb: 2.5 }} fullWidth variant="contained" type="submit">
                                        Register
                                    </Button>
                                }

                                <div onClick={() => setAuthMode({ ...authMode, mode: 'login' })} className='auth-block__auth-mode'>
                                    Have an account?
                                </div>
                            </form>
                        }
                        <button 
                            onClick={() => {
                                setAuthMode(prev => ({
                                    ...prev,
                                    option: prev.option === 'email' ? 'phone' : 'email'
                                }));                                  
                            }} 
                            className='auth__auth-block-phone'
                        >
                            {authMode.option === 'phone' ? 'Email' : 'Phone'}
                            <ArrowRightAltOutlinedIcon sx={{ ml:1 }} />
                        </button>
                    </div>
                    <div className='auth__auth-block-right'>
                        <h1>Welcome</h1>
                        <span>Please {authMode === 'login' ? 'login' : 'register'} to continue with us!</span>
                    </div>
                </div>
                {loading &&
                    <Box sx={{ width: '100%', position:'absolute', bottom:'5px' }}>
                        <LinearProgress />
                    </Box>
                }
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default Auth;