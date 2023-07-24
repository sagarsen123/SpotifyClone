
const inititalState = {
    login : false,
    userToken : null,
}

const loginAndLogout = (state = inititalState ,action ) =>{
    switch(action.type) {
        case 'login' : return state.login=true;
        case 'logout' : return state.login =false;
        case 'updateToken' : return {
            ...state,
            userToken : action.payload
        };
        default : return state;
    }
}

export default loginAndLogout;