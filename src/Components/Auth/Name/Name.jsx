import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import AbcIcon from '@mui/icons-material/Abc';

const Password = ({ register, errors }) => {
    return(
        <>
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
        </>
    )
}

export default Password;