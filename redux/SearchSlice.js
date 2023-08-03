import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    rank: {
      start: "",
      end: "",
    },
    username: "",
    country: "",
    score: "",
    lang: "",
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchVal: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value += 1;
      console.log(action.payload);
      state.values = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchVal } = searchSlice.actions;

export const getSearchVal = (state) => state.search;

export default searchSlice.reducer;
