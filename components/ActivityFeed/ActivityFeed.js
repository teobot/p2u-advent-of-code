import React, { useContext } from "react";

import { formatDistanceToNow } from "date-fns";

import { AdventOfCodeDataContext } from "../../context/useAOC";

import { AiFillStar } from "react-icons/ai";

export default function ActivityFeed() {
  const { getAllMembersStars, selectedUser, setSelectedUser, timeTook } =
    useContext(AdventOfCodeDataContext);

  return (
    <div className="my-3 bg-dark p-3">
      <h4 className="p-0 m-0 text-light mb-3">Activity</h4>
      {
        // take the last 10 events
        getAllMembersStars()
          .slice(0, 25)
          .map((item, index) => {
            return (
              <div
                onClick={() => {
                  setSelectedUser(item.user);
                }}
                key={JSON.stringify(item)}
                className={`${
                  item.user === selectedUser && "bg-primary"
                } text-light mb-3 p-1 border-secondary border-bottom`}
                style={{ cursor: "pointer" }}
              >
                <b>{item.user}</b> completed task <AiFillStar color="gold" />{" "}
                <b>{item.part}</b> for day <b>{item.task}</b> in{" "}
                <b>{timeTook(item.task, item.get_star_ts)}</b>
                {", "}
                <small>
                  {formatDistanceToNow(item.get_star_ts, {
                    addSuffix: true,
                  })}
                </small>
                .
              </div>
            );
          })
      }
    </div>
  );
}
