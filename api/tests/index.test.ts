import request from "supertest"
import app from "../index"

describe('GET /api/insights', () => {
    it('should get all insights', async () => {
        const res = await request(app).get("/api/insights");
        expect(res.statusCode).toBe(200);
    }),
    it('should create a new insight', async () => {
        const res = await request(app)
            .post('/api/insight')
            .send({
                description: 'Your carbon emissions have decreased by ...% for the ...week compared to the week...'
            });
        expect(res.statusCode).toEqual(201);
    });
});