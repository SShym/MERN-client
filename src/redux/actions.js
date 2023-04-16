import axios from 'axios';
export const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON';
export const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF';
export const LOADER_DISPLAY_ON = 'LOADER_DISPLAY_ON';
export const LOADER_DISPLAY_OFF = 'LOADER_DISPLAY_OFF';
export const SET_PAGE = 'SET_PAGE';
export const GET_SKILLS = 'GET_SKILLS';
export const ADD_SKILL = 'ADD_SKILL';
export const SET_NEW_AVATAR = 'SET_NEW_AVATAR';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
export const DELETE_SKILL = 'DELETE_SKILL';
export const REMOVE_PAGE = 'REMOVE_PAGE';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';

const API = axios.create({ 
  baseURL: 'http://localhost:5000'
  // baseURL: 'https://tw-server.cyclic.app'
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

export const auth = (formData) => (dispatch) => {
    try {
      dispatch({ type: AUTH, data: formData });
    } catch (error) {
      dispatch(errorOn(error.response.status));
    }
};

export const registerNewUser = (data, navigate, toast) => async (dispatch) => {
  try {
    const response = await API.post('/register', data);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    toast.error(error.response.data.message)
  }
};

export const loginUser = (data, navigate, toast) => async (dispatch) => {
  try {
    const response = await API.post('/login', data);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    toast.error(error.response.data.message)
  }
};

export const addSkill = (skill, userId, toast) => async (dispatch) => {
  try {
    await API.post('/add-skill', { skill, userId });
    dispatch({ type: ADD_SKILL, skill });
    toast.success('Successfully added');
  } catch (error) {
    toast.error(error.response.data.error)
  }
};

export const getSkills = (userId) => async (dispatch) => {
  try {
    const response = await API.get(`/user-skills/${userId}`);
    dispatch({ type: GET_SKILLS, skills: response.data });
  } catch (error) {
    console.log(error)
  }
};

export const deleteSkill = (skill, toast) => async (dispatch) => {
  try {
    await API.patch('/delete-skill', { skill });
    dispatch({ type: DELETE_SKILL, skill });
    toast.success('Successfully deleted');
  } catch (error) {
    toast.error(error.response.data.error)
  }
};

export const googleAuth = (formData, navigate) => async (dispatch) => {
  try {
    const response = await API.post('/google-auth', formData);
    dispatch({ type: AUTH, data: response.data });
    navigate('/');
  } catch (error) {
    console.log(error)
  }
};

export const setUserAvatar = (formData) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.post('/set-user-avatar', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });

    dispatch({ type: SET_NEW_AVATAR, data: {
      avatar: response.data.user.avatar,
      avatarId: response.data.user.avatarId,
      token: response.data.token
    }});
    
    dispatch(loaderOff());
  } catch (error) {
    console.log(error)
  }
};

export const changeUserName = (userName, userId, toast) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await API.put('/change-user-name', { userName, userId });
    
    dispatch({ type: CHANGE_USER_NAME, data: {
      name: response.data.user.name,
      token: response.data.token
    }});

    dispatch(loaderOff());
  } catch (error) {
    toast.error(error.response.data.error)
  }
}