process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const { createToken } = require("../helpers/tokens");


let test_note;
let test_employee;
employee = { 
    "empId": 4001,
    "isAdmin": true
}

// token = createToken(employee)

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
    token = createToken(employee)
    let result = await db.query(`
        INSERT INTO
            notes (id, date, content, emp_id)
            VALUES(
            3,
            '01-01-2023',
            'hello note',
            4001)
            RETURNING id`);
    test_note = result.rows[0]
});


describe('GET /notes', function () {
    test('Gets all notes', async function () {
        const res = await request(app).get('/api/notes').set('Authorization', token);
        const notes = res.body.notes;
        expect(notes).toHaveLength(1);
        expect(notes[0]).toHaveProperty('id');
        expect(notes[0]).toHaveProperty('date');
        expect(notes[0]).toHaveProperty('content');
    });
});


describe('GET /notes/:id', function () {
    test('Gets a note with particular id', async function () {
        const res = await request(app).get(`/api/notes/${test_note.id}`).set('Authorization', token);
        const note = res.body.note;
        expect(note).toHaveProperty('id');
        expect(note.id).toBe(test_note.id);
    });
});


describe('POST /notes', function () {
    test('Creates a new note', async function () {
        const res = await request(app).post('/api/notes').send({
            date: '01-02-2023',
            content: 'Can I make a new note?',
            emp_id: 4001
        }).set('Authorization', token);
        const note = res.body.note;
        expect(res.statusCode).toBe(201);
        expect(note).toHaveProperty('id');
        expect(note).toHaveProperty('date');
        expect(note).toHaveProperty('content');
    });
});


describe('PATCH /notes/:id', function () {
    test('Updates a note', async function () {
        const res = await request(app).patch(`/api/notes/${test_note.id}`).send({
            date: '01-02-2023',
            content: 'Updated content?',
            emp_id: 4001
        }).set('Authorization', token);
        const note = res.body.note;
        expect(note).toHaveProperty('id');
        expect(note.content).toBe('Updated content?');
    });
});


describe('DELETE /notes/:id', function () {
    test('Delete note', async function () {
        const res = await request(app).delete(`/api/notes/${test_note.id}`).set('Authorization', token);
        expect(res.body).toEqual({message: 'Note deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM NOTES');
});
  
  
afterAll(async function () {
    await db.query('DELETE FROM EMPLOYEES');
    await db.end()
});