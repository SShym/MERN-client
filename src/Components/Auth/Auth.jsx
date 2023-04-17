import './Auth.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { googleAuth, loginUser, registerNewUser } from '../../redux/actions';
import { GoogleLogin } from 'react-google-login';
import background from '../../images/authBackground.jpg';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import AbcIcon from '@mui/icons-material/Abc';
import GoogleIcon from '@mui/icons-material/Google';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Auth = () => {
    const [authMode, setAuthMode] = useState('login');
    const [phoneAuth, setPhoneAuth] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.appReducer.loading);

    useEffect(() => {
        reset();
    }, [authMode, phoneAuth]) // eslint-disable-line
    
    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const onSubmit = (data) => {
        if(authMode === 'register' && !phoneAuth){
            dispatch(registerNewUser(data, navigate, toast));
        } else if(authMode === 'login' && !phoneAuth){
            dispatch(loginUser(data, navigate, toast));
        }
    }

    const handleGoogleAuth = (data) => {
        const formData = {
            user: {
                id: data.profileObj.googleId,
                email: data.profileObj.email,
                name: data.profileObj.name,
                avatar: data.profileObj.imageUrl
            }
        }

        dispatch(googleAuth(formData, navigate));
    }
    const handleGoogleAuthError = (error) => console.error(error);

    return(
        <>
            <div style={{ backgroundImage: `url(${background})` }} className='auth'>
                <div className='auth__auth-block'>   
                    <div className='auth__auth-block-left'>
                        {authMode === 'login'
                            ? <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                                {phoneAuth 
                                    ? <>
                                        <FormControl sx={{ mt: 1.5}} fullWidth variant="filled">
                                            <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Phone</InputLabel>
                                            <FilledInput 
                                                id="phone"
                                                shouldUnregister={true}
                                                {...register("phone", { 
                                                    required: true, 
                                                    minLength: 1,
                                                    pattern: { value: /^\+?[1-9]\d{8,14}$/ }
                                                })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                        >
                                                            <PhoneEnabledIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {errors?.phone &&
                                            <div className='auth-block__input-error'>
                                                {errors?.phone?.type === 'required' && <div>Phone is required</div>}
                                                {errors?.phone?.type === 'pattern' && <div>Phone is not correct</div>}
                                            </div>
                                        }
                                        </>
                                    : <>
                                        <FormControl sx={{ mt: 1.5}} fullWidth variant="filled">
                                            <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Email</InputLabel>
                                            <FilledInput 
                                                id="email"
                                                shouldUnregister={true}
                                                {...register("email", { 
                                                    required: true, 
                                                    minLength: 1,
                                                    pattern: { value: /\S+@\S+\.\S+/ }
                                                })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                        >
                                                            <AlternateEmailIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {errors?.email &&
                                            <div className='auth-block__input-error'>
                                                {errors?.email?.type === 'required' && <div>Email is required</div>}
                                                {errors?.email?.type === 'pattern' && <div>Email is not correct</div>}
                                            </div>
                                        }
                                        <FormControl sx={{ mt: 1.5 }} fullWidth variant="filled">
                                            <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Password</InputLabel>
                                            <FilledInput
                                                id="password"
                                                shouldUnregister={true}
                                                {...register("password", { required: true, minLength: 6 })}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {errors?.password &&
                                            <div className='auth-block__input-error'>
                                                {errors?.password?.type === 'required' && <div>Password is required</div>}
                                                {errors?.password?.type === 'minLength' && <div>Password too short</div>}
                                            </div>
                                        }
                                        
                                    </>
                                }
                                <div onClick={() => setAuthMode('register')} className='auth-block__auth-mode'>
                                    Don't have an account?
                                </div>
                                <Button disabled={loading} size="large" sx={{ mt: 1.5, mb: phoneAuth ? 3 : 0 }} fullWidth variant="contained" type="submit">Login</Button>
                                {!phoneAuth &&
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_ID}
                                        render={(renderProps) => (
                                            <button className='google-login-button' onClick={renderProps.onClick} disabled={renderProps.disabled || loading} type="submit">
                                                <GoogleIcon sx={{ mr:1, fill:'white'}} />
                                                Google Sign In
                                            </button>
                                        )}
                                        onSuccess={handleGoogleAuth}
                                        onFailure={handleGoogleAuthError}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                }
                            </form>
                            : <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                                {phoneAuth 
                                    ? <div>
                                        <FormControl sx={{ mt: 1.5}} fullWidth variant="filled">
                                            <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Phone</InputLabel>
                                            <FilledInput 
                                                id="phone"
                                                shouldUnregister={true}
                                                {...register("phone", { 
                                                    required: true, 
                                                    minLength: 1,
                                                    pattern: { value: /^\+?[1-9]\d{1,14}$/ }
                                                })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                        >
                                                            <PhoneEnabledIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {errors?.phone &&
                                            <div className='auth-block__input-error'>
                                                {errors?.phone?.type === 'required' && <div>Phone is required</div>}
                                                {errors?.phone?.type === 'pattern' && <div>Phone is not correct</div>}
                                            </div>
                                        }
                                        </div>
                                    : <div>
                                        <FormControl sx={{ mt: 1.5}} fullWidth variant="filled">
                                            <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Email</InputLabel>
                                            <FilledInput 
                                                id="email"
                                                shouldUnregister={true}
                                                {...register("email", { 
                                                    required: true, 
                                                    minLength: 1,
                                                    pattern: { value: /\S+@\S+\.\S+/ }
                                                })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                        >
                                                            <AlternateEmailIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {errors?.email &&
                                            <div className='auth-block__input-error'>
                                                {errors?.email?.type === 'required' && <div>Email is required</div>}
                                                {errors?.email?.type === 'pattern' && <div>Email is not correct</div>}
                                            </div>
                                        }
                                    </div>
                                }
                                <div>
                                    <FormControl sx={{ mt: 1.5 }} fullWidth variant="filled">
                                        <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Name</InputLabel>
                                        <FilledInput 
                                            id="name"
                                            shouldUnregister={true}
                                            {...register("name", { required: true, minLength: 1 })}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                    >
                                                    <AbcIcon sx={{ width:'20px', height:'20px' }} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {errors?.name &&
                                        <div className='auth-block__input-error'>
                                            {errors?.name?.type === 'required' && <div>Name is required</div>}
                                        </div>
                                    }
                                </div>
                                {!phoneAuth &&
                                    <div>
                                        <FormControl sx={{ mt: 1.5 }} fullWidth variant="filled">
                                            <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Password</InputLabel>
                                            <FilledInput
                                                id="password"
                                                shouldUnregister={true}
                                                {...register("password", { required: true, minLength: 6 })}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {errors?.password &&
                                            <div className='auth-block__input-error'>
                                                {errors?.password?.type === 'required' && <div>Password is required</div>}
                                                {errors?.password?.type === 'minLength' && <div>Password too short</div>}
                                            </div>
                                        }
                                    </div>
                                }
                                <div onClick={() => setAuthMode('login')} className='auth-block__auth-mode'>
                                    Have an account?
                                </div>
                                <Button disabled={loading} size="large" sx={{ mt: 1.5, mb: 2.5 }} fullWidth variant="contained" type="submit">Register</Button>
                            </form>
                        }
                        <button onClick={() => { setPhoneAuth(!phoneAuth); setAuthMode('login')}} className='auth__auth-block-phone'>
                            {phoneAuth === false ? 'Phone' : 'Email'} auth
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