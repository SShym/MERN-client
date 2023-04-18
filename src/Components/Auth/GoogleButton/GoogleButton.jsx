import GoogleIcon from '@mui/icons-material/Google';
import { googleAuth } from '../../../redux/actions';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GoogleButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const loading = useSelector(state => state.appReducer.loading);

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
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={(renderProps) => (
                    <button className='google-login-button' onClick={renderProps.onClick} disabled={renderProps.disabled || loading} type="submit">
                        <GoogleIcon sx={{ mr: 1, fill:'white'}} />
                        Google Sign In
                    </button>
                )}
                onSuccess={handleGoogleAuth}
                onFailure={handleGoogleAuthError}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}

export default GoogleButton;