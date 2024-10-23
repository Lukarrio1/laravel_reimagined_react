import React, { useEffect } from "react";
import AnimationWrapper from "../../../AMT/Wrappers/AnimationWrapper";
import useInput from "../../../AMT/Custom Hooks/Html/useInput";
import useSelect from "../../../AMT/Custom Hooks/Html/useSelect";
import useVerbiage from "../../../AMT/Custom Hooks/useVerbiage";
import { Constants } from "../../../AMT/Abstract/Constants";
import usePostDataLayer from "../../../AMT/Data-layer/usePostDataLayer";
import Loading from "../../Components/Loading";
import useNavigator from "../../../AMT/Custom Hooks/useNavigator";

const {
  uuids: {
    blog: { create_page_uuid, posts_page_uuid },
  },
} = Constants;
export default function Update() {
  const {
    updatePost,
    savingPost,
    getPost,
    gettingPost,
    fetchedData: { fetchedPost },
  } = usePostDataLayer();

  const {
    setProperties: setTitleProps,
    setValue: setTitleValue,
    value: titleValue,
    Html: titleHtml,
    clearError: titleError,
  } = useInput();

  const {
    setProperties: setBodyProps,
    setValue: setBodyValue,
    value: bodyValue,
    Html: bodyHtml,
    clearError: bodyError,
  } = useInput();

  const {
    setProperties: setIsActiveProps,
    Value: isActiveValue,
    Html: isActiveHtml,
    clearError: isActiveError,
    setValue: setIsActiveValue,
  } = useSelect();

  const { getVerbiage } = useVerbiage(create_page_uuid);

  useEffect(() => {
    getPost();
    setIsActiveProps({
      className: "form-select",
      id: "is_active",
      name: "is_active",
      options: [
        { label: "Select a value", value: null },
        { label: "Active", value: true },
        { label: "In Active", value: false },
      ],
      label: {
        enabled: true,
        className: "",
        verbiage: {
          uuid: create_page_uuid,
          key: "is_active",
          properties: {},
        },
      },
    });
    setBodyProps({
      className: "form-control",
      id: "post_body",
      type: "text",
      name: "body",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          uuid: create_page_uuid,
          key: "body",
          properties: {},
        },
      },
    });
    setTitleProps({
      className: "form-control",
      id: "post_title",
      type: "text",
      name: "title",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          uuid: create_page_uuid,
          key: "title",
          properties: {},
        },
      },
    });
    return () => {
      bodyError();
      titleError();
    };
  }, []);

  useEffect(() => {
    if (!fetchedPost) return;
    setBodyValue(fetchedPost?.body);
    setTitleValue(fetchedPost?.title);
    setIsActiveValue(fetchedPost?.is_active ? "true" : "false");
  }, [fetchedPost]);

  const { setNavProperties } = useNavigator(posts_page_uuid);

  const process = async () => {
    const obj = {
      body: bodyValue,
      title: titleValue,
      is_active: isActiveValue == "true" ? 1 : 0,
      id: fetchedPost?.id,
    };
    const data = await updatePost(obj);
    if (!data) return;
    setNavProperties({ params: {} });
  };

  return gettingPost() ? (
    <Loading></Loading>
  ) : (
    <AnimationWrapper>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 text-center">
          <div className="card">
            <div className="card-header">
              <div className="h4 text-center">{getVerbiage("page_title")}</div>
            </div>
            {gettingPost() ? (
              <Loading></Loading>
            ) : (
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    process();
                  }}
                >
                  <div className="row">
                    <div className="mb-3">{titleHtml}</div>
                    <div className="mb-3">{bodyHtml}</div>
                    <div className="mb-3">{isActiveHtml}</div>
                    <div className="mb-3">
                      <button
                        className="btn btn-sm btn-success"
                        type="submit"
                        disabled={savingPost()}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
