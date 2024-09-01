import coreNodesReducer from "./coreNodes";
import settingReducer from "./setting";
import AuthenticationReducer from "./auth";
import Application from "./app";

export default {
  coreNodes: coreNodesReducer,
  setting: settingReducer,
  authentication: AuthenticationReducer,
  app: Application,
};
