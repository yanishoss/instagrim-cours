export default function auth(state = {
    isAuthenticated: false,
    token: null,
    exp: null
}, action) {
    switch(action.type) {
        default: 
            return state;
    }
}