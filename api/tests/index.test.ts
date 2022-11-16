import request from "supertest"
import app from "../index"
import { IInsight } from "../data/models/insights.model"

describe('GET /api/insights', () => {
    it('should get all insights', async () => {
        // Given 
        // When
        const res = await request(app).get("/api/insights");

        // Then 
        expect(res.body.message).toEqual('Success');
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([
            {
                "insight_id": 1,
                "description": "Considering your energy prices forecasts, your CHP units should be ran into thermal led mode. This could help you save £... on your energy bills and ... tCO2e"
            },
            {
                "insight_id": 2,
                "description": "Last ..., your electricity consumption increased by ...% compared to your baseline"
            },
            {
                "insight_id": 3,
                "description": "Your forecast energy costs for the next ... is £... This is an increase/decrease of ...% compared to last ... at the same period"
            }
        ]);
    });
});

describe('POST /api/insight', () => {
    it('should create a new insight', async () => {
        // Given 
        const newInsight: IInsight = {
            description: 'Your carbon emissions have decreased by ...% for the ...week compared to the week...'
        };
       
        // When
        const res = await request(app)
            .post('/api/insight')
            .send(newInsight);

        // Then 
        expect(res.body.message).toEqual('Created');
        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toEqual(
            {
                "insight_id": 4,
                "description": "Your carbon emissions have decreased by ...% for the ...week compared to the week..."
            }
        );
    });
});

describe('PUT /api/insight', () => {
    it('should update an insight', async () => {
        // Given 
        const newInsight: IInsight = {
            insight_id: 4,
            description: 'Your carbon emissions have decreased by ...% for the ...week compared to the week... for this month'
        };
       
        // When
        const res = await request(app)
            .put('/api/insight')
            .send(newInsight);

        // Then
        expect(res.body.message).toEqual('Successfully updated 1 record.');
        expect(res.statusCode).toEqual(200);
    });
});

describe('DELETE /api/insight/:id', () => {
    it('should delete an insight', async () => {
        // Given 
        const paramId = 4;
        
        // When
        const res = await request(app)
            .delete(`/api/insight/${paramId}`)
            
        // Then
        expect(res.body.message).toEqual('Successfully deleted 1 record.');
        expect(res.statusCode).toEqual(202);
    });
});