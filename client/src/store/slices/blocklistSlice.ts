import { BlockedSite } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlockListState {
  sites: BlockedSite[];
}
const initialState: BlockListState = {
  sites: [],
};

const blocklistSlice = createSlice({
  name: "blocklist",
  initialState,
  reducers: {
    setSites(state, action: PayloadAction<BlockedSite[]>) {
      state.sites = action.payload;
    },
    addSite(state, action: PayloadAction<BlockedSite>) {
      state.sites.unshift(action.payload);
    },
    removeSite(state, action: PayloadAction<string>) {
      state.sites = state.sites.filter((s) => s.id !== action.payload);
    },
    toggleSite(state, action: PayloadAction<string>) {
      const site = state.sites.find((s) => s.id === action.payload);
      if (site) {
        site.isActive = !site.isActive;
      }
    },
  },
});

export const { addSite, removeSite, setSites, toggleSite } =
  blocklistSlice.actions;
export default blocklistSlice.reducer;
