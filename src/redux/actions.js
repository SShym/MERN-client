import axios from 'axios';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const SET_PAGE = 'SET_PAGE';
export const ADD_SKILL = 'ADD_SKILL';
export const GET_SKILLS = 'GET_SKILLS';
export const REMOVE_PAGE = 'REMOVE_PAGE';
export const DELETE_SKILL = 'DELETE_SKILL';
export const SET_NEW_AVATAR = 'SET_NEW_AVATAR';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
export const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON';
export const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF';
export const LOADER_DISPLAY_ON = 'LOADER_DISPLAY_ON';
export const LOADER_DISPLAY_OFF = 'LOADER_DISPLAY_OFF';

const API = axios.create({ 
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://where-kids.cyclic.app'
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export function errorOn(text){
  return dispatch => {
      dispatch({ type: ERROR_DISPLAY_ON, text });
  }
}

export function loaderOn(){
  return{
      type: LOADER_DISPLAY_ON,
  }
}

export function loaderOff(){
  return{
      type: LOADER_DISPLAY_OFF,
  }
}

export const registerNewUser = (data, navigate, toast) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.post('/register', data);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(loaderOff());
  }
};

export const registerNewUserViaPhone = (data, navigate, toast) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.post('/register-via-phone', data);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(loaderOff());
  }
};

export const sendSMS = (phoneNumber, toast, setVerificationCode, setVerifyMode, authMode) => async (dispatch) => {
  try {
    dispatch(loaderOn());

    const response = await API.post('/send-verify-code', { 
      phone: phoneNumber,
      authMode: authMode.mode
    });

    setVerificationCode(response.data.code);
    setVerifyMode(true);

    toast.success('Message sent successfully!');
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(loaderOff());
  }
}

export const loginUser = (data, navigate, toast) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.post('/login', data);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(loaderOff());
  }
};

export const loginUserViaPhone = (phoneNumber, navigate, toast) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.post('/login-via-phone', { phone: phoneNumber});
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(loaderOff());
  }
};

export const addSkill = (skill, userId, toast, setProfileLoading) => async (dispatch) => {
  try {
    setProfileLoading({ userSkill: true });
    await API.post('/add-skill', { skill, userId });

    dispatch({ type: ADD_SKILL, skill });
    toast.success('Successfully added');
  } catch (error) {
    toast.error(error.response.data.error);
  } finally {
    setProfileLoading({ userSkill: false });
  }
};

export const getSkills = (userId) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.get(`/user-skills/${userId}`);
    dispatch({ type: GET_SKILLS, skills: response.data });
    dispatch(loaderOff());
  } catch (error) {
    console.log(error)
  }
};

export const deleteSkill = (skill, toast, setProfileLoading) => async (dispatch) => {
  try {
    setProfileLoading({ userSkill: true });
    await API.patch('/delete-skill', { skill });

    dispatch({ type: DELETE_SKILL, skill });
    toast.success('Successfully deleted');
  } catch (error) {
    toast.error(error.response.data.error);
  } finally {
    setProfileLoading({ userSkill: false });
  }
};

export const googleAuth = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.post('/google-auth', formData);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    console.log(error)
  } finally {
    dispatch(loaderOff());
  }
};

export const setUserAvatar = (formData, setProfileLoading, toast) => async (dispatch) => {
  try {
    setProfileLoading({ userAvatar: true });
    const response = await API.post('/set-user-avatar', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });

    dispatch({ type: SET_NEW_AVATAR, data: {
      avatar: response.data.user.avatar,
      token: response.data.token
    }});
    toast.success('Avatar successfully updated')
  } catch (error) {
    toast.error(error.response.data.error)
  } finally {
    setProfileLoading({ userAvatar: false });
  }
};

export const changeUserName = (userName, userId, toast, setProfileLoading) => async (dispatch) => {
  try {
    setProfileLoading({ userName: true });
    const response = await API.put('/change-user-name', { userName, userId });
    
    dispatch({ type: CHANGE_USER_NAME, data: {
      name: response.data.user.name,
      token: response.data.token
    }});

  } catch (error) {
    toast.error(error.response.data.error)
  } finally {
    setProfileLoading({ userName: false });
  }
}