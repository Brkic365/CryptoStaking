import { createSlice } from "@reduxjs/toolkit";
import inactiveHosts from "../public/data/inactiveHosts.json";

const initialState = {
  sort: "APY",
  farmHosts: [],
  tokens: [],
  stables: false,
  singleSided: false,
  showInactive: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeSortType: (state, action) => {
      state.sort = action.payload;
    },
    addHost: (state, action) => {
      state.farmHosts.push(action.payload);
    },
    removeHost: (state, action) => {
      state.farmHosts = state.farmHosts.filter(
        (item) => item !== action.payload
      );
    },
    addToken: (state, action) => {
      state.tokens.push(action.payload);
    },
    removeToken: (state, action) => {
      state.tokens = state.tokens.filter((item) => item !== action.payload);
    },
    stableFilter: (state, action) => {
      state.stables = action.payload;
    },
    singleSidedFilter: (state, action) => {
      state.singleSided = action.payload;
    },
    showInactiveFilter: (state, action) => {
      state.showInactive = action.payload;

      if (!action.payload) {
        state.farmHosts = state.farmHosts.filter(
          (item) => !inactiveHosts.includes(item)
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeSortType,
  addHost,
  removeHost,
  addToken,
  removeToken,
  stableFilter,
  singleSidedFilter,
  showInactiveFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
