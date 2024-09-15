import { createSlice } from "@reduxjs/toolkit";

const Errors = createSlice({
  name: "errors",
  initialState: {
    errors: [],
  },
  reducers: {
    setErrors: (state, { payload }) => {
      if (payload == null) return state;
      if (payload.response == null) return state;
      const {
        response: { data, status },
      } = payload;
      console.log(payload, data, status, "this is the payload from errors");
      switch (status) {
        case 500:
          state.errors = [
            ...state.errors,
            ...[
              {
                status,
                key: "system_errors",
                messages: [data?.message],
              },
            ],
          ];
          break;
        case 401:
          state.errors = [
            ...state.errors,
            ...[
              {
                status,
                key: "invalid_credentials",
                messages: [data?.message],
              },
            ],
          ];
          break;
        case 422:
          const keys = Object.keys(data?.errors);
          const temp = [];
          if (keys.length == 0) return;
          keys.forEach((key) => {
            temp.push({
              status,
              key,
              messages: [...data?.errors[key]],
            });
          });
          state.errors = [...state.errors, ...temp];
          break;
        default:
          break;
      }
      return state;
    },
    clearErrors: (state, { payload }) => {
      let errs = [];
      if (payload != null) {
        errs = [...state.errors?.filter((e) => e.key != payload)];
      }
      state.errors = errs;
    },
  },
});

export const { setErrors, clearErrors } = Errors.actions;
export default Errors.reducer;
