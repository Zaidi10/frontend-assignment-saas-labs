import "./table.css";
import { tableBodyclassNames } from "../../Constants/Table";
import { FormatedTableResponseItem } from "../../Types/Api";

type TableBodyData = {
  rowData: FormatedTableResponseItem[];
  columns: string[];
};

const TableBody = (props: TableBodyData) => {
  const { rowData, columns } = props;
  if (!rowData || !columns) {
    return null;
  }
  return (
    <tbody>
      {rowData.map((row: Record<string, any>, rowIndex) => {
        return (
          <tr key={row.id || rowIndex} aria-rowindex={rowIndex + 1}>
            {columns.map((column, columnIndex) => {
              return (
                <td
                  key={`${column}-${row.id || rowIndex}`}
                  className={tableBodyclassNames[column] || ""}
                  aria-colindex={columnIndex + 1}
                >
                  {row[column]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
