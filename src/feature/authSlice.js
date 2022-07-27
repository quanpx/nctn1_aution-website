import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auction',
    initialState: {
        user:"",
        isAuth:false,
        token:"",
    },
    reducers:
    {
        setAuth: (state,action)=>{
            return {...state,
                "user":action.payload.user,
                "isAuth":action.payload.isAuth,
                "token":action.payload.token,
            };
        },
        resetAuth:(state,action)=>
        {
            return  {...state,
                "user":"",
                "isAuth":false,
                "token":"",
            };
        }
    }
})
export const {setAuth,resetAuth} = authSlice.actions
export default authSlice.reducer