import React from "react";

import Day from "./Day";

function DayRow({ item, index }) {
  return (
    <div className="mb-2 py-3 text-light">
      <h4 className="p-0 m-0">Day {index}</h4>
      <div className="w-100 mt-2 d-flex flex-wrap">
        {item.users.map((user) => (
          <Day
            user={user}
            key={index + "--" + user.user + "--row"}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default DayRow;
