import useSettings from "./useSettings";
import useCurrentPage from "./useCurrentPage";
import { useEffect } from "react";

export default function useDocumentTitle() {
  const { getSetting } = useSettings();
  const { page } = useCurrentPage();

  useEffect(() => {
    const app_name = getSetting("client_app_name") || "";
    const page_name = page?.name;
    const extra_data = page?.extra_data;
    const title = page_name
      ? `${app_name} | ${page_name} ${extra_data ? "(" + extra_data + ")" : ""}`
      : "";
    document.title = title;
  }, [page, getSetting]);
}
