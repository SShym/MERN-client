import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const Phone = ({ register, errors }) => {
    return(
        <>
            <FormControl sx={{ mt: 1.5}} fullWidth variant="filled">
                <InputLabel sx={{ fontSize:'15px' }} shrink htmlFor="filled-adornment-password">Phone</InputLabel>
                <FilledInput 
                    id="phone"
                    shouldUnregister={true}
                    {...register("phone", { 
                        required: true, 
                        minLength: 1,
                        pattern: /^\+\d{10,14}$/
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
    )
}

export default Phone;