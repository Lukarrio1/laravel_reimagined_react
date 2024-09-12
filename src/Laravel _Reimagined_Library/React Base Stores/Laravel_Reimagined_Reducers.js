import coreNodesReducer from "./coreNodes";
import settingReducer from "./setting";
import AuthenticationReducer from "./auth";
import ErrorsReducer from './errors'

export default {
  coreNodes: coreNodesReducer,
  setting: settingReducer,
  authentication: AuthenticationReducer,
  errors: ErrorsReducer,
};
