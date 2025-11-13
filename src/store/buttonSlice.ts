
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ButtonState {
  label: string;
  loading: boolean;
  disabled: boolean;
}

const initialState: ButtonState = {
  label: "Login",
  loading: false,
  disabled: false,
};

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    setButtonLabel(state, action: PayloadAction<string>) {
      state.label = action.payload;
    },
    setButtonLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setButtonDisabled(state, action: PayloadAction<boolean>) {
      state.disabled = action.payload;
    },
    resetButton(state) {
      state.label = initialState.label;
      state.loading = initialState.loading;
      state.disabled = initialState.disabled;
    },
  },
});

export const {
  setButtonLabel,
  setButtonLoading,
  setButtonDisabled,
  resetButton,
} = buttonSlice.actions;

export default buttonSlice.reducer;
