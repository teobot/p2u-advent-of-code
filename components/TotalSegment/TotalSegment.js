import React, { useContext } from "react";

import { Row, Col, Badge } from "react-bootstrap";

import { AiFillStar } from "react-icons/ai";
import { GiStarsStack } from "react-icons/gi";
import { BiMedal } from "react-icons/bi";

import { AdventOfCodeDataContext } from "../../pages/_app";

export default function TotalSegment() {
  const { totalStars, highestStarUser, highestLocalScore } = useContext(
    AdventOfCodeDataContext
  );
  return (
    <Row className="text-light bg-dark my-3 rounded mx-0 text-center p-3">
      <Total
        icon={<GiStarsStack color="#8540f5" />}
        title="Total Stars"
        subtitle="Across the team"
        value={totalStars}
      />
      <Total
        icon={<AiFillStar color="#ffcd39" />}
        title="Most Stars"
        subtitle={highestStarUser.user}
        value={highestStarUser.stars}
      />
      <Total
        icon={<BiMedal color="#ced4da" />}
        title="Best Local Score"
        subtitle={highestLocalScore.user}
        value={highestLocalScore.local_score}
      />
    </Row>
  );
}

const Total = ({
  icon = <AiFillStar color="gold" />,
  title = "Total Stars",
  subtitle = "Most Stars",
  value = "90",
}) => {
  return (
    <Col className="position-relative overflow-hidden">
      <div className="p-3 border border-2 border-secondary rounded-3 pb-5">
        <div className="w-100 d-flex flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center gap-1 h5 w-100 m-0">
            {icon}
            <span className="text-light fw-bold">{title}</span>
            {icon}
          </div>
          <div className="fw-light">{subtitle}</div>
        </div>
        <div className="fw-bolder" style={{ fontSize: "4rem" }}>
          {value}
        </div>
      </div>
      <div
        className="d-flex m-0 p-0 w-100 text-center justify-content-center align-items-center"
        style={{
          fontSize: "8rem",
          position: "absolute",
          bottom: -70,
          right: 0,
          left: 0,
        }}
      >
        {icon}
      </div>
    </Col>
  );
};
