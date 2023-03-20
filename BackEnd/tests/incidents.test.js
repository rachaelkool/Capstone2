process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let test_incident;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO
            incidents (id, date, severity, reporting_manager, witness, description, entered_by)
            VALUES(
            3,
            '01-01-2023',
            3,
            'Rachael Kool',
            'Scooby Doo',
            'This is a test incident.',
            3001)
            RETURNING id`);
    test_incident = result.rows[0].id
});


describe('GET /incidents', function () {
    test('Gets all incidents', async function () {
        const res = await request(app).get('/incidents');
        const incidents = res.body.incidents;
        expect(incidents).toHaveLength(1);
        expect(incidents[0]).toHaveProperty('id');
        expect(incidents[0]).toHaveProperty('date');
        expect(incidents[0]).toHaveProperty('description');
    });
});


describe('GET /incidents/:id', function () {
    test('Gets a incident with particular id', async function () {
        const res = await request(app).get(`/incidents/${test_incident.id}`)
        const incident = res.body.incident;
        expect(incident).toHaveProperty('id');
        expect(incident.id).toBe(test_incident.id);
    });
    test('Responds with 404 if no incident with that id', async function () {
      const res = await request(app).get('/incidents/234')
      expect(res.statusCode).toBe(404);
    });
});


describe('POST /incidents', function () {
    test('Creates a new incident', async function () {
        const res = await request(app).post('/incidents').send({
            id: 4,
            date: '01-02-2023',
            severity: 4,
            reporting_manager: 'John Jones',
            witness: 'Goldie',
            description: 'Can I create an incident?',
            entered_by: 4001
        });
        const incident = res.body.incident;
        expect(res.statusCode).toBe(201);
        expect(incident).toHaveProperty('id');
        expect(incident).toHaveProperty('date');
        expect(incident).toHaveProperty('description');
    });
});


describe('PATCH /incidents/:id', function () {
    test('Updates an incident', async function () {
        const res = await request(app).put(`/incidents/${test_incident.id}`).send({
            date: '01-02-2023',
            severity: 5,
            reporting_manager: 'John Jones',
            witness: 'Goldie',
            description: 'Can I update an incident?',
            entered_by: 5001
        });
        const incident = res.body.incident;
        expect(incident).toHaveProperty('id');
        expect(incident.severity).toBe(5);
    });
});


describe('DELETE /incidents/:id', function () {
    test('Delete incident', async function () {
        const res = await request(app).delete(`/incidents/${test_incident.id}`)
        expect(res.body).toEqual({message: 'Incident deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM INCIDENTS');
});
  
  
afterAll(async function () {
    await db.end()
});