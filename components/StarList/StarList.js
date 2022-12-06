import React, { useContext } from "react";

import { AdventOfCodeDataContext } from "../../pages/_app";

import { Badge } from "react-bootstrap";

import { AiFillStar } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";

export default function StarList() {
  const { starLevelColors, selectedUser, eventData, setSelectedUser } =
    useContext(AdventOfCodeDataContext);

  return (
    <div className="w-100 h-100 py-2">
      {eventData.members
        .sort((a, b) => b.stars - a.stars)
        .map((m, i) => ({ ...m, rank: i + 1 }))
        .map((member, index) => (
          <div
            key={member.user + "_mostStars"}
            onClick={() => {
              setSelectedUser(member.user);
            }}
            style={{
              ...(selectedUser === member.user && {
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
              <span className="text-light fw-bold">{member.user}</span>
            </div>
            <div className="d-flex gap-2">
              <Badge
                className={`d-flex justify-content-center gap-1 ${
                  !starLevelColors[index]
                    ? "border border-1 border-secondary"
                    : ""
                }`}
                pill
                bg={starLevelColors[index] || "dark"}
              >
                {member.stars}
                <AiFillStar color="gold" />
              </Badge>
              <Badge
                className="d-flex justify-content-center gap-1 border border-1 border-secondary"
                pill
                bg={"dark"}
              >
                {member.local_score}
                <BiMedal />
              </Badge>
            </div>
          </div>
        ))}
    </div>
  );
}
