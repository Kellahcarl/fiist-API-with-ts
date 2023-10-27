import { Router } from "express";
import { testUser } from "../controllers/userController";

const user_router = Router();

user_router.get("/", testUser);

user_router.post("/me", getLoggedUser);
user_router.post("/login", loginUser);
user_router.post("/reset-password", resetPassword);
user_router.post("/forgot-password", forgotPassword);
user_router.post("/register", registerUser);
user_router.get("/", getUsers);
user_router.get("/:id", getUser);
user_router.put("/", updateUser);
user_router.put("/delete", deleteUser);




// console.log("here");

export default user_router;
