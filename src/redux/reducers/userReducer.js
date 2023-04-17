import { 
    AUTH, 
    LOGOUT, 
    SET_NEW_AVATAR, 
    CHANGE_USER_NAME 
} from '../actions';

const initialState = {
    user: JSON.parse(localStorage.getItem('profile'))?.user,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify(action.data));
            return { 
                ...state, 
                user: action.data.user, 
            };
        
        case LOGOUT: 
            localStorage.removeItem('profile');
            
            return { 
                ...state,
                user: null, 
            };
        case SET_NEW_AVATAR: 
            const updatedUser = {
                ...state.user,
                avatar: action.data.avatar,
                avatarId: action.data.avatarId
            }

            localStorage.setItem('profile', JSON.stringify({
                user: updatedUser,
                token: action.data.token
            }));

            return {
                ...state,
                user: updatedUser
            }
        case CHANGE_USER_NAME:
            const result = {
                ...state.user,
                name: action.data.name,
            }

            localStorage.setItem('profile', JSON.stringify({
                user: result,
                token: action.data.token
            }));
            return {
                ...state,
                user: result
            }
        default:
            return state;
    }
}