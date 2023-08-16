import { useState } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"

const ExpenseForm = () => {
    const { dispatch } = useExpensesContext()
    
    const [Title, setTitle] = useState('')
    const [Category, setCategory] = useState('')
    const [Description, setDescription] = useState('')
    const [Amount, setAmount] = useState('')
    const [ExpenseDate, setExpenseDate] = useState('')
    const [error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([]) 
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const expense = { Title, Category, Description, Amount, ExpenseDate }

        const response = await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            console.log('New expense added', json)
            dispatch({type: 'CREATE_EXPENSE', payload: json})
        }
    }

    return (
        <form className = "create" onSubmit={handleSubmit}>
            <h3>Add a New Expense</h3>

            <label>Expense Title: </label>
            <input 
                type = "text"
                onChange={(e) => setTitle(e.target.value)}
                value={Title}
                className={emptyFields.includes('Title') ? 'error' : ''}
            />

            <label>Category: </label>
            <select
            type="text"
            onChange={(e) => {
                setCategory(e.target.value);
            }}
            value={Category}
            className={emptyFields.includes('Category') ? 'error' : ''}
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Household">Household</option>
            <option value="Health">Health</option>
            <option value="Social Life"> Social Life</option>
            <option value="Miscellaneous">Miscellaneous</option>
        </select>

            <label>Description: </label>
            <input 
                type = "text"
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
            />

            <label>Amount: </label>
            <input 
                type = "number"
                onChange={(e) => setAmount(e.target.value)}
                value={Amount}
                className={emptyFields.includes('Amount') ? 'error' : ''}

            />

            <label>Expense Date: </label>
            <input 
                type = "date"
                onChange={(e) => setExpenseDate(e.target.value)}
                value={ExpenseDate}
                className={emptyFields.includes('ExpenseDate') ? 'error' : ''}

            />

            <button>Add expense</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ExpenseForm