const db = require("../db");
const ExpressError = require("../expressError");
// const {sqlForPartialUpdate} = require('../helpers/sql');


class Notes {

    static async get(id) {
        const result = await db.query(
            `SELECT id,
                content
                FROM notes
                WHERE id = $1`,
            [id]);

        const note = result.rows[0];

        if (!note) throw new ExpressError(`No note with id ${id}`);

        return note;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT id,
                content
                FROM notes
                ORDER BY id`,
        );
    
        return result.rows;
    }

    static async create({content}) {
        const result = await db.query(
            `INSERT INTO notes
                (content)
                VALUES ($1)
                RETURNING id, content`,
            [content],
        );
        const note = result.rows[0];

        return note;
    }

    static async update(id, data) {
        // const { setCols, values } = sqlForPartialUpdate(
        //     data,
        //     {});
        // const idVarIdx = "$" + (values.length + 1);
    
        // const querySql = `UPDATE notes 
        //                   SET ${setCols} 
        //                   WHERE id = ${idVarIdx} 
        //                   RETURNING id, content`;
        // const result = await db.query(querySql, [...values, id]);
        // const note = result.rows[0];
    
        // if (!note) throw new ExpressError(`No note with id ${id}`);
    
        // return note;


        const result = await db.query(
            `UPDATE notes
               SET content = $1
               WHERE id = $2
               RETURNING id, content`,
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
    
        // if (result.rows.length === 0) {
        //   throw { message: `There is no book with an isbn '${isbn}`, status: 404 }
        // }
      }
}


module.exports = Notes;
