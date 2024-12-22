import "./table.css";
import { tableHeadersClasNames } from "../../Constants/Table";

type TableHeadData = {
  data: string[];
};

const TableHead = (props: TableHeadData) => {
  const { data } = props;
  if (!data) {
    return null;
  }

  return (
    <thead>
      <tr>
        {data.map((headerItem: string) => {
          return (
            <th
              key={headerItem}
              className={tableHeadersClasNames[headerItem] || ""}
              scope="col"
              role="columnheader"
              data-field={headerItem}
            >
              {headerItem}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
