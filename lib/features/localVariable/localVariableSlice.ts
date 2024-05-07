import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILanguage {
    urlRedirect: string | null
}

const initialState: ILanguage = {
    urlRedirect: null
};

const localVariable = createSlice({
    name: "localVariable",
    initialState,
    reducers: (create)=> ({
        setUrlRedirect: create.reducer((state, action: PayloadAction<string | null>) => {
            state.urlRedirect = action.payload
        }),
    })
})

export const {setUrlRedirect} = localVariable.actions;

export default localVariable.reducer;