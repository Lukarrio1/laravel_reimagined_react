import coreNodesReducer from "./coreNodes";
import settingReducer from "./setting";
import AuthenticationReducer from "./auth";

export default {
  coreNodes: coreNodesReducer,
  setting: settingReducer,
  authentication: AuthenticationReducer,
};
