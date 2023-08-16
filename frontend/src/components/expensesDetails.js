import {  useExpensesContext } from "../hooks/useExpensesContext";
import Swal from "sweetalert2";

const ExpenseDetails = ({ expense }) => {
    const {dispatch} = useExpensesContext()

    const handleClick = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: "alerts",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch('/api/expenses/' + expense._id, {
                    method: 'DELETE'
                })
                const json = await response.json()
        
                if(response.ok) {
                    dispatch({type: 'DELETE_EXPENSE', payload:json})
                    Swal.fire({
                        title: "Success",
                        text: "Successfully Deleted Category",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                      })
                } 
            }
          });
        
    }

    return(
        <div className="expense-details">
            <h4>{expense.Title}</h4>
            <p><strong>Category : </strong>{expense.Category}</p>
            {expense.Description && <p><strong>Description : </strong>{expense.Description}</p>}
            <p><strong>Amount(LKR) : </strong>{expense.Amount}</p>
            <p>Expense Date: {expense.ExpenseDate}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default ExpenseDetails