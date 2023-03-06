const db = require("../db");
const ExpressError = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class AttendanceReports {
    static async get(id) {
        const result = await db.query(
            `SELECT a.id,
                a.date,
                a.sick_time,
                a.tardy,
                a.no_show,
                e.first_name,
                e.last_name
            FROM employee_attendance_reports AS a 
                JOIN employees AS e ON a.emp_id = e.employee_id
            WHERE a.id = $1`,
            [id]);

        const attendance_report = result.rows[0];

        if (!attendance_report) throw new ExpressError(`No attendance report with id ${id}`);

        return attendance_report;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT a.id,
                a.date,
                a.sick_time,
                a.tardy,
                a.no_show,
                e.first_name,
                e.last_name
            FROM employee_attendance_reports AS a
                JOIN employees AS e ON a.emp_id = e.employee_id
            ORDER BY id`);
    
        return result.rows;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO employee_attendance_reports
                (date, sick_time, tardy, no_show, emp_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, date, sick_time, tardy, no_show, emp_id`,
            [data.date,
            data.sick_time,
            data.tardy,
            data.no_show,
            data.enmp_id],
        );
        const attendance_report = result.rows[0];

        return attendance_report;
    }

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
              id: "id",
              date: "date",
              sick_time: "sick_time",
              tardy: "tardy",
              no_show: "no_show",
              emp_id: "emp_id"
            });
        const idVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE employee_attendance_reports
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    date,
                                    sick_time,
                                    tardy,
                                    no_show,
                                    entered_by`;
        const result = await db.query(querySql, [...values, id]);
        const attendance_report = result.rows[0];
    
        if (!attendance_report) throw new expressError(`No attendance report ${id}`);
    
        return attendance_report;
    }

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM employee_attendance_reports
                WHERE id = $1 
                RETURNING id`,
            [id]);

        const attendance_report = result.rows[0];

        if (!attendance_report) throw new ExpressError(`No attendance report with id ${id}`);
    }
}


module.exports = AttendanceReports;