import React, { useContext } from "react";

import { AdventOfCodeDataContext } from "../../pages/_app";

import { Badge } from "react-bootstrap";

export default function StarList() {
  const { starLevelColors, selectedUser, eventData, setSelectedUser } = useContext(
    AdventOfCodeDataContext
  );

  return (
    <div className="w-100 h-100 py-2">
      {eventData.members
        .sort((a, b) => b.stars - a.stars)
        .map((m, i) => ({ ...m, rank: i + 1 }))
        .map((row, index) => (
          <div
            key={row.user + "_mostStars"}
            onClick={() => {
              setSelectedUser(row.user);
            }}
            style={{
              ...(selectedUser === row.user && {
                backgroundColor: "#FFFFFF14",
              }),
              cursor: "pointer",
            }}
            className={`d-flex justify-content-between align-items-center py-2 px-3 my-1 ${
              index !== eventData.members.length - 1 ? "border-bottom" : ""
            }`}
          >
            <div>
              <span className="text-muted me-3"> {index + 1}</span>
              <span className="text-light">{row.user}</span>
            </div>
            <Badge pill bg={starLevelColors[index] || "dark"}>
              {row.stars}
            </Badge>
          </div>
        ))}
    </div>
  );
}
