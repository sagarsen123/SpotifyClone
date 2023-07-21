
const inititalState = {
    login : false,
}

const loginAndLogout = (state = inititalState ,action ) =>{
    switch(action.type) {
        case 'login' : return state.login=true;
        case 'logout' : return state.login =false;
        default : return state.login;
    }
}

export default loginAndLogout;