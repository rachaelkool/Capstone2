const db = require("../db");
const ExpressError = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class AttendanceReports {
    static async get(id) {
        const result = await db.query(
            `SELECT a.id,
                a.date,
                a.emp_id,
                a.sick_time,
                a.tardy,
                a.no_show, 
                a.entered_by
            FROM employee_attendance_reports AS a 
                JOIN employees AS e ON a.entered_by = e.employee_id
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
                a.emp_id,
                a.sick_time,
                a.tardy,
                a.no_show, 
                a.entered_by
            FROM employee_attendance_reports AS a
                JOIN employees AS e ON a.entered_by = e.employee_id
            ORDER BY id`);
    
        return result.rows;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO employee_attendance_reports
                (date, emp_id, sick_time, tardy, no_show, entered_by)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, date, emp_id, sick_time, tardy, no_show, entered_by`,
            [data.date,
            data.emp_id,
            data.sick_time,
            data.tardy,
            data.no_show,
            data.entered_by],
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
              emp_id: "emp_id",
              sick_time: "sick_time",
              tardy: "tardy",
              no_show: "no_show",
              entered_by: "entered_by"
            });
        const idVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE employee_attendance_reports
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    date,
                                    emp_id,
                                    sick_time,
                                    tardy,
                                    no_show,
                                    entered_by`;
        const result = await db.query(querySql, [...values, id]);
        const attendance_report = result.rows[0];
    
        if (!attendance_report) throw new ExpressError(`No attendance report ${id}`);
    
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