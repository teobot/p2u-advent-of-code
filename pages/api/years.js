// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";

export default function handler(req, res) {
  try {
    // get all the files inside the data folder
    const files = fs.readdirSync("./data").map((file) => file.split(".")[0]);
    return res.status(200).json({files});
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
