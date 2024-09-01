import { setPreLoadPageData } from "../React Base Stores/app";

const tree = {
  jb15qZsvnOZQtRSmmlyLaM9o4IFsdc96Anmu9suzAiEkZg9ioW: async (restClient) => {
    return await restClient(
      "jb15qZsvnOZQtRSmmlyLaM9o4IFsdc96Anmu9suzAiEkZg9ioW"
    );
  },
};

export const prefetchFunction = async (
  restClient,
  uuid,
  dispatch,
  page_uuid
) => {
  const { data } = await tree[uuid](restClient);
  dispatch(setPreLoadPageData({ page_key: page_uuid, key: uuid, data }));
};
