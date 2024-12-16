import useSettings from "./useSettings";
import useCurrentPage from "./useCurrentPage";
import { useLayoutEffect, useMemo } from "react";

export default function useDocumentTitle() {
  const { getSetting } = useSettings();
  const { page } = useCurrentPage();
  const app_name = getSetting("client_app_name") || "";
  const page_name = page?.name;
  const extra_data = page?.extra_data;
  const title = useMemo(
    () =>
      page_name
        ? `${app_name} | ${page_name} ${
            extra_data ? "(" + extra_data + ")" : ""
          }`
        : "",
    [app_name, extra_data, page_name, page, getSetting]
  );

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}
