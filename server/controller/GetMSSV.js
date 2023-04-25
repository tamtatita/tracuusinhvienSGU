import { db } from "../connect";

export const getMSSV = (req, res) => {
  const q = "SELECT * from `sinhvien` sv where sv.MSSV like ?";
  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};
