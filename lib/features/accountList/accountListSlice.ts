import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAccountUser {
    avatar: string,
    username: string,
    email: string
}

interface IAccountList {
    accountUsers: IAccountUser[],
}

const initialState: IAccountList = {
    accountUsers: []
};

const accountListSlice = createSlice({
    name: "accountList",
    initialState,
    reducers: (create)=> ({
        addAccount: create.reducer((state, action: PayloadAction<IAccountUser>) => {
            const isExist = state.accountUsers.some(user => 
                user.username === action.payload.username && 
                user.email === action.payload.email
            );

            if (!isExist) {
                state.accountUsers.push(action.payload);
            }
        }),
        deleteAccount: create.reducer((state, action: PayloadAction<IAccountUser>) => {
            state.accountUsers = state.accountUsers.filter(account=>account.username !== action.payload.username && account.email !== action.payload.email)
        })
    })
})

export const {addAccount,deleteAccount} = accountListSlice.actions;

export default accountListSlice.reducer;