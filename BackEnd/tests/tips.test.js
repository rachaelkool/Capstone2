process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const { createToken } = require("../helpers/tokens");


let test_tip;
let test_employee;
employee = { 
    "empId": 4001,
    "isAdmin": true
}

token = createToken(employee)

beforeAll(async () => {
    token = createToken(employee);
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
            tips (id, date, total_sales, total_tips, entered_by)
            VALUES(
            3,
            '01-01-2023',
            300.25,
            20.99,
            4001)
            RETURNING id`);
    test_tip = result.rows[0]
});


describe('GET /tips', function () {
    test('Gets all tips', async function () {
        const res = await request(app).get('/api/tips').set('Authorization', token);
        const tips = res.body.tips;
        expect(tips).toHaveLength(1);
        expect(tips[0]).toHaveProperty('id');
        expect(tips[0]).toHaveProperty('date');
        expect(tips[0]).toHaveProperty('total_tips');
    });
});


describe('GET /tips/:id', function () {
    test('Gets a tip with particular id', async function () {
        const res = await request(app).get(`/api/tips/${test_tip.id}`).set('Authorization', token);
        const tip = res.body.tip;
        expect(tip).toHaveProperty('id');
        expect(tip.id).toBe(test_tip.id);
    });
});


describe('POST /tips', function () {
    test('Creates a new tip', async function () {
        const res = await request(app).post('/api/tips').send({
            date: '01-02-2023',
            total_sales: 100,
            total_tips: 25.50,
            entered_by: 4001
        }).set('Authorization', token);
        const tip = res.body.tip;
        expect(res.statusCode).toBe(201);
        expect(tip).toHaveProperty('id');
        expect(tip).toHaveProperty('date');
        expect(tip).toHaveProperty('total_tips');
    });
});


describe('PATCH /tips/:id', function () {
    test('Updates a tip', async function () {
        const res = await request(app).patch(`/api/tips/${test_tip.id}`).send({
            date: '01-02-2023',
            total_sales: 50.33,
            total_tips: 10.22,
            entered_by: 4001
        }).set('Authorization', token);
        const tip = res.body.tip;
        expect(tip).toHaveProperty('id');
        expect(tip.total_tips).toBe('10.22');
    });
});


describe('DELETE /tips/:id', function () {
    test('Delete tip', async function () {
        const res = await request(app).delete(`/api/tips/${test_tip.id}`).set('Authorization', token);
        expect(res.body).toEqual({message: 'Tip deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM TIPS');
});
  
  
afterAll(async function () {
    await db.query('DELETE FROM EMPLOYEES');
    await db.end()
});