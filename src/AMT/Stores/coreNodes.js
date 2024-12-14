import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const coreNodes = createSlice({
  name: "coreNodes",
  initialState: {
    pages: [],
    links: [],
    components: [],
    routes: [],
    layouts: [],
    currentPage: { name: "", extra_data: "" },
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
          temp["uuid"] = page.uuid;
          temp["component"] = page.properties.value.actual_component;
          temp["path"] = currentLink
            ? currentLink?.properties?.value?.node_route
            : "";
          temp["hasAccess"] = page.hasAccess;
          temp["verbiage"] = page.verbiage.human_value;
          temp["layout_id"] = page.properties.value.layout_id;
          temp["isAuthenticated"] = page.authentication_level["value"];
          return temp;
        });
      state.links = nodes
        ?.filter((node) => node?.node_type?.value == 2)
        ?.map((item) => {
          return { ...item, verbiage: item?.verbiage.human_value };
        });
      state.components = nodes
        ?.filter((node) => node?.node_type?.value == 4)
        ?.map((item) => {
          return { ...item, verbiage: item?.verbiage.human_value };
        });
      state.layouts = nodes
        ?.filter((node) => node?.node_type?.value == 5)
        ?.map((item) => {
          return { ...item, verbiage: item?.verbiage.human_value };
        });
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
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
      return state;
    },
  },
});

export const { setNodes, setCurrentPage } = coreNodes.actions;
export default coreNodes.reducer;

export const getLinksPagesLayoutsAndComponents = createSelector(
  [
    (state) => state?.coreNodes?.pages,
    (state) => state?.coreNodes?.links,
    (state) => state?.coreNodes?.layouts,
    (state) => state?.coreNodes?.components,
  ],
  (pages, links, layouts, components) => [
    ...pages,
    ...components,
    ...layouts,
    ...links,
  ]
);

export const getMemLinksAndComponents = createSelector(
  [(state) => state?.coreNodes?.links, (state) => state?.coreNodes?.components],
  (links, components) => [...components, ...links]
);

export const getMemRoutes = createSelector(
  [(state) => state?.coreNodes?.routes],
  (routes) => [...routes]
);

export const getMemPages = createSelector(
  [(state) => state?.coreNodes?.pages ?? []],
  (pages) => [...pages]
);

export const getMemCurrentPage = createSelector(
  [(state) => state?.coreNodes?.currentPage],
  (page) => {
    return { ...page };
  }
);

export const getMemLayouts = createSelector(
  [(state) => state?.coreNodes?.layouts],
  (layouts) => [...layouts]
);
