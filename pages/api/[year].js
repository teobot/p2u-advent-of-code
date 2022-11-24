// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";

export default function handler(req, res) {
  try {
    // read in the .json file to string
    const data = fs.readFileSync(`./data/${req.query.year}.json`, "utf8");
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
