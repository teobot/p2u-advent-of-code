import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdventOfCodeDataContext } from "../../pages/_app";

import Loader from "../../components/Loader";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import Badge from "react-bootstrap/Badge";

import { AiFillStar } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

export default function Year() {
  const [selectedUser, setSelectedUser] = useState("");
  const {
    eventData,
    fetchYear,
    totalStars,
    highestStarUser,
    completionTimeline,
    timeTook,
    getAllMembersStars,
  } = useContext(AdventOfCodeDataContext);

  const router = useRouter();
  const starLevelColors = ["success", "warning", "danger", "secondary"];

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

  useEffect(() => {
    if (router.query.year) {
      fetchYear(router.query.year);
    }
  }, [router.query.year]);

  useEffect(() => {
    if (eventData) {
      completionTimeline();
    }
  }, [eventData]);

  if (eventData) {
    const { event, members } = eventData;
    return (
      <>
        <div className="w-100 border-bottom pb-3 mb-3 text-light">
          <h1 className="p-0 m-0">Advent of Code {event} statistics</h1>
          <h5 className="p-0 m-0">
            <Badge variant="secondary">{eventData.members.length}</Badge>{" "}
            members participated - at{" "}
            <a rel="noreferrer" target="_blank" href="https://adventofcode.com/">Advent of Code</a>
          </h5>
        </div>

        <ButtonGroup className="w-100 my-3">
          {members.map(({ user, stars }) => (
            <Button
              active={user === selectedUser}
              onClick={() => setSelectedUser(user)}
              className="border"
              key={user + "_userSelected"}
              variant="dark"
            >
              {user} -{" "}
              <b>
                {stars} <AiFillStar color="gold" />
              </b>
            </Button>
          ))}
        </ButtonGroup>

        <Row className="text-light bg-dark my-3 rounded mx-0 text-center py-3">
          <Col className="p-0 m-0 d-flex justify-content-center align-content-center flex-column ">
            <h1 className="display-1 d-flex align-items-center justify-content-center">
              <AiFillStar color="gold" />
              {totalStars}
            </h1>
            <h6 className="fw-bolder text-uppercase">Total Stars</h6>
          </Col>
          <Col className="p-0 m-0 d-flex justify-content-center align-content-center flex-column ">
            <h1 className="display-1 d-flex align-items-center justify-content-center">
              <AiFillStar color="gold" />
              {highestStarUser.stars}
            </h1>
            <h6 className="fw-bolder text-uppercase text-center">
              {highestStarUser.user}
            </h6>
          </Col>
        </Row>

        <Row className="bg-dark my-3 rounded mx-0 text-center">
          <Col>
            <Chart
              chartEvents={[
                {
                  eventName: "ready",
                  callback: ({ chartWrapper, google }) => {
                    const chart = chartWrapper.getChart();
                    google.visualization.events.addListener(
                      chart,
                      "select",
                      () => {
                        const { row, column } = chart.getSelection()[0];
                        if (row !== undefined) {
                          setSelectedUser(pieChartData()[row + 1][0]);
                        }
                      }
                    );
                  },
                },
              ]}
              height={"350px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={pieChartData()}
              options={{
                title: "Stars Collected",
                slices: displaySlices(),
                is3D: true,
              }}
              style={{ backgroundColor: "grey" }}
            />
          </Col>
          <Col>
            <div>
              <h2>Most Stars</h2>
              <div className="w-100">
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
                      className="d-flex justify-content-between align-items-center py-2 px-3 my-1 border-bottom"
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
            </div>
          </Col>
        </Row>

        <div className="my-3 bg-dark p-3">
          {Object.entries(completionTimeline()).map(([key, item]) => {
            return (
              <div
                key={key + "_dayrow"}
                className="mb-2 py-3 rounded border-bottom text-light"
              >
                <h4 className="p-0 m-0">Day {key}</h4>
                <div className="w-100 mt-2 d-flex">
                  {item.users.map((user) => {
                    let isSelected = user.user === selectedUser;

                    return (
                      <div
                        key={user.user + "_useritem" + key + "_dayrow"}
                        className="me-2"
                      >
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
                            {user.user}{" "}
                            {user.task1 && <AiFillStar color="gold" />}{" "}
                            {user.task2 && <AiFillStar color="gold" />}
                          </div>
                          <div className="w-100 text-start mt-2 d-flex flex-column gap-1">
                            {user.task1 && (
                              <small className="d-flex gap-2 align-items-center">
                                <AiFillStar color="gold" /> Solved in{" "}
                                {timeTook(key, user.task1.get_star_ts)}
                              </small>
                            )}
                            {user.task2 && (
                              <small className="d-flex gap-2 align-items-center">
                                <div>
                                  <AiFillStar color="gold" />
                                  <AiFillStar color="gold" />
                                </div>{" "}
                                Solved in{" "}
                                {timeTook(key, user.task2.get_star_ts)}
                              </small>
                            )}
                          </div>
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-3 bg-dark p-3">
          <h4 className="p-0 m-0 text-light mb-3">Activity</h4>
          {
            // take the last 10 events
            getAllMembersStars()
              .slice(-10)
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
                    <b>{item.user}</b> completed part{" "}
                    <AiFillStar color="gold" /> <b>{item.part}</b> for day
                    number <b>{item.task}</b> in{" "}
                    <b>{timeTook(item.task, item.get_star_ts)}</b> about{" "}
                    <b>{formatDistanceToNow(item.get_star_ts)}</b> ago.
                  </div>
                );
              })
          }
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
}
