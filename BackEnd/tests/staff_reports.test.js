process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let test_report;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO
            staff_reports (id, date, server, section, guests_served, total_sales, entered_by)
            VALUES(
            3,
            '01-01-2023',
            'Scooby Doo',
            '4a',
            100,
            112.25,
            3001)
            RETURNING id`);
    test_report = result.rows[0].id
});


describe('GET /staff', function () {
    test('Gets all staff reports', async function () {
        const res = await request(app).get('/staff');
        const reports = res.body.staff_reports;
        expect(reports).toHaveLength(1);
        expect(reports[0]).toHaveProperty('id');
        expect(reports[0]).toHaveProperty('date');
        expect(reports[0]).toHaveProperty('section');
    });
});


describe('GET /staff/:id', function () {
    test('Gets a staff report with particular id', async function () {
        const res = await request(app).get(`/staff/${test_report.id}`)
        const report = res.body.staff_report;
        expect(report).toHaveProperty('id');
        expect(report.id).toBe(test_report.id);
    });
    test('Responds with 404 if no staff report with that id', async function () {
      const res = await request(app).get('/staff/234')
      expect(res.statusCode).toBe(404);
    });
});


describe('POST /staff', function () {
    test('Creates a new staff report', async function () {
        const res = await request(app).post('/staff').send({
            id: 4,
            date: '01-02-2023',
            server: 'Rachael Kool',
            section: '10b',
            guests_served: 50,
            total_sales: 200.50,
            entered_by: 4001
        });
        const report = res.body.staff_report;
        expect(res.statusCode).toBe(201);
        expect(report).toHaveProperty('id');
        expect(report).toHaveProperty('date');
        expect(report).toHaveProperty('section');
    });
});


describe('PATCH /staff/:id', function () {
    test('Updates an staff report', async function () {
        const res = await request(app).put(`/ffsta/${test_report.id}`).send({
            date: '01-02-2023',
            server: 'John Jones',
            section: '6c',
            guests_served: 100,
            total_sales: 113.45,
            entered_by: 5001
        });
        const report = res.body.staff_report;
        expect(report).toHaveProperty('id');
        expect(report.server).toBe('John Jones');
    });
});


describe('DELETE /staff/:id', function () {
    test('Delete staff report', async function () {
        const res = await request(app).delete(`/staff/${test_report.id}`)
        expect(res.body).toEqual({message: 'Staff report deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM INCIDENTS');
});
  
  
afterAll(async function () {
    await db.end()
});