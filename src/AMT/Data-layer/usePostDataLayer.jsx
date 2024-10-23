import useRest from "../Custom Hooks/useRest";
import { Constants } from "../Abstract/Constants";
import useErrors from "../Custom Hooks/useErrors";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/post";

const {
  uuids: {
    blog: {
      create_or_update_post_endpoint_uuid,
      delete_post_endpoint_uuid,
      get_posts_endpoint_uuid,
      get_post_endpoint_uuid,
    },
  },
} = Constants;

export default function usePostDataLayer() {
  const dispatch = useDispatch();
  const Posts = useSelector((state) => state?.post?.posts ?? []);

  const [fetchedPosts, setFetchedPosts] = useState({
    fetchedPosts: [],
    fetchedPost: null,
  });
  const { post } = useParams();
  const { clearError } = useErrors();
  const { getIsLoading, restClient } = useRest();

  const createPost = async (obj) => {
    clearError();
    const response = await restClient(
      create_or_update_post_endpoint_uuid,
      {},
      obj
    );
    if (response == null) return null;
    const { data } = response;
    dispatch(setPosts([data?.post, ...Posts]));
    return data;
  };

  const updatePost = async (obj) => {
    clearError();
    const response = await restClient(
      create_or_update_post_endpoint_uuid,
      {},
      obj
    );
    if (response == null) return null;
    const { data } = response;
    dispatch(
      setPosts([
        ...Posts?.map((item) => {
          if (item?.id != obj.id) {
            return item;
          }
          return data?.post;
        }),
      ])
    );
    return data;
  };

  const deletePost = async (id) => {
    const response = await restClient(delete_post_endpoint_uuid, { post: id });
    dispatch(setPosts(Posts?.filter((post) => post?.id != id)));
    if (response == null) return null;
    return true;
  };

  const getPosts = async () => {
    const response = await restClient(get_posts_endpoint_uuid, {}, {}, false);
    if (response == null) return null;
    const { data } = response;
    dispatch(setPosts(data?.posts));
    setFetchedPosts((prev) => {
      return { ...prev, fetchedPosts: data?.posts };
    });
  };

  const getPost = async () => {
    let fetchedPost = Posts?.find((p) => p?.id == post) ?? null;
    if (!fetchedPost) {
      const response = await restClient(
        get_post_endpoint_uuid,
        { post },
        {},
        false
      );
      if (response == null) return null;
      const { data } = response;
      fetchedPost = data?.post;
    }
    setFetchedPosts((prev) => {
      return { ...prev, fetchedPost };
    });
  };

  return {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost,
    fetchedData: {
      fetchedPosts: Posts,
      fetchedPost: fetchedPosts?.fetchedPost,
    },
    deletingPost: () => getIsLoading(delete_post_endpoint_uuid),
    gettingPosts: () => getIsLoading(get_posts_endpoint_uuid),
    gettingPost: () => getIsLoading(get_post_endpoint_uuid),
    savingPost: () => getIsLoading(create_or_update_post_endpoint_uuid),
  };
}
