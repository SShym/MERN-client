import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = ({ register, errors, showPassword, handleClickShowPassword, handleMouseDownPassword }) => {
    return(
        <>
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
    )
}

export default Password;