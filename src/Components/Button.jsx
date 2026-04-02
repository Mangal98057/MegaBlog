function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} hover:opacity-90 transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button