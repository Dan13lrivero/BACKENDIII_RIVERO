import { createHash } from "../utils/index.js";
import { faker } from "@faker-js/faker";

export const generateMockUsers = async (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    const hashedPassword = await createHash("coder123");
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }
  return users;
};
