import { Router } from "express";
import { ErrorHanddlerMiddleWare } from "../middleware/error";
import { authRoute } from "./auth.routes";


const indexRoutes = Router()
indexRoutes.use("/auth",authRoute) 
indexRoutes.use(ErrorHanddlerMiddleWare)

export default indexRoutes