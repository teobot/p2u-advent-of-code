import React from "react";

import { Container, Table } from "react-bootstrap";

import advent from "../api/advent";
import CustomTable from "../components/CustomTable";

function App() {
  const { currentData } = advent();

  console.log(currentData);
  return (
    <Container
      style={{ minHeight: "100vh", paddingTop: 25, paddingBottom: 25 }}
    >
      <h1 style={{ color: "#CCCCCC" }}>
        Advent of code {currentData.event} statistics
      </h1>
      <hr style={{ color: "#cccccc", margin: "0px 0px 50px 0px" }} />

      <CustomTable
        title="Ranked by Stars"
        rows={[...currentData.members]
          .sort((a, b) => b.stars - a.stars)
          .map((m, i) => ({ ...m, rank: i + 1 }))}
        columns={[
          { text: "RANKING", key: "rank", style: {}, colspan: 1 },
          { text: "USER", key: "user", style: {}, colspan: 8 },
          { text: "STARS", key: "stars", style: {}, colspan: 1 },
        ]}
      />
    </Container>
  );
}

export default App;
