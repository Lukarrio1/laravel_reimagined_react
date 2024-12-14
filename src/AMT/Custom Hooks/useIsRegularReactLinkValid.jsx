import { Constants } from "../Abstract/Constants";
import { getWithTTL } from "../Abstract/localStorage";

const {
  uuids: {
    auth_uuids: { auth_nodes_endpoint_uuid, guest_nodes_endpoint_uuid },
  },
} = Constants;

export default function useIsRegularReactLinkValid() {
  const auth_nodes = getWithTTL(auth_nodes_endpoint_uuid)?.nodes?.length > 0;
  const guest_nodes = getWithTTL(guest_nodes_endpoint_uuid)?.nodes?.length > 0;
  return guest_nodes || auth_nodes;
}
