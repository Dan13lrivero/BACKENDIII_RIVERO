import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { createHash } from "./index.js";

export const generateUsers = async (count = 50) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const hashedPassword = await createHash("coder123");
    const user = {
      _id: new mongoose.Types.ObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    };
    users.push(user);
  }
  return users;
};

export const generatePets = (count = 50) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    const pet = {
      _id: new mongoose.Types.ObjectId(),
      name: faker.animal.petName(),
      specie: faker.animal.type(),
      birthDate: faker.date.birthdate(),
      adopted: false,
      owner: null,
      image: "",
    };
    pets.push(pet);
  }
  return pets;
};
