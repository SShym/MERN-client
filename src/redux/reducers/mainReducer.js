import { 
    SET_PAGE,
    ADD_SKILL,
    GET_SKILLS,
    REMOVE_PAGE,
    DELETE_SKILL,
} from '../actions';

const initialState = {
    page: localStorage.getItem('page'),
    skills: null // not an array because there may not be any skills
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE:   
            action.page 
                ? localStorage.setItem('page', action.page)
                : localStorage.removeItem('page');
           
            return { 
                ...state, 
                page: action.page
            };
        case REMOVE_PAGE:   
            localStorage.removeItem('page');
            
            return { 
                ...state, 
                page: null
            };
        case GET_SKILLS: 
            return { 
                ...state, 
                skills: action.skills
            };
        case ADD_SKILL: 
            return { 
                ...state, 
                skills: [...state.skills, action.skill]
            };
        case DELETE_SKILL: 
            return { 
                ...state, 
                skills: [...state.skills].filter((skill) => skill !== action.skill)
            };
        default:
            return state;
    }
}