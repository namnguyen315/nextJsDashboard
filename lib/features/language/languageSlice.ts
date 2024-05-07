import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILanguage {
    lang: string,
    isLoading: boolean,
    error: string| null
}

const initialState: ILanguage = {
    lang: "English",
    isLoading: false,
    error: null
};

const LanguageSlice = createSlice({
    name: "language",
    initialState,
    reducers: (create)=> ({
        setLang: create.reducer((state) => {
            state.isLoading = true
        }),
        setLangSuccess: create.reducer((state, action: PayloadAction<string>) => {
            console.log("setlang success")
            state.isLoading = false
            state.lang = action.payload
            console.log(state.lang)
        }),
        setLangFailed: create.reducer((state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        })
    })
})

export const {setLang,setLangSuccess,setLangFailed} = LanguageSlice.actions;

export default LanguageSlice.reducer;