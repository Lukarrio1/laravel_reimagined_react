import { useSelector } from "react-redux";
/**
 *@description This hook returns a layout given the layout_id
 * @param {integer} layout_id
 * @returns object
 */
export default function useLayouts(layout_id = null) {
  const { layout } = useSelector((state) => {
    return {
      layout: state?.coreNodes.layouts?.find((item) => item?.id == layout_id),
    };
  });
  return layout;
}
