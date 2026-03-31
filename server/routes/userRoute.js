import express from "express"
import { createUser,getAllUsers,getAllUserById,update,deleteUser} from "../controller/userController.js"

const route = express.Router()

route.post("/user", createUser)
route.get("/users",getAllUsers)
route.get("/users/:id",getAllUserById)
route.put("/update/users/:id",update)
route.delete("/delete/users/:id",deleteUser)

export default route;   