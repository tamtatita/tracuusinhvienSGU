import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quanlysinhvien",
});

db.connect((error) => {
  if (error) throw error;
  console.log("Connected");
});
