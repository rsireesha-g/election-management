const request = require('supertest');
const app = require('../app');
const db = require("../db");

afterAll(async () => {
    db.close()
})

describe('Voters API', () => {
    test('GET operation on voters - all voters list should be visible', async () => {
        const response = await request(app).get('/voters');
        expect(response.statusCode).toBe(200);
        expect(response.statusCode).not.toBe(404);
    });
    test('Voter object have all the keys', async () => {
        const response = await request(app).get('/voters');
        if (response.body?.length > 0) {
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('voter_name');
            expect(response.body[0]).toHaveProperty('aadhar_id');
            expect(response.body[0]).toHaveProperty('DOB');
            expect(response.body[0]).toHaveProperty('gender');
            expect(response.body[0]).toHaveProperty('email');
            expect(response.body[0]).toHaveProperty('contact_no');
            expect(response.body[0]).toHaveProperty('address');
        }
    });
    // test('Create a voter object', async () => {
    //     const response = await request(app)
    //         .post("/voters")
    //         .set('Accept', 'application/json')
    //         .send({
    //             voter_name: 'xyz1',
    //             aadhar_id: '7867-7894-1547',
    //             gender: 'male',
    //             DOB: '2000-05-05',
    //             email: 'xyz@gmail.com',
    //             contact_no: '6547891230',
    //             address: 'xyz,xyz street,xz'
    //         })
    //         ;
    //     console.log(response.statusCode)
    //     expect(response.statusCode).toBe(201)
    // });

    // test('Update a voter details object', async () => {
    //     const response = await request(app)
    //         .put("/voters/1")
    //         .send({
    //             voter_name: 'updated name',
    //             aadhar_id: '8467-7894-1547',
    //             gender: 'male',
    //             DOB: '2000-05-05',
    //             email: 'xyz@gmail.com',
    //             contact_no: '6547891230',
    //             address: 'xyz,xyz street,xz'
    //         })
    //         .set("Accept", "application/json");
    //     expect(response.statusCode).toBe(201);

    // })
    // test('Delete a voter', async () => {
    //     const response = await request(app)
    //         .delete("/voters/1")
    //     expect(response.statusCode).toBe(201)
    // })
});