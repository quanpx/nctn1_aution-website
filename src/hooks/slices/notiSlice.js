import { createSlice } from "@reduxjs/toolkit";
const notiReducer = createSlice({
    name:'noti',
    initialState:{
        notis:[]
    },
    reducers:{
        setNotis: (state,action) => {
            console.log(action);
            return {...state,notis: action.payload}

        },
    }
})

export const {setNotis} = notiReducer.actions;
export default notiReducer.reducer;