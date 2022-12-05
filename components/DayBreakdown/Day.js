import React, { useContext } from "react";

import { Badge } from "react-bootstrap";

import { AdventOfCodeDataContext } from "../../pages/_app";

import { AiFillStar } from "react-icons/ai";

import { formatDistanceStrict } from "date-fns";

function Day({ index, user }) {
  const { selectedUser, setSelectedUser, timeTook } = useContext(
    AdventOfCodeDataContext
  );
  const isSelected = user.user === selectedUser;

  console.log(user);

  return (
    <div className="m-1">
      <Badge
        className={`p-2 ${isSelected && "rounded-3"}`}
        onClick={() => {
          setSelectedUser(user.user);
        }}
        text="light"
        bg={
          isSelected
            ? "primary"
            : user.task1 && user.task2
            ? "success"
            : "secondary"
        }
      >
        <div className="border-bottom d-flex gap-1 align-content-center pb-1">
          {user.user} {user.task1 && <AiFillStar color="gold" />}{" "}
          {user.task2 && <AiFillStar color="gold" />}
        </div>
        <div className="w-100 text-start mt-2 d-flex flex-column gap-1">
          {user.task1 && (
            <small className="d-flex gap-2 align-items-center">
              <AiFillStar color="gold" /> Solved in{" "}
              {timeTook(index, user.task1.get_star_ts)}
            </small>
          )}
          {user.task2 && (
            <small className="d-flex gap-2 align-items-center">
              <div>
                <AiFillStar color="gold" />
                <AiFillStar color="gold" />
              </div>{" "}
              Solved in {timeTook(index, user.task2.get_star_ts)}
            </small>
          )}
        </div>
        {user.task1 && user.task2 && (
          <div className="border-top d-flex mt-1 align-content-center pt-1">
            <small>
              TBT:{" "}
              {formatDistanceStrict(
                new Date(user.task1.get_star_ts),
                new Date(user.task2.get_star_ts)
              )}
            </small>
          </div>
        )}
      </Badge>
    </div>
  );
}

export default Day;
