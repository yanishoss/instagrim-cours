import {types} from '../actions';

export default function (state = {
    query: null,
    results: [
        {
            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            username: "Dumyuser",
            bio: "A shorter version of my bio."
        },
        {
            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            username: "Dumyuser",
            bio: "A shorter version of my bio."
        },
        {
            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            username: "Dumyuser",
            bio: "A shorter version of my bio."
        },
        {
            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            username: "Dumyuser",
            bio: "A shorter version of my bio."
        },
        {
            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            username: "Dumyuser",
            bio: "A shorter version of my bio."
        },
        {
            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            username: "Dumyuser",
            bio: "A shorter version of my bio."
        }
    ]
}, action) {
    switch(action.types) {
        case types.SEARCH_DO_QUERY: 
            return {
                ...state,
                query: action.payload
            };
        case types.SEARCH_SET_RESULTS:
            return {
                ...state,
                results: action.payload
            };
        default: 
            return state;
    }
};