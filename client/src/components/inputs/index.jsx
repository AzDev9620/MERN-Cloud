import React from 'react'
import "./style.scss";
export default function InputsCustoms(props) {
    return (
        <>
            <input onChange={(event) => props.setValue(event.target.value)}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder} />
        </>
    )
}
