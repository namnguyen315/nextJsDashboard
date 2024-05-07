import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOauthProfile {
            provider?: string,
            profileId?: string,
            _id?: string
}

interface IUserLogin {
    username?: string,
    email?: string,
    avartar?: string,
    avatarUrl?: string,
    gender?:string,
    phoneNumber?:string,
    oauthprofiles?: IOauthProfile[]
}

interface IAccountInfo {
    userInfor: IUserLogin | null,
    isLoading: boolean
    isError: string | null
}


const initialState: IAccountInfo = {
    userInfor: null,
    isLoading: false,
    isError: null
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: (create)=> ({

        userLogin: create.reducer((state) => {
            state.isLoading = true
        }),

        userLoginSuccess:create.reducer((state, action:PayloadAction<IUserLogin>) => {
            state.isLoading = false,
            state.userInfor = action.payload
        }),

        userLoginFailed: create.reducer((state, action: PayloadAction<string>) => {
            state.isLoading = false,
            state.isError = action.payload
        }),

        userClearError: create.reducer((state) => {
            state.isError = null
        }),

        userLogout: create.reducer((state) => {
            state.userInfor = null;
        }),
        userUpdate:create.reducer((state, action: PayloadAction<Partial<IUserLogin>>) => {
            state.userInfor = {...state.userInfor, ...action.payload}
        })
    })
})

export const {userLogin,userLoginSuccess,userLoginFailed,userClearError,userLogout,userUpdate} = UserSlice.actions;

export default UserSlice.reducer;