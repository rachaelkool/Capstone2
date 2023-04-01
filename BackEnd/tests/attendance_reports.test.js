process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const { createToken } = require("../helpers/tokens");


let test_attendance_report;
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
    test_attendance_report = result.rows[0]
});


describe('GET /attendance', function () {
    test('Gets all employee attendance reports', async function () {
        const res = await request(app).get('/api/attendance').set('Authorization', token);
        const reports = res.body.attendance_reports;
        expect(reports).toHaveLength(1);
        expect(reports[0]).toHaveProperty('id');
        expect(reports[0]).toHaveProperty('date');
        expect(reports[0]).toHaveProperty('emp_id');
    });
});


describe('GET /attendance/:id', function () {
    test('Gets an employee attendance report with particular id', async function () {
        const res = await request(app).get(`/api/attendance/${test_attendance_report.id}`).set('Authorization', token);
        const report = res.body.attendance_report;
        expect(report).toHaveProperty('id');
        expect(report.id).toBe(test_attendance_report.id);
    });
});


describe('POST /attendance', function () {
    test('Creates a new employee attendance report', async function () {
        const res = await request(app).post('/api/attendance').send({
            date: '01-02-2023',
            emp_id: 5001,
            sick_time: false,
            tardy: false,
            no_show: false,
            entered_by: 4001
        }).set('Authorization', token);
        console.log(res.body)
        const report = res.body.attendance_report;
        expect(res.statusCode).toBe(201);
        expect(report).toHaveProperty('id');
        expect(report).toHaveProperty('date');
        expect(report).toHaveProperty('emp_id');
    });
});


describe('PATCH /attendance/:id', function () {
    test('Updates an employee attendance report', async function () {
        const res = await request(app).patch(`/api/attendance/${test_attendance_report.id}`).send({
            date: '01-02-2023',
            emp_id: 7001,
            sick_time: false,
            tardy: false,
            no_show: false,
            entered_by: 4001
        }).set('Authorization', token);
        console.log(res.body)
        const report = res.body.attendance_report;
        expect(report).toHaveProperty('id');
        expect(report.emp_id).toBe(7001);
    });
});


describe('DELETE /attendance/:id', function () {
    test('Delete employee attendance report', async function () {
        const res = await request(app).delete(`/api/attendance/${test_attendance_report.id}`).set('Authorization', token);
        expect(res.body).toEqual({message: 'Employee attendance report deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM EMPLOYEE_ATTENDANCE_REPORTS');
});
  
  
afterAll(async function () {
    await db.query('DELETE FROM EMPLOYEES');
    await db.end()
});