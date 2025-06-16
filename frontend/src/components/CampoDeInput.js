import React from "react"

const CampoDeInput = React.forwardRef(({ label, type, id, value, onChange, required, errorMsg, className }, ref) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input 
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            className={className}
            ref={ref}
            />
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
        </div>
    )
})

export default CampoDeInput