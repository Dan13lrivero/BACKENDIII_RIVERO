import { Router } from "express";
import { generateUsers, generatePets } from "../utils/mocking.js";
import { petsService, usersService } from "../services/index.js";

const router = Router();

router.get("/mockingpets", async (req, res) => {
  const pets = generatePets(50);
  res.json({ status: "success", payload: pets });
});

router.get("/mockingusers", async (req, res) => {
  const users = await generateUsers(50);
  res.json({ status: "success", payload: users });
});

router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;
  const mockUsers = await generateUsers(users);
  const mockPets = generatePets(pets);
  await usersService.createMany(mockUsers);
  await petsService.createMany(mockPets);
  res.json({ status: "success", message: "Data generated" });
});

export default router;
