import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Email = ({ register, errors }) => {
    return(
        <>
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
        </>
    )
}

export default Email;