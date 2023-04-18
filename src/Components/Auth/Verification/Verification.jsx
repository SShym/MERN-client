import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';

const Verification = ({ register, errors }) => {
    return(
        <>
            <FormControl sx={{ mt: 1.5 }} fullWidth variant="filled">
                <InputLabel sx={{fontSize:'15px'}} shrink htmlFor="filled-adornment-password">Verification Code</InputLabel>
                <FilledInput
                    id="verificationCode"
                    shouldUnregister={true}
                    {...register("verificationCode", { required: true, minLength: 6, maxLenght: 6 })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                            >
                                <SmsIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {errors?.verificationCode &&
                <div className='auth-block__input-error'>
                    {errors?.verificationCode?.type === 'required' && <div>Code is required</div>}
                    {errors?.verificationCode?.type === 'minLength' && <div>Code must be 6 characters</div>}
                </div>
            }
        </>
    )
}

export default Verification;