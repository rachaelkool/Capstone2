process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let test_attendance_report;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO
            employee_attendance_reports (id, date, emp_id, sick_time, tardy, no_show, entered_by)
            VALUES(
            3,
            '01-01-2023',
            3001,
            true,
            true,
            true,
            4001)
            RETURNING id`);
    test_attendance_report = result.rows[0].id
});


describe('GET /attendance', function () {
    test('Gets all employee attendance reports', async function () {
        const res = await request(app).get('/attendance');
        const reports = res.body.attenance_reports;
        expect(reports).toHaveLength(1);
        expect(reports[0]).toHaveProperty('id');
        expect(reports[0]).toHaveProperty('date');
        expect(reports[0]).toHaveProperty('emp_id');
    });
});


describe('GET /attendance/:id', function () {
    test('Gets an employee attendance report with particular id', async function () {
        const res = await request(app).get(`/attendance/${test_attendance_report.id}`)
        const report = res.body.attendance_report;
        expect(report).toHaveProperty('id');
        expect(attendance_report.id).toBe(test_attendance_report.id);
    });
    test('Responds with 404 if no employee attendance report with that id', async function () {
      const res = await request(app).get('/attendance/234')
      expect(res.statusCode).toBe(404);
    });
});


describe('POST /attendance', function () {
    test('Creates a new employee attendance report', async function () {
        const res = await request(app).post('/attendance').send({
            id: 4,
            date: '01-02-2023',
            emp_id: 5001,
            sick_time: false,
            tardy: false,
            no_show: false,
            entered_by: 6001
        });
        const report = res.body.attenance_report;
        expect(res.statusCode).toBe(201);
        expect(incident).toHaveProperty('id');
        expect(incident).toHaveProperty('date');
        expect(incident).toHaveProperty('emp_id');
    });
});


describe('PATCH /attendance/:id', function () {
    test('Updates an employee attendance report', async function () {
        const res = await request(app).put(`/attendance/${test_attendance_report.id}`).send({
            date: '01-02-2023',
            emp_id: 7001,
            sick_time: false,
            tardy: false,
            no_show: false,
            entered_by: 4001
        });
        const report = res.body.attenance_report;
        expect(report).toHaveProperty('id');
        expect(report.emp_id).toBe(7001);
    });
});


describe('DELETE /attendance/:id', function () {
    test('Delete employee attendance report', async function () {
        const res = await request(app).delete(`/attendance/${test_attendance_report.id}`)
        expect(res.body).toEqual({message: 'Employee attendance report deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM EMPLOYEE_ATTENDANCE_REPORTS');
});
  
  
afterAll(async function () {
    await db.end()
});