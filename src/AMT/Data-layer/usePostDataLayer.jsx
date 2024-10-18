import useRest from "../Custom Hooks/useRest";
import { Constants } from "../Abstract/Constants";
import useErrors from "../Custom Hooks/useErrors";
import { useState } from "react";
import { useParams } from "react-router-dom";

const {
  uuids: {
    blog: {
      create_or_update_post_endpoint,
      delete_post_endpoint,
      get_posts_endpoint,
      get_post_endpoint_uuid,
    },
  },
} = Constants;
export default function usePostDataLayer() {
  const [fetchedPosts, setFetchedPosts] = useState({
    fetchedPosts: [],
    fetchedPost: null,
  });
  const { post } = useParams();
  const { clearError } = useErrors();
  const { getIsLoading, restClient } = useRest();

  const createOrUpdatePost = async (obj) => {
    clearError();
    const response = await restClient(create_or_update_post_endpoint, {}, obj);
    if (response == null) return null;
    const { data } = response;
    return data;
  };

  const deletePost = async (id) => {
    const response = await restClient(delete_post_endpoint, { post: id });
    if (response == null) return null;
    return true;
  };

  const getPosts = async () => {
    const response = await restClient(get_posts_endpoint);
    if (response == null) return null;
    const { data } = response;
    setFetchedPosts((prev) => {
      return { ...prev, fetchedPosts: data?.posts };
    });
  };

  const getPost = async () => {
    const response = await restClient(get_post_endpoint_uuid, { post });
    if (response == null) return null;
    const { data } = response;
    setFetchedPosts((prev) => {
      return { ...prev, fetchedPost: data?.post };
    });
  };

  return {
    createOrUpdatePost,
    getPosts,
    getPost,
    deletePost,
    fetchedData: {
      fetchedPosts: fetchedPosts?.fetchedPosts,
      fetchedPost: fetchedPosts.fetchedPost,
    },
    deletingPost: () => getIsLoading(delete_post_endpoint),
    gettingPosts: () => getIsLoading(get_posts_endpoint),
    gettingPost: () => getIsLoading(get_post_endpoint_uuid),
    savingPost: () => getIsLoading(create_or_update_post_endpoint),
  };
}
