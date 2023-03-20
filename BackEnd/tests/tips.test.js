process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let test_tip;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO
            tips (id, date, total_sales, total_tips, entered_by)
            VALUES(
            3,
            '01-01-2023',
            300.25,
            20.99,
            3001)
            RETURNING id`);
    test_tip = result.rows[0].id
});


describe('GET /tips', function () {
    test('Gets all tips', async function () {
        const res = await request(app).get('/tips');
        const tips = res.body.tips;
        expect(tips).toHaveLength(1);
        expect(tips[0]).toHaveProperty('id');
        expect(tips[0]).toHaveProperty('date');
        expect(tips[0]).toHaveProperty('total_tips');
    });
});


describe('GET /tips/:id', function () {
    test('Gets a tip with particular id', async function () {
        const res = await request(app).get(`/tips/${test_tip.id}`)
        const tip = res.body.tip;
        expect(tip).toHaveProperty('id');
        expect(tip.id).toBe(test_tip.id);
    });
    test('Responds with 404 if no tip with that id', async function () {
      const res = await request(app).get('/tips/234')
      expect(res.statusCode).toBe(404);
    });
});


describe('POST /tips', function () {
    test('Creates a new tip', async function () {
        const res = await request(app).post('/tips').send({
            id: 4,
            date: '01-02-2023',
            total_sales: 100,
            total_tips: 25.50,
            entered_by: 4001
        });
        const tip = res.body.tip;
        expect(res.statusCode).toBe(201);
        expect(tip).toHaveProperty('id');
        expect(tip).toHaveProperty('date');
        expect(tip).toHaveProperty('total_tips');
    });
});


describe('PATCH /tips/:id', function () {
    test('Updates a tip', async function () {
        const res = await request(app).put(`/tips/${test_tip.id}`).send({
            date: '01-02-2023',
            total_sales: 50.33,
            total_tips: 10.22,
            entered_by: 5001
        });
        const tip = res.body.tip;
        expect(tip).toHaveProperty('id');
        expect(tip.total_tips).toBe(10.22);
    });
});


describe('DELETE /tips/:id', function () {
    test('Delete tip', async function () {
        const res = await request(app).delete(`/tips/${test_tip.id}`)
        expect(res.body).toEqual({message: 'Tip deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM TIPS');
});
  
  
afterAll(async function () {
    await db.end()
});