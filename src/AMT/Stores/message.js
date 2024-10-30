import { createSlice } from "@reduxjs/toolkit";

const Message = createSlice({
  name: "message",
  initialState: {
    message: "",
    className: "",
  },
  reducers: {
    setMessage: (state, { payload }) => {
      state.message = payload;
      return state;
    },
  },
});

export const { setMessage } = Message.actions;
export default Message.reducer;
