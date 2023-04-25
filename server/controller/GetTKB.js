import { db } from "../connect.js";

export const getTKB = (req, res) => {
  const q =
    "SELECT N.maMonHoc, MH.tenMonHoc, N.nhomMonHoc, N.thuMonHoc, N.tietBatDau, N.soTiet, N.maPhong from `sinhvien` SV JOIN `sinhvien_dknhom` SVN ON SV.`MSSV` = SVN.`MSSV` JOIN `nhom` N on N.`maMonHoc` = SVN.`maMonHoc` JOIN `monhoc` MH ON N.maMonHoc = MH.maMonHoc WHERE SV.`MSSV` like ? and N.`nhomMonHoc` = SVN.`nhomMonHoc`";
  // "SELECT N.maMonHoc, MH.tenMonHoc, N.nhomMonHoc, N.thuMonHoc, N.tietBatDau, N.soTiet, N.maPhong FROM `giangvien` GV LEFT JOIN `giangvien_mon` GVM ON GV.maVienChuc = GVM.maVienChuc LEFT JOIN `monhoc` MH ON GVM.maMonHoc = MH.maMonHoc LEFT JOIN `nhom` N ON N.maMonHoc = MH.maMonHoc AND N.nhomMonHoc = GVM.nhomMonHoc AND GV.maVienChuc LIKE ?";
  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log("Lỗi lấy dữ liệu getTKB bên server: " + err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getInfo = (req, res) => {
  const q =
    "SELECT SV.`MSSV`, SV.hoLot, SV.tenSV, SV.maLop, SV.tenLop, BD.ngaySinh FROM `sinhvien` SV JOIN `bangdiem` BD on SV.`MSSV` = BD.`MSSV` WHERE `SV`.`MSSV` LIKE ? GROUP by SV.MSSV";

  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log("Lỗi lấy dữ liệu getTKB bên server: " + err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getTranscript = (req, res) => {
  const q =
    "SELECT BD.`hocKi`, BD.`TBTL`, BD.`TBHK` FROM `bangdiem` BD WHERE BD.`MSSV` like ? ORDER BY `BD`.`hocKi` DESC";
  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];
  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getCredit = (req, res) => {
  const q =
    "select (sum(M.tinChi)+BD.tinChiTichLuy) as 'Total' from `sinhvien` SV, `bangdiem` BD, `sinhvien_dknhom` SVN, `monhoc` M WHERE SV.MSSV = SVN.MSSV AND SVN.maMonHoc = M.maMonHoc AND SV.MSSV = BD.MSSV and SV.MSSV LIKE ? AND BD.hocKi LIKE '1-2022/2023' and (M.tenMonHoc not like '%Giáo dục%' and M.tenMonHoc not like '%Bóng%' and M.tenMonHoc not like '%Cầu%') GROUP BY SV.MSSV;";

  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

// tOP 10 ĐIỂM TÍCH LŨY CAO NHẤT 2 KHỐI
// SELECT * FROM `sinhvien` SV JOIN `bangdiem` BD ON SV.MSSV = BD.MSSV WHERE BD.`hocKi` LIKE '1-2022/2023' ORDER by `BD`.`TBTL` DESC LIMIT 10;

export const getRank = (req, res) => {
  const q =
    "SELECT COUNT(SV.MSSV)+1 AS 'Rank' FROM `sinhvien` SV, `bangdiem` BD WHERE SV.MSSV = BD.MSSV AND BD.hocKi LIKE '1-2022/2023' AND BD.TBTL > (SELECT BD.TBTL   FROM `bangdiem` BD      WHERE BD.MSSV LIKE ? AND BD.hocKi LIKE '1-2022/2023') ORDER BY BD.TBTL DESC";

  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];

  db.query(q, values, (err, data) => {
    if (err)
      // console.log(err);
      return res.json(err);
    else return res.json(data);
  });
};

export const getDRL = (req, res) => {
  const q =
    "SELECT DRL.diemRL as value, DRL.xepLoai, DRL.hocKi as id, DRL.hocKi as label FROM `drl` DRL WHERE DRL.MSSV LIKE ?";
  const MSSV = req.body.MSSV;
  const values = [`${MSSV}`];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
};
