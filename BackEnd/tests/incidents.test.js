process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const { createToken } = require("../helpers/tokens");


let test_incident;
let test_employee;
employee = { 
    "empId": 4001,
    "isAdmin": true
}

token = createToken(employee)

beforeAll(async () => {
    let result = await db.query(`
        INSERT INTO
            employees (employee_id, password, first_name, last_name, is_admin)
            VALUES(
            4001,
            'testpassword',
            'Scooby',
            'Doo',
            true)
            RETURNING employee_id`);
    test_employee = result.rows[0].id
})

beforeEach(async () => {
    token = createToken(employee);
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
            4001)
            RETURNING id`);
    test_incident = result.rows[0]
});


describe('GET /incidents', function () {
    test('Gets all incidents', async function () {
        const res = await request(app).get('/api/incidents').set('Authorization', token);
        const incidents = res.body.incidents;
        expect(incidents).toHaveLength(1);
        expect(incidents[0]).toHaveProperty('id');
        expect(incidents[0]).toHaveProperty('date');
        expect(incidents[0]).toHaveProperty('description');
    });
});


describe('GET /incidents/:id', function () {
    test('Gets a incident with particular id', async function () {
        const res = await request(app).get(`/api/incidents/${test_incident.id}`).set('Authorization', token);
        const incident = res.body.incident;
        expect(incident).toHaveProperty('id');
        expect(incident.id).toBe(test_incident.id);
    });
});


describe('POST /incidents', function () {
    test('Creates a new incident', async function () {
        const res = await request(app).post('/api/incidents').send({
            date: '01-02-2023',
            severity: 4,
            reporting_manager: 'John Jones',
            witness: 'Goldie',
            description: 'Can I create an incident?',
            entered_by: 4001
        }).set('Authorization', token);
        const incident = res.body.incident;
        expect(res.statusCode).toBe(201);
        expect(incident).toHaveProperty('id');
        expect(incident).toHaveProperty('date');
        expect(incident).toHaveProperty('description');
    });
});


describe('PATCH /incidents/:id', function () {
    test('Updates an incident', async function () {
        const res = await request(app).patch(`/api/incidents/${test_incident.id}`).send({
            date: '01-02-2023',
            severity: 5,
            reporting_manager: 'John Jones',
            witness: 'Goldie',
            description: 'Can I update an incident?',
            entered_by: 4001
        }).set('Authorization', token);
        const incident = res.body.incident;
        expect(incident).toHaveProperty('id');
        expect(incident.severity).toBe(5);
    });
});


describe('DELETE /incidents/:id', function () {
    test('Delete incident', async function () {
        const res = await request(app).delete(`/api/incidents/${test_incident.id}`).set('Authorization', token);
        expect(res.body).toEqual({message: 'Incident deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM INCIDENTS');
});
  
  
afterAll(async function () {
    await db.query('DELETE FROM EMPLOYEES');
    await db.end()
});