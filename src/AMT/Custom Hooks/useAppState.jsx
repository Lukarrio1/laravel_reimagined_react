import { useMainState } from "../Provider/StateProvider";
export default function useAppState() {
  const appState = useMainState();
  const set = (
    params = {
      key: "",
      value: null,
    }
  ) => {
    appState.dispatch({ type: "SET", ...params });
  };
  return { state: appState?.state ?? null, set };
}
