// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import cacheData from "memory-cache";

import _2021 from "../../data/2021";
import _2022 from "../../data/2022";

export default async function handler(req, res) {
  try {
    // read in the .json file to string
    switch (req.query.year) {
      case "2021":
        return res.status(200).json(_2021);
      case "2022":
        return res
          .status(200)
          .json(await fetchDataFromAdventOfCode(req.query.year));
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const fetchDataFromAdventOfCode = async (year) => {
  const cacheKey = `adventofcode-${year}`;
  const cacheTimestamp = `adventofcode-${year}-timestamp`;
  const value = cacheData.get(cacheKey);
  const timestamp = cacheData.get(cacheTimestamp);
  if (value) {
    console.log("cache hit");
    return {
      ...value,
      lastUpdated: timestamp ? timestamp : null,
      fromCached: true,
    };
  } else {
    console.log("cache miss");
    const res = await fetch(
      `https://adventofcode.com/${year}/leaderboard/private/view/746545.json`,
      {
        headers: {
          Cookie: `session=${process.env.AOC_SESSION}`,
        },
      }
    );
    const data = await res.json();
    const timestamp = new Date();
    cacheData.put(cacheKey, data, 900 * 1000);
    cacheData.put(cacheTimestamp, timestamp, 900 * 1000);
    return {
      ...data,
      lastUpdated: timestamp,
      fromCached: false,
    };
  }
};
