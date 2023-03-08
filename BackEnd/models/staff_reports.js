const db = require("../db");
const ExpressError = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class StaffReports {
    static async get(id) {
        const result = await db.query(
            `SELECT s.id,
                s.date,
                s.server,
                s.section,
                s.guests_served,
                s.total_sales,
                s.entered_by
            FROM staff_reports AS s 
                JOIN employees AS e ON s.entered_by = e.employee_id
            WHERE s.id = $1`,
            [id]);

        const staff_report = result.rows[0];

        if (!staff_report) throw new ExpressError(`No staff report with id ${id}`);

        return staff_report;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT s.id,
                s.date,
                s.server,
                s.section,
                s.guests_served,
                s.total_sales, 
                s.entered_by
            FROM staff_reports AS s
                JOIN employees AS e ON s.entered_by = e.employee_id
            ORDER BY id`);
    
        return result.rows;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO staff_reports
                (date, server, section, guests_served, total_sales, entered_by)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, date, server, section, guests_served, total_sales, entered_by`,
            [data.date,
            data.server,
            data.section,
            data.guests_served,
            data.total_sales,
            data.entered_by],
        );
        const staff_report = result.rows[0];

        return staff_report;
    }

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
              id: "id",
              date: "date",
              server: "server",
              section: "section",
              guests_served: "guests_served",
              total_sales: "total_sales",
              entered_by: "entered_by"
            });
        const idVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE staff_reports
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    date,
                                    server,
                                    section,
                                    guests_served,
                                    total_sales,
                                    entered_by`;
        const result = await db.query(querySql, [...values, id]);
        const staff_report = result.rows[0];
    
        if (!staff_report) throw new ExpressError(`No staff report ${id}`);
    
        return staff_report;
    }

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM staff_reports
                WHERE id = $1 
                RETURNING id`,
            [id]);

        const staff_report = result.rows[0];

        if (!staff_report) throw new ExpressError(`No staff report with id ${id}`);
    }
}


module.exports = StaffReports;