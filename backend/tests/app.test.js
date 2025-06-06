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
            expect(response.body[0]).toHaveProperty('ID');
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
    test('Delete a voter', async () => {
        const response = await request(app)
            .delete("/voters/1")
        expect(response.statusCode).toBe(201)
    })
});

describe('Candidates API', () => {
    test('GET operation on candidates - all candidates list should be visible', async () => {
        const response = await request(app).get('/candidates');
        // console.log(response.body, request.body?.length)
        expect(response.statusCode).toBe(200);
        expect(response.statusCode).not.toBe(404);
    });
    test('Candidate object should have all the keys', async () => {
        const response = await request(app).get('/candidates');
        if (response.body?.length > 0) {
            expect(response.body[0]).toHaveProperty('ID');
            expect(response.body[0]).toHaveProperty('candidate_name');
            expect(response.body[0]).toHaveProperty('aadhar_id');
            expect(response.body[0]).toHaveProperty('DOB');
            expect(response.body[0]).toHaveProperty('gender');
            expect(response.body[0]).toHaveProperty('email');
            expect(response.body[0]).toHaveProperty('contact_no');
            expect(response.body[0]).toHaveProperty('address');
            expect(response.body[0]).toHaveProperty('election_type')
        }
    });
    // test('Create a candidate object', async () => {
    //     const response = await request(app)
    //         .post("/candidates")
    //         .set('Accept', 'application/json')
    //         .send({
    //             candidate_name: 'xyz1',
    //             aadhar_id: '7867-1194-1547',
    //             gender: 'male',
    //             DOB: '2000-05-05',
    //             email: 'xyz@gmail.com',
    //             contact_no: '6547891230',
    //             address: 'xyz,xyz street,xz',
    //             election_type: 'Parliament'
    //         })
    //         ;
    //     console.log(response.statusCode)
    //     expect(response.statusCode).toBe(201)
    // });

    // test('Update a candidate details object', async () => {
    //     const response = await request(app)
    //         .put("/candidates/14")
    //         .send({
    //             candidate_name: 'updated name',
    //             aadhar_id: '8467-1114-1547',
    //             gender: 'male',
    //             DOB: '2000-05-05',
    //             email: 'xyz@gmail.com',
    //             contact_no: '6547891230',
    //             address: 'xyz,xyz street,xz',
    //             election_type: 'Parliament'
    //         })
    //         .set("Accept", "application/json");
    //     expect(response.statusCode).toBe(201);
    // })

    test('Delete a candidate', async () => {
        const response = await request(app)
            .delete("/candidates/14")
        expect(response.statusCode).toBe(201)
    })
});

describe('elections API', () => {
    test('GET operation on elections - all elections list should be visible', async () => {
        const response = await request(app).get('/elections');
        expect(response.statusCode).toBe(200);
        expect(response.statusCode).not.toBe(404);
    });
    test('election object have all the keys', async () => {
        const response = await request(app).get('/elections');
        if (response.body?.length > 0) {
            expect(response.body[0]).toHaveProperty('ID');
            expect(response.body[0]).toHaveProperty('election_type');
        }
    });
    // test('Create a election object', async () => {
    //     const response = await request(app)
    //         .post("/elections")
    //         .set('Accept', 'application/json')
    //         .send({
    //             election_type: "Muncipal"
    //         })
    //     console.log(response.statusCode)
    //     expect(response.statusCode).toBe(201)
    // });

    // test('Update a election details object', async () => {
    //     const response = await request(app)
    //         .put("/elections/1")
    //         .send({
    //             election_type: 'Panchayat'
    //         })
    //         .set("Accept", "application/json");
    //     expect(response.statusCode).toBe(201);
    // })
    test('Delete a election', async () => {
        const response = await request(app)
            .delete("/elections/4")
        expect(response.statusCode).toBe(201)
    })
});

describe('votes API', () => {
    test('GET operation on votes - all votes list should be visible', async () => {
        const response = await request(app).get('/votes');
        expect(response.statusCode).toBe(200);
        expect(response.statusCode).not.toBe(404);
    });
    test('vote object have all the keys', async () => {
        const response = await request(app).get('/votes');
        if (response.body?.length > 0) {
            expect(response.body[0]).toHaveProperty('ID');
            expect(response.body[0]).toHaveProperty('voter_id');
            expect(response.body[0]).toHaveProperty('candidate_id');
            expect(response.body[0]).toHaveProperty('election_id');
        }
    });
    // test('Create a vote object', async () => {
    //     const response = await request(app)
    //         .post("/votes")
    //         .set('Accept', 'application/json')
    //         .send({
    //             vote_id: '1',
    //             candidate_id: '2',
    //             election_id: '3',
    //         })
    //     console.log(response.statusCode)
    //     expect(response.statusCode).toBe(201)
    // });

    // test('Update a vote details object', async () => {
    //     const response = await request(app)
    //         .put("/votes/1")
    //         .send({
    //             vote_id: '1',
    //             candidate_id: '2',
    //             election_id: '3',
    //         })
    //         .set("Accept", "application/json");
    //     expect(response.statusCode).toBe(201);

    // })
    test('Delete a vote', async () => {
        const response = await request(app)
            .delete("/votes/1")
        expect(response.statusCode).toBe(201)
    })
});