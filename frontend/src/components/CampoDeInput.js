function CampoDeInput({ label, type, id, value, onChange, required, errorMsg }) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input 
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            />
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
        </div>
    )
}

export default CampoDeInput