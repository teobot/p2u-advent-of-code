import React from "react";

export default function CustomTable({ rows, title, columns }) {
  const columnSum = columns.map((c) => c.colspan).reduce((a, b) => a + b, 0);

  const calculateWidth = (s) => {
    return `${(100 / columnSum) * s}%`;
  };

  return (
    <>
      <h2 style={titleStyle}>{title}</h2>
      <table style={tableStyle.table}>
        <thead style={tableStyle.thead}>
          <tr style={tableStyle.tr}>
            {columns.map((column, i) => (
              <th
                key={i}
                style={{
                  ...tableStyle.th,
                  ...column.style,
                  width: calculateWidth(column.colspan),
                }}
              >
                {column.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={tableStyle.tbody}>
          {rows.map((row, index) => (
            <tr style={tableStyle.tr} key={row.user}>
              {columns.map((column, i) => (
                <td
                  key={i}
                  style={{
                    ...tableStyle.td,
                    ...column.style,
                    width: calculateWidth(column.colspan),
                  }}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const titleStyle = {
  color: "#CCCCCC",
  margin: "0px 0px 25px 0px",
};

const tableStyle = {
  table: {
    width: "100%",
    backgroundColor: "#1E1F30",
    borderRadius: 5,
  },
  thead: {},
  tbody: {},
  tr: {
    textAlign: "center",
  },
  th: {
    color: "#6D6D78",
    padding: "15px 40px",
    fontWeight: 500,
    fontSize: "1.1rem",
  },
  td: {
    color: "#E4E4E6",
    fontWeight: 600,
    padding: "8px 40px",
    textAlign: "center",
  },
};
