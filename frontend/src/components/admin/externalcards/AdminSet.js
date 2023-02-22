import React from "react";

import "../../../css/admin/adminset.css";

const AdminSet = ({ set, handleClick, active }) => {


    const className = active === set.setId ? "AdminSet AdminSet-active" : "AdminSet AdminSet-inactive"

    return <div className={className} onClick={() => handleClick(set.setId)}>
        <span>{set.setName}</span>
    </div>
};

export default AdminSet;