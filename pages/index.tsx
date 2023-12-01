import { createContext } from "react";

import MyApp from "../context/useAOC";

// Import components
import Header from "../components/Header/Header";
import UserGroup from "../components/UserGroup/UserGroup";
import GoogleChart from "../components/GoogleChart/GoogleChart";
import StarList from "../components/StarList/StarList";
import DayBreakdown from "../components/DayBreakdown/DayBreakdown";
import ActivityFeed from "../components/ActivityFeed/ActivityFeed";
import TotalSegment from "../components/TotalSegment/TotalSegment";

import { Col, Row } from "react-bootstrap";

export const AdventOfCodeDataContext = createContext<any>({});

export default function Home({ eventData }: any) {
  return (
    <MyApp initalAOC={eventData}>
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
    </MyApp>
  );
}

// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export async function getServerSideProps({ req, res }) {
  const CACHE_MAX_AGE = 15 * 60; // 15 minutes
  const CACHE_REVALIDATE = 16 * 60; // 1 minute
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_REVALIDATE}`
  );

  const request = await fetch(process.env.AOC_URL, {
    method: "GET",
    headers: {
      Cookie: `session=${process.env.AOC_SESSION}`,
    },
  });

  const eventData = await request.json();

  return {
    props: { eventData },
  };
}
