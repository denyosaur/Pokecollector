import React, { useState } from "react";

import AdminSet from "./AdminSet";

import "../../../css/admin/adminsetscolumn.css";

const AdminSetsColumn = ({ cardSets, setSelectedSet }) => {
    const [active, setActive] = useState("");

    function handleClick(id) {
        setSelectedSet(id);
        setActive(id);
    };

    return <div className="AdminSetsColumn">
        {cardSets.map(set => {
            return <AdminSet set={set} handleClick={handleClick} key={set.setId} active={active} />
        })}
    </div>
};

export default AdminSetsColumn;