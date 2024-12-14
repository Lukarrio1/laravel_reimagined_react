import useSettings from "./useSettings";

export default function useAnimation() {
  const { getSetting } = useSettings();
  return getSetting("app_animation");
}
