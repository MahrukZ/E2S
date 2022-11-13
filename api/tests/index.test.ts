import request from "supertest"
import app from "../index"

describe('GET /api/insights', () => {
    it('should get all insights', async () => {
        const res = await request(app).get("/api/insights");
        expect(res.statusCode).toBe(200);
    });
});