const db = require("../db");
const ExpressError = require("../expressError");


class Incidents {
    static async get(id) {
        const result = await db.query(
            `SELECT i.id,
                i.date,
                i.description,
                e.first_name,
                e.last_name
            FROM incidents AS i 
                JOIN employees AS e ON i.entered_by = e.employee_id
            WHERE i.id = $1`,
            [id]);

        const incident = result.rows[0];

        if (!incident) throw new ExpressError(`No incident with id ${id}`);

        return incident;
    }

    static async getAll() {
        const result = await db.query(
            `SELECT i.id,
                i.date,
                i.severity,
                i.reporting_manager,
                i.witness,
                i.description,
                e.first_name,
                e.last_name
            FROM incidents AS i
                JOIN employees AS e ON i.entered_by = employee_id
            ORDER BY id`);
    
        return result.rows;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO incidents
                (date, severity, reporting_manager, witness, description, entered_by)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, date, severity, reporting_manager, witness, description, entered_by`,
            [data.date,
            data.severity,
            data.reporting_manager,
            data.witness,
            data.description,
            data.entered_by],
        );
        const incident = result.rows[0];

        return incident;
    }

    static async update(id, data) {
        const result = await db.query(
            `UPDATE incidents
               SET severity = $1, 
                reporting_manager = $2,
                witness = $3,
                description = $4
               WHERE id = $5
               RETURNING id, date, severity, reporting_manager, witness, description, entered_by`,
            [data, id]);

            const incident = result.rows[0];
    
            if (!incident) throw new ExpressError(`No incident with id ${id}`);

            return incident;
    }

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM incidents
                WHERE id = $1 
                RETURNING id`,
            [id]);

        const incident = result.rows[0];

        if (!incident) throw new ExpressError(`No incident with id ${id}`);
    }
}


module.exports = Incidents;