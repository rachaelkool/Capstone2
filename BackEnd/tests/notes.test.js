process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let test_note;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO
            notes (id, date, content, emp_id)
            VALUES(
            3,
            '01-01-2023',
            'hello note',
            3001)
            RETURNING id`);
    test_note = result.rows[0].id
});


describe('GET /notes', function () {
    test('Gets all notes', async function () {
        const res = await request(app).get('/notes');
        const notes = res.body.notes;
        expect(notes).toHaveLength(1);
        expect(notes[0]).toHaveProperty('id');
        expect(notes[0]).toHaveProperty('date');
        expect(notes[0]).toHaveProperty('content');
    });
});


describe('GET /notes/:id', function () {
    test('Gets a note with particular id', async function () {
        const res = await request(app).get(`/notes/${test_note.id}`)
        const note = res.body.note;
        expect(note).toHaveProperty('id');
        expect(note.id).toBe(test_note.id);
    });
    test('Responds with 404 if no note with that id', async function () {
      const res = await request(app).get('/notes/234')
      expect(res.statusCode).toBe(404);
    });
});


describe('POST /notes', function () {
    test('Creates a new note', async function () {
        const res = await request(app).post('/notes').send({
            id: 4,
            date: '01-02-2023',
            content: 'Can I make a new note?',
            emp_id: 4001
        });
        const note = res.body.note;
        expect(res.statusCode).toBe(201);
        expect(note).toHaveProperty('id');
        expect(note).toHaveProperty('date');
        expect(note).toHaveProperty('content');
    });
});


describe('PATCH /notes/:id', function () {
    test('Updates a note', async function () {
        const res = await request(app).put(`/notes/${test_note.id}`).send({
            date: '01-02-2023',
            content: 'Updated content?',
            emp_id: 3001
        });
        const note = res.body.note;
        expect(note).toHaveProperty('id');
        expect(note.content).toBe('Updated content?');
    });
});


describe('DELETE /notes/:id', function () {
    test('Delete note', async function () {
        const res = await request(app).delete(`/notes/${test_note.id}`)
        expect(res.body).toEqual({message: 'Note deleted'});
    });
});


afterEach(async function () {
    await db.query('DELETE FROM NOTES');
});
  
  
afterAll(async function () {
    await db.end()
});