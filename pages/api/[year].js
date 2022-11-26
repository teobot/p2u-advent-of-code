// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import _2021 from "../../data/2021";
import _2022 from "../../data/2022";

export default function handler(req, res) {
  try {
    // read in the .json file to string
    switch (req.query.year) {
      case "2021":
        return res.status(200).json(_2021);
      case "2022":
        return res.status(200).json(_2022);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
