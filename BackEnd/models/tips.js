const db = require("../db");
const ExpressError = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Tips {
    static async get(id) {
        const result = await db.query(
            `SELECT t.id,
                t.date,
                t.total_sales,
                t.tip_percentage,
                t.total_tips,
                e.first_name,
                e.last_name
            FROM tips AS t 
                JOIN employees AS e ON t.entered_by = e.employee_id
            WHERE t.id = $1`,
            [id]);

        const tip = result.rows[0];

        if (!tip) throw new ExpressError(`No tip with id ${id}`);

        return tip;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT t.id,
                t.date,
                t.total_sales,
                t.tip_percentage,
                t.total_tips,
                e.first_name,
                e.last_name
            FROM tips AS t
                JOIN employees AS e ON t.entered_by = employee_id
            ORDER BY id`);
    
        return result.rows;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO tips
                (date, total_sales, tip_percentage, total_tips, entered_by)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, date, total_sales, tip_percentage, total_tips, entered_by`,
            [data.date,
            data.total_sales,
            data.tip_percentage,
            data.total_tips,
            data.entered_by],
        );
        const tip = result.rows[0];

        return tip;
    }

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
              id: "id",
              date: "date",
              total_sales: "total_sales",
              tip_percentage: "tip_percentage",
              total_tips: "total_tips",
              entered_by: "entered_by"
            });
        const idVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE tips
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    date,
                                    total_sales,
                                    tip_percentage,
                                    total_tips,
                                    entered_by`;
        const result = await db.query(querySql, [...values, id]);
        const tip = result.rows[0];
    
        if (!tip) throw new ExpressError(`No tip with id ${id}`);
    
        return tip;
    }

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM tips
                WHERE id = $1 
                RETURNING id`,
            [id]);

        const tip = result.rows[0];

        if (!tip) throw new ExpressError(`No tip with id ${id}`);
    }
}


module.exports = Tips;