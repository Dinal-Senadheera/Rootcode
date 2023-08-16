import { useEffect, useState } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"

//components
import ExpensesDetails from '../components/expensesDetails'
import ExpenseForm from '../components/expenseForm'


const Home = () => {
    const {expenses, dispatch} = useExpensesContext()
    const [Category, setCategory] = useState("")
    const [Form, setForm] = useState(true)


    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await fetch('/api/expenses')
            const json = await response.json()

            if (response.ok) {
                
                dispatch({type: 'SET_EXPENSES', payload: json})
                if(Category) {
                    dispatch({type: 'FILTER_EXPENSES', cat: Category})
                } 
                  
            }
        }

        fetchExpenses();
        
    }, [dispatch, Category])
    
    return (
        <div>
        <select
            type="text"
            onChange={(e) => {
                setCategory(e.target.value);
            }}
            value={Category}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Household">Household</option>
            <option value="Health">Health</option>
            <option value="Social Life"> Social Life</option>
            <option value="Miscellaneous">Miscellaneous</option>
        </select>
        {/* <button onClick={setForm(true)}>Create Expense</button>  */}
        <div className="home">
            <div className="expenses">
                {expenses && expenses.map((expense) => (
                    <ExpensesDetails key={expense._id} expense={expense} />
                ))}
            </div>{Form && <ExpenseForm/>}

        </div>
        </div>
    )
}

export default Home