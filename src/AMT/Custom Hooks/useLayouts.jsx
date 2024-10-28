import { useSelector } from "react-redux";
import { getMemLayouts } from "../Stores/coreNodes";

/**
 * @description Custom hook to retrieve a layout by its ID.
 * This hook allows components to access a specific layout's properties based on the provided layout ID.
 * @param {integer} layout_id - The unique identifier for the layout to retrieve. Defaults to null if not provided.
 * @returns {object} - An object representing the layout, or an empty object if no layout is found.
 */
export default function useLayouts(layout_id = null) {
  // Retrieve the layouts from the Redux store and find the one matching the provided layout_id
  const layout = useSelector((state) => getMemLayouts(state))?.find(
    (item) => item?.id == layout_id // Use optional chaining to avoid errors if item is undefined
  );

  return { ...layout }; // Return a shallow copy of the layout object (or an empty object if undefined)
}
