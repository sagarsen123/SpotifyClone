

export const loginUser = () => {
    return {
        type : "login"
    }
}


export const logOutUser = () => {
    return {
        type : 'logout'
    }
}


export const updateToken = (token) => {
    return {
        type : 'updateToken',
        payload : token
    }
}