import coreNodesReducer from "./coreNodes";
import settingReducer from "./setting";
import AuthenticationReducer from "./auth";
import ErrorsReducer from "./errors";
import ResponseReducer from "./response";

export default {
  coreNodes: coreNodesReducer,
  setting: settingReducer,
  authentication: AuthenticationReducer,
  errors: ErrorsReducer,
  response: ResponseReducer,
};
