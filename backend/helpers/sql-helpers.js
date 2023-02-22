const { BadRequestError } = require("../expressErrors");

function sqlForPartialUpdate(updateData, jsToSql) {
    const keys = Object.keys(updateData);
    if (keys.length === 0) throw new BadRequestError("No Data");

    const cols = keys.map((col, idx) =>
        `"${jsToSql[col] || col}"=$${idx + 1}`,
    );

    return {
        setCols: cols.join(", "),
        values: Object.values(updateData)
    };
};

module.exports = { sqlForPartialUpdate };