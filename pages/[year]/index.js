import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdventOfCodeDataContext } from "../../pages/_app";

import Loader from "../../components/Loader";
import { Col, Row } from "react-bootstrap";

import { AiFillStar } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

// Import components
import Header from "../../components/Header/Header";
import UserGroup from "../../components/UserGroup/UserGroup";
import GoogleChart from "../../components/GoogleChart/GoogleChart";
import StarList from "../../components/StarList/StarList";
import DayBreakdown from "../../components/DayBreakdown/DayBreakdown";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";
import TotalSegment from "../../components/TotalSegment/TotalSegment";

export default function Year() {
  const { eventData, fetchYear } = useContext(AdventOfCodeDataContext);

  const router = useRouter();

  useEffect(() => {
    if (router.query.year) {
      // fetch year data every 30 seconds
      fetchYear(router.query.year);
      const interval = setInterval(() => {
        fetchYear(router.query.year);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [router.query.year]);

  if (eventData) {
    return (
      <>
        <Header />

        <UserGroup />

        <TotalSegment />

        <Row className="bg-dark my-3 rounded mx-0 text-center">
          <Col>
            <GoogleChart />
          </Col>
          <Col>
            <StarList />
          </Col>
        </Row>

        <DayBreakdown />

        <ActivityFeed />
      </>
    );
  } else {
    return <Loader />;
  }
}
