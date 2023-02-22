import { useState } from "react";

const useFields = (state) => {
    const [formData, setFormData] = useState(state);

    const handleChange = evt => {
        setFormData(formData => ({
            ...formData,
            [evt.target.name]: evt.target.value
        }))
    }
    return [formData, handleChange, setFormData];
};

export default useFields;