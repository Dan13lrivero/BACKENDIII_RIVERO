import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Tests funcionales - Adoptions", () => {
  let userId;
  let petId;
  let adoptionId;

  before(async function() {
    this.timeout(10000);
    
    try {
      const userRes = await requester.post("/api/sessions/register").send({
        first_name: "Test",
        last_name: "User",
        email: `test_${Date.now()}@mail.com`,
        password: "123"
      });
      
      userId = userRes.body.payload;

      const petRes = await requester.post("/api/pets").send({
        name: `Pet_${Date.now()}`,
        specie: "dog",
        birthDate: "2020-01-01"
      });
      
      petId = petRes.body.payload._id;

      if (!userId || !petId) {
        throw new Error("No se pudieron crear el usuario o la mascota");
      }
    } catch (error) {
      console.error("Error en before:", error);
      throw error;
    }
  });

  it("GET /api/adoptions debe devolver un array", async () => {
    const res = await requester.get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("payload");
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/adoptions/:uid/:pid crea una adopción", async () => {
    const res = await requester.post(`/api/adoptions/${userId}/${petId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Pet adopted");
  });

  it("GET /api/adoptions/:aid obtiene una adopción por ID", async () => {
    const adoptionsRes = await requester.get("/api/adoptions");
    const adoptions = adoptionsRes.body.payload;
    
    if (adoptions.length > 0) {
      adoptionId = adoptions[0]._id;
      const res = await requester.get(`/api/adoptions/${adoptionId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("payload");
      expect(res.body.payload).to.have.property("_id", adoptionId);
    }
  });

  it("POST /api/adoptions/:uid/:pid retorna error si el usuario no existe", async () => {
    const res = await requester.post(`/api/adoptions/123456789012345678901234/${petId}`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "user Not found");
  });

  it("POST /api/adoptions/:uid/:pid retorna error si la mascota no existe", async () => {
    const res = await requester.post(`/api/adoptions/${userId}/123456789012345678901234`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "Pet not found");
  });

  after(async function() {
    this.timeout(10000);
    if (userId) await requester.delete(`/api/users/${userId}`);
    if (petId) await requester.delete(`/api/pets/${petId}`);
  });
});