
export const Button = ({ type, className, text, icon, onClick }) => {
    return (
        <button type={type} className={className} onClick={onClick} > {icon ? icon : text} </button>
    )
}