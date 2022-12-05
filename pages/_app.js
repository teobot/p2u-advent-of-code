import { useState, useEffect, useContext, createContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {
  addHours,
  compareAsc,
  compareDesc,
  formatDistance,
  startOfDay,
} from "date-fns";

export const AdventOfCodeDataContext = createContext();

function MyApp({ Component, pageProps }) {
  const [eventData, setEventData] = useState(null);
  const [years, setYears] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const fetchYear = async (year) => {
    try {
      const req = await fetch("/api/" + year);
      const res = await req.json();
      setEventData(parseData(res));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYears = async () => {
    try {
      const req = await fetch("/api/years");

      if (req.status === 200) {
        const res = await req.json();
        setYears(res.files);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const parseData = (input) => {
    let d = {};
    d.event = input.event;
    d.fromCached = input.fromCached;
    d.lastUpdated = input.lastUpdated;
    d.members = [];
    //foreach key value in object
    for (const [memberKey, member] of Object.entries(input.members)) {
      let completion_day_level = [];
      for (const [taskNumber, taskData] of Object.entries(
        member.completion_day_level
      )) {
        let stars = [];
        for (const [kk, vv] of Object.entries(taskData)) {
          stars.push({
            task: taskNumber,
            part: kk,
            get_star_ts: new Date(vv.get_star_ts * 1000),
          });
        }
        completion_day_level.push(stars);
      }
      d.members.push({
        user: smartenText(member.name),
        stars: member.stars,
        local_score: member.local_score,
        last_star_ts: new Date(member.last_star_ts * 1000),
        completion_day_level,
      });
    }
    return d;
  };

  const smartenText = (name) => {
    let newName = name;
    newName = newName.split("@")[0];

    // remove numbers
    newName = newName.replace(/[0-9]/g, " ");

    // remove dashes
    newName = newName.replace(/-/g, " ");

    return newName;
  };

  const totalStars = () => {
    if (!eventData) return 0;

    return eventData.members.reduce((a, b) => a + b.stars, 0);
  };

  const highestStarUser = () => {
    if (!eventData) return 0;

    return eventData.members.sort((a, b) => b.stars - a.stars)[0];
  };

  const completionTimeline = () => {
    if (!eventData) return {};
    let completion_day_levels = {};
    eventData.members.forEach(
      ({ user, stars, local_score, last_star_ts, completion_day_level }) => {
        completion_day_level.forEach((completion_day_level_array) => {
          let task1 = completion_day_level_array[0] || null;
          let task2 = completion_day_level_array[1] || null;
          if (completion_day_levels[task1.task]) {
            completion_day_levels[task1.task || task2.task].users.push({
              user,
              task1,
              task2,
            });
          } else {
            completion_day_levels[task1.task || task2.task] = {
              day: task1.task || task2.task,
              users: [
                {
                  user,
                  task1,
                  task2,
                },
              ],
            };
          }
        });
      }
    );
    return completion_day_levels;
  };

  const timeTook = (day, date) => {
    // using the month and year of the date but using the day of the day, make a new date
    let releaseDate = addHours(
      startOfDay(new Date(date.getFullYear(), date.getMonth(), day)),
      9
    );

    // using date fns get the date and time of the morning off the given date at 9am
    return formatDistance(releaseDate, date, {
      addSuffix: false,
    });
  };

  const getAllMembersStars = () => {
    if (!eventData) return [];
    let allMembersStars = [];
    eventData.members.forEach((member) => {
      member.completion_day_level.forEach((day) => {
        day.forEach((task) => {
          allMembersStars.push({
            user: member.user,
            task: task.task,
            part: task.part,
            get_star_ts: task.get_star_ts,
          });
        });
      });
    });
    return allMembersStars.sort((a, b) => {
      return compareAsc(b.get_star_ts, a.get_star_ts);
    });
  };

  const pieChartData = () => {
    let array = [...eventData.members].map((member) => [
      member.user,
      member.stars,
    ]);
    return [["Task", "Hours per Day"]].concat(array);
  };

  const displaySlices = () => {
    const chartData = pieChartData();
    let userSelected = chartData.find((member) => member[0] === selectedUser);
    let userSelectedIndex = chartData.indexOf(userSelected);
    if (userSelectedIndex === -1) return {};
    let obj = {};
    obj[userSelectedIndex - 1] = { offset: 0.2 };
    return obj;
  };

  const starLevelColors = ["success", "primary", "danger", "secondary"];

  return (
    <AdventOfCodeDataContext.Provider
      value={{
        years,
        eventData,
        fetchYear,
        fetchYears,
        totalStars: totalStars(),
        highestStarUser: highestStarUser(),
        completionTimeline,
        timeTook,
        getAllMembersStars,
        selectedUser,
        setSelectedUser,
        pieChartData,
        displaySlices,
        starLevelColors,
      }}
    >
      <Container className="my-2">
        <Component {...pageProps} />
      </Container>
    </AdventOfCodeDataContext.Provider>
  );
}

export default MyApp;
