import { 
    ADD_SKILL,
    GET_SKILLS,
    DELETE_SKILL,
} from '../actions';

const initialState = {
    skills: null // not an array because there may not be any skills
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
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