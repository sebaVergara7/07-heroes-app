// const state = {
//     name: 'Sebastián',
//     logged: true,
// }

// const loginAction = {
//     type: types.login,
//     payload: {
//         name: 'Sebastián',
//         email: 'sebastián@gmail.com',
//     },
// };

import { types } from "../types/types";

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                ...action.payload,
                logged: true,
            }

        case types.logout:
            return {
                logged: false,
            }
    
        default:
            return state;
    };

};