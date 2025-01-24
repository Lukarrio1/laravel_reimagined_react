import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store/store";
import { getMemCurrentPage, setCurrentPage } from "../Stores/coreNodes";
import useErrors from "./useErrors";

export default function useCurrentPage() {
  const dispatch = useDispatch();
  const Page = useSelector((state) => getMemCurrentPage(state));
  const { clearError } = useErrors();
  return {
    page: Page,
    setCurrentPage: (page = {}) => {
      dispatch(setCurrentPage({ ...page }));
      clearError();
    },
  };
}
