import { createSlice } from "@reduxjs/toolkit";

const coreNodes = createSlice({
  name: "coreNodes",
  initialState: {
    pages: [],
    links: [],
    components: [],
    routes:[]
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
          temp["isAuthenticated"] = page.authentication_level["value"];
          return temp;
        });
      state.links = nodes?.filter((node) => node?.node_type?.value == 2);
      state.components = nodes?.filter((node) => node?.node_type?.value == 4);
      return state;
    },
  },
});

export const { setNodes } = coreNodes.actions;
export default coreNodes.reducer;
