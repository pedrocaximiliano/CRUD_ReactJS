import { createStore } from 'redux';

const INITIAL_STATE = {
    description: [
        'curso simples',
    ],
}

function courses(state = INITIAL_STATE, action ) {
    switch (action.type) {
        case 'ADD_COURSE':
            return { ...state, description: [...state.description, action.name] };
        default:
            return state;
    }
}
    

const store = createStore(courses);

export default store;