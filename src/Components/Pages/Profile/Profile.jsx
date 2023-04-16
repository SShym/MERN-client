import './Profile.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, getSkills, deleteSkill, setUserAvatar, changeUserName } from '../../../redux/actions';
import { IconButton, TextField, Typography, Box } from '@mui/material';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import CameraAlt from '@mui/icons-material/CameraAlt';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

const Profile = () => {
    const [profileLoading, setProfileLoading] = useState({
        userName: false,
        userSkill: false,
        userAvatar : false,
    });
    
    const [userName, setUserName] = useState('');
    const [skill, setSkill] = useState('');

    const dispatch = useDispatch();
    const skills = useSelector(state => state.mainReducer.skills);
    const user = useSelector(state => state.userReducer.user);
    const loading = useSelector(state => state.appReducer.loading);

    useEffect(() => {
        dispatch(getSkills(user.id));
    }, []) // eslint-disable-line

    const profileDisabled = Object.values(profileLoading).some((value) => value === true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const formData = {
            photo: file,
            id: user.id
        }

        dispatch(setUserAvatar(formData, setProfileLoading));
    };

    const handleAddNewSkill = (e) => {
        e.preventDefault();

        if(skill.trim().length > 0){
            dispatch(addSkill(skill, user.id, toast, setProfileLoading));
            setSkill('');
        }
    }

    const handleDeleteSkill = (skill) => {
        dispatch(deleteSkill(skill, toast, setProfileLoading));
    }

    const handleChangeName = (e) => {
        e.preventDefault();
        if(userName.trim().length > 0){
            dispatch(changeUserName(userName, user.id, toast, setProfileLoading));
            setUserName('');
        }
    }

    return(
        <div className='profile__wrap'>
            {loading 
                ? <Box>
                    <CircularProgress color="primary" />
                </Box>
                : <>
                    {user && skills &&
                        <>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={loading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <div className='profile__block'>
                                <div className='profile__block-left'>
                                    <IconButton sx={{ display:'flex', flexDirection:'column', position:'relative' }} component="label" htmlFor="photo">
                                        <Avatar 
                                            src={user?.avatar} 
                                            sx={{ 
                                                border:'1px solid rgb(0,0,0, 0.15)', 
                                                fontSize:'25px', 
                                                width: 130, 
                                                height: 130 
                                            }}>
                                                {user?.name[0]}
                                        </Avatar>
                                        <Input disabled={profileDisabled} type="file" name="photo" id="photo" onChange={handleFileChange} sx={{ display: 'none' }} disableUnderline />
                                        <Box className="profile__change-image-svg-wrap">
                                            <Box className="profile__change-image-svg">
                                                {profileLoading.userAvatar 
                                                    ? <Box sx={{ color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                                        <CircularProgress color="inherit" size={16} />
                                                    </Box>
                                                    : <CameraAlt sx={{ fill: 'white', width:18, height:18 }} />
                                                }
                                            </Box>
                                        </Box>
                                    </IconButton>
                                    <Typography sx={{ textAlign:'center', fontFamily:'Roboto Mono', letterSpacing:'-0.8px', fontSize:'18px' }}>
                                        {user?.name}
                                    </Typography>
                                    <form style={{ width:'100%' }} onSubmit={(e) => handleChangeName(e)}>
                                        <Box sx={{ display: 'flex', mt:2, flexDirection: 'column', height: '100%' }}>
                                            <TextField
                                                disabled={profileDisabled}
                                                value={userName}
                                                inputProps={{ maxLength: 25 }}
                                                onChange={(e) => setUserName(e.target.value)}
                                                label="Change name"
                                            />
                                            <button
                                                disabled={profileDisabled}
                                                type="submit"
                                                className='profile__save-name-btn'
                                            >
                                                {profileLoading.userName
                                                    ? <CircularProgress size={11} color="inherit" sx={{margin:'4px'}} />
                                                    : 'Save'
                                                }
                                            </button>
                                        </Box>
                                    </form>
                                </div>
                                <div className='profile__block-right'>
                                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <Box sx={{ my: 3, mx: 2 }}>
                                        <Grid container alignItems="center">
                                        <Grid item xs>
                                            <Typography gutterBottom variant="h4" component="div">
                                                {user?.email}
                                            </Typography>
                                        </Grid>
                                        </Grid>
                                        <Typography color="text.secondary" variant="body2">
                                            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                                            just down the hall.
                                        </Typography>
                                    </Box>
                                    <Divider variant="middle" />
                                    <form onSubmit={(e) => handleAddNewSkill(e)} style={{ margin:'15px', display:'flex', alignItems:'center'}}>
                                        <TextField
                                            disabled={profileDisabled}
                                            value={skill}
                                            inputProps={{ maxLength: 20 }}
                                            onChange={(e) => setSkill(e.target.value)}
                                            sx={{ mr:0.5, width:'100%' }}
                                            id="demo-helper-text-misaligned"
                                            label="Add your skill"
                                        />
                                        <button type="submit" style={{ display:'flex', alignItems:'center' }}>
                                            <AddCircleIcon color="primary" sx={{ width:40, height:40, cursor:'pointer' }} />
                                        </button>
                                    </form>
                                        {skills?.length > 0 &&
                                            <Box sx={{ m: 2 }}>
                                                <Typography sx={{ mb:1, fontFamily:'Montserrat', fontWeight:'600', fontSize:'13px' }}>
                                                    Skills:
                                                </Typography>
                                                <Stack direction="row" sx={{ display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                                                    {skills?.map(skill => 
                                                        <Box sx={{backgroundColor:'rgb(155,155,155,0.5)', margin:'2px', padding:'8px 12px', borderRadius:'20px', display:'flex', alignItems:'center'}}>
                                                            <Typography sx={{ userSelect:'none' }}>{skill}</Typography>
                                                            <CloseIcon onClick={() => !profileDisabled && handleDeleteSkill(skill)} sx={{ width:16, height:16, fill:'gray', ml: 0.6, cursor:'pointer' }} />
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </Box>
                                        }
                                    </Box>
                                    {profileLoading.userSkill &&
                                        <Box>
                                            <LinearProgress sx={{ borderRadius:'15px' }} />
                                        </Box>
                                    }
                                </div>
                            </div>
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                                toastOptions={{
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: 'bold'
                                    },
                                }}
                            />
                        </>
                    }
                </>
            }
        </div>
    )
}

export default Profile;