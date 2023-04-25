import Express  from "express"
import { getMSSV } from "../controller/GetMSSV"

const router = Express.router()

router.post('/mssv', getMSSV)