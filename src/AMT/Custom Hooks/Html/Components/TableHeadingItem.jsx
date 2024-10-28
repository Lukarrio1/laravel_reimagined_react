import React from "react";

const TableHeadingItem = memo(({ heading }) => {
  return <th>{heading?.text}</th>;
});
export default TableHeadingItem;
