const db = require("../db");
const ExpressError = require("../expressError");


class Notes {
    static async get(id) {
        const result = await db.query(
            `SELECT n.id,
                n.date,
                n.content,
                e.first_name,
                e.last_name
            FROM notes AS n 
                JOIN employees AS e ON n.emp_id = e.employee_id
            WHERE n.id = $1`,
            [id]);

        const note = result.rows[0];

        if (!note) throw new ExpressError(`No note with id ${id}`);

        return note;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT n.id,
                n.date,
                n.content,
                e.first_name,
                e.last_name
            FROM notes AS n
                JOIN employees AS e ON n.emp_id = employee_id
            ORDER BY id`);
    
        return result.rows;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO notes
                (date, content, emp_id)
                VALUES ($1, $2, $3)
                RETURNING id, date, content, emp_id`,
            [data.date,
            data.content,
            data.emp_id],
        );
        const note = result.rows[0];

        return note;
    }

    static async update(id, data) {
        const result = await db.query(
            `UPDATE notes
               SET content = $1
               WHERE id = $2
               RETURNING id, date, content, emp_id`,
            [data, id]);

            const note = result.rows[0];
    
            if (!note) throw new ExpressError(`No note with id ${id}`);

            return note;
    }

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM notes
                WHERE id = $1 
                RETURNING id`,
            [id]);

        const note = result.rows[0];

        if (!note) throw new ExpressError(`No note with id ${id}`);
    }
}


module.exports = Notes;
