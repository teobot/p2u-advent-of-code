import React, { useContext } from "react";

import { Badge } from "react-bootstrap";

import { AdventOfCodeDataContext } from "../../context/useAOC";

import { formatDistanceToNow, addMinutes, formatDistance } from "date-fns";

export default function Header() {
  const { eventData } = useContext(AdventOfCodeDataContext);
  return (
    <div className="w-100 border-bottom pb-3 mb-3 text-light">
      <h1 className="p-0 m-0">Advent of Code {eventData.event} statistics</h1>
      <h5 className="p-0 m-0">
        <Badge variant={eventData.fromCached ? "primary" : "secondary"}>
          {eventData.members.length}
        </Badge>{" "}
        members participated - at{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://adventofcode.com/${eventData.event}`}
        >
          Advent of Code {eventData.event}
        </a>{" "}
        <span style={{ fontSize: "1rem" }}>
          - last updated{" "}
          <span style={{ textDecoration: "underline" }}>
            {formatDistanceToNow(new Date(eventData.lastUpdated))}
          </span>{" "}
          ago, will update again in{" "}
          <span style={{ textDecoration: "underline" }}>
            {formatDistance(
              addMinutes(new Date(eventData.lastUpdated), 15),
              new Date()
            )}
            .
          </span>
        </span>
      </h5>
    </div>
  );
}
