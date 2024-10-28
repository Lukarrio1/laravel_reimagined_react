import React from "react";

const TableBodyItem = memo(({ headings = [], item = {}, actions = {} }) => {
  return (
    <tr>
      {headings &&
        headings
          ?.filter((heading) => heading?.field_location != null)
          ?.map((head, idx) => {
            return <td key={item?.id + idx}>{item[head?.field_location]}</td>;
          })}
      {actions && (
        <td>
          {Object.keys(actions)?.map((action) => {
            return (
              <div className="col">
                <button
                  className={actions[action]?.className}
                  onClick={() => actions[action]?.action(item)}
                >
                  {actions[action]?.text}
                </button>
              </div>
            );
          })}
        </td>
      )}
    </tr>
  );
});

export default TableBodyItem;
