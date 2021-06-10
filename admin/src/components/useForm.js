
const UseForm = ({children, ...other}) => {

    return(
        <form {...other}>
            {children}
        </form>
    )
}

export default UseForm;