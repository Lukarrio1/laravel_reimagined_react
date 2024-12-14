import { useDispatch } from "react-redux";
import { store } from "../../store/store";
import { getMemCurrentPage, setCurrentPage } from "../Stores/coreNodes";

export default function useCurrentPage() {
  const dispatch = useDispatch();
  const Page = getMemCurrentPage(store.getState());
  return {
    page: Page,
    setCurrentPage: (page = {}) => dispatch(setCurrentPage({ ...page })),
  };
}
