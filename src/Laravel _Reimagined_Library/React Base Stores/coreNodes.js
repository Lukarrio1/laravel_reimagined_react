import { createSlice } from "@reduxjs/toolkit";

const coreNodes = createSlice({
  name: "coreNodes",
  initialState: {
    pages: [],
    links: [],
    components: [],
    routes: [],
    layouts: [],
  },
  reducers: {
    setNodes: (state, { payload }) => {
      const { nodes } = payload;
      state.pages = nodes
        ?.filter((node) => node?.node_type?.value == 3)
        ?.map((page) => {
          const temp = {};
          const currentLink = nodes?.filter(
            (n) => n?.properties?.value?.node_page == page.id
          )[0];

          temp["name"] = page.name;
          temp["component"] = page.properties.value.actual_component;
          temp["path"] = currentLink
            ? currentLink?.properties?.value?.node_route
            : "";
          temp["hasAccess"] = page.hasAccess;
          temp["layout_id"] = page.properties.value.layout_id;
          temp["isAuthenticated"] = page.authentication_level["value"];
          return temp;
        });
      state.links = nodes?.filter((node) => node?.node_type?.value == 2);
      state.components = nodes?.filter((node) => node?.node_type?.value == 4);
      state.layouts = nodes?.filter((node) => node?.node_type?.value == 5);
      state.routes = nodes
        ?.filter((node) => node?.node_type?.value == 1)
        .map(function (node) {
          node.properties.html_value = null;
          node.properties.value.route_function = null;
          node.properties.value.node_audit_message = null;
          return node;
        });
      return state;
    },
  },
});

export const { setNodes } = coreNodes.actions;
export default coreNodes.reducer;
