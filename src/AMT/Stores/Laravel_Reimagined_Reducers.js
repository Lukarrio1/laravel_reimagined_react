import coreNodesReducer from "./coreNodes";
import settingReducer from "./setting";
import AuthenticationReducer from "./auth";
import ErrorsReducer from "./errors";
import ResponseReducer from "./response";
import LoadingReducer from "./loading";
import MessageReducer from "./message";

export default {
  coreNodes: coreNodesReducer,
  setting: settingReducer,
  authentication: AuthenticationReducer,
  errors: ErrorsReducer,
  response: ResponseReducer,
  loading: LoadingReducer,
  message: MessageReducer,
};
