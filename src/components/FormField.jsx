const FormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}) => {
  const inputId = `field-${name}`

  return (
    <label className="field" htmlFor={inputId}>
      <span className="field-label">{label}</span>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  )
}

export default FormField
