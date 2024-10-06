import React, { useMemo, useState } from "react";
import TableHeadingItem from "./Components/TableHeadingItem";
import TableBodyItem from "./Components/TableBodyItem";

/**
 *@description This hook gives you the ability to create a table and programmatically control it
 * @returns [setProperties(),Html]
 */
export default function useTable() {
  const [tableState, setTableState] = useState({
    className: "",
    id: "",
    headings: [],
    data: [],
    actions: {},
  });

  const Html = useMemo(
    () => (
      <table {...tableState}>
        <thead>
          <tr>
            {tableState?.headings?.length > 0 &&
              tableState?.headings?.map((heading) => {
                return <TableHeadingItem heading={heading}></TableHeadingItem>;
              })}
          </tr>
        </thead>
        <tbody>
          {tableState?.data &&
            tableState?.data?.map((item) => {
              return (
                <TableBodyItem
                  headings={tableState.headings}
                  item={item}
                  actions={tableState?.actions}
                ></TableBodyItem>
              );
            })}
        </tbody>
      </table>
    ),
    [tableState]
  );
  return {
    setProperties: (
      properties = {
        className: "",
        id: "",
        headings: [
          {
            text: "Foo Bar",
            field_location: "foo_bar",
          },
          {
            text: "Actions",
            field_location: null,
          },
        ],
        data: [{ full_name: "foo bar" }],
        actions: {
          edit: {
            text: "Edit",
            className: "",
            action: (selectedItem) => console.log(selectedItem),
          },
          delete: {
            text: "Delete",
            className: "",
            action: (selectedItem) => console.log(selectedItem),
          },
        },
      }
    ) => {
      setTableState((prev) => {
        return { ...prev, ...properties };
      });
    },
    Html,
  };
}
