import { useEffect, useState } from "react";

import FAKE_currentData from "../data/data.js";

const parseData = (input) => {
  let d = {};
  d.event = input.event;
  d.members = [];
  //foreach key value in object
  for (const [key, value] of Object.entries(input.members)) {
    let completion_day_level = [];
    for (const [k, v] of Object.entries(value.completion_day_level)) {
      let stars = [];
      for (const [kk, vv] of Object.entries(v)) {
        stars.push({
          get_star_ts: new Date(vv.get_star_ts * 1000),
        });
      }
      completion_day_level.push(stars);
    }
    d.members.push({
      user: value.name,
      stars: value.stars,
      local_score: value.local_score,
      last_star_ts: new Date(value.last_star_ts * 1000),
      completion_day_level,
    });
  }

  return d;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [currentData, setCurrentData] = useState(parseData(FAKE_currentData));
  const [prevData, setPrevData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // TODO: fetch data from API
  };

  return { currentData, prevData };
};
