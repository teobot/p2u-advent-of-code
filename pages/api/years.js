// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  try {
    return res.status(200).json({files: ["2021", "2022"]});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
