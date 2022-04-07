import React, {useState} from "react";
import PropTypes from "prop-types";

// custom hook
function useInputValue(defaultValue = "") {
    const [value, setValue] = useState(defaultValue)
    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(""),
        value: () => value
    }
}

function AddTodo({ onCreate }) {
    const input = useInputValue("")

    function submitHandler(event) {
        // Для того, чтобы страница не обновлялась
        event.preventDefault()
        if (input.bind.value.trim()) {
            onCreate(input.bind.value)
            input.clear()
        }
    }

    //  <input value={value} onChange={event => setValue(event.target.value)}/> == {...input} (оператор spread)
    return (
        <form style={{marginTop: "1rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between"}}
              onSubmit={submitHandler}>
            <input {...input.bind} style={{display: "flex", flexGrow: "1"}}/>
            &nbsp;
            <button type="submit" className="add">&oplus;</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;