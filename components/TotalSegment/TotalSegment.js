import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";

import { AiFillStar } from "react-icons/ai";

import { AdventOfCodeDataContext } from "../../pages/_app";

export default function TotalSegment() {
  const { totalStars, highestStarUser, selectedUser, setSelectedUser } =
    useContext(AdventOfCodeDataContext);
  return (
    <Row className="text-light bg-dark my-3 rounded mx-0 text-center py-3">
      <Col className="p-0 m-0 d-flex justify-content-center align-content-center flex-column ">
        <h1 className="display-1 d-flex align-items-center justify-content-center">
          <AiFillStar color="gold" />
          {totalStars}
        </h1>
        <h6 className="text-uppercase">Total Stars</h6>
      </Col>
      <Col className="p-0 m-0 d-flex justify-content-center align-content-center flex-column ">
        <h1 className="display-1 d-flex align-items-center justify-content-center">
          <AiFillStar color="gold" />
          {highestStarUser.stars}
        </h1>
        <h6
          className={`text-uppercase text-center ${
            selectedUser === highestStarUser.user && "fw-bolder"
          }`}
        >
          {highestStarUser.user}
        </h6>
      </Col>
    </Row>
  );
}
