/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const StateContext = createContext();

const initialState = {};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useMainState = () => useContext(StateContext);
