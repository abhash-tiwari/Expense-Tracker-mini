import react, {useState, useEffect} from 'react';
import styles from './dashboard.module.css'


export default function Dashboard(){
    // const[balance,setBalance] = useState(5000)
    const[showIncomeAdd,setShowIncomeAdd] = useState(false)
    const[incomeAmount,setIncomeAmount] = useState('')
    
    const addIncome = () => {
        setShowIncomeAdd(true)
    }
    const handleIncomeAdd = (e) => {
        setIncomeAmount(Number(e.target.value))
        // SetBalance(prevBalance => prevBalance + incomeAmount)
    }
    const submitIncome = (e)=> {
        e.preventDefault();
        console.log("Income Amount:", incomeAmount); // Debugging
        const income = parseInt(incomeAmount);
        console.log("Parsed Income:", income); // Debugging
        
            setBalance(prevBalance => prevBalance + income);
            setShowIncomeAdd(false);
            setIncomeAmount('');
        
    }


    // expense functionality
    const[showExpense,setShowExpense] = useState(false)
    // const[expense,setExpense]= useState([])
    const [expenseName, setExpenseName] = useState('');
    const[expenseAmount,setExpenseAmount]= useState("")
    const addExpense =() => {
        setShowExpense(true)
    }
    const handleAddExpense = (e) => {
        // const value = e.target.value;
        // setExpense(prevExpense => {
        //     console.log(value, "expense value");
        //     return value;
        // });
        setExpenseName(e.target.value);
    }
    const expenseAddAmount = (e) => {
        // const newExpenseAmount = Number(e.target.value);
        // setExpenseAmount(newExpenseAmount);
        // console.log(newExpenseAmount, "expensed");
        setExpenseAmount(Number(e.target.value));
        //tip : always store values in variable first then set them 
    }
    const submitExpense = (e) => {
        e.preventDefault()
        const newExpense = {
            name: expenseName,
            amount: expenseAmount
        };
        setExpense(prevExpense => [...prevExpense, newExpense]);
        setShowExpense(false);
        setExpenseName('');
        setExpenseAmount('');
        setBalance(prevBalance => prevBalance - expenseAmount);
        console.log(`${expense} and ${expenseAmount}`)
        // setBalance(prevBalance => prevBalance - expenseAmount)
    }






    // now the localstorage functionality
    // I have commented out 2 states because I want to store that into the localstorage so here is the updated state
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem('balance');
        return savedBalance ? parseInt(savedBalance) : 5000;
    });
    const [expense, setExpense] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    useEffect(() => {
        localStorage.setItem('balance', balance);
    }, [balance]);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expense));
    }, [expense]);
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wallet}>
                <h3>Wallet Balance: {balance}</h3>
                <button onClick={addIncome} className={styles.btn}>+Add Income</button>
            </div>
                 <div className={styles.wallet}>
                 <h3>Expenses</h3>
                <button onClick={addExpense} className={styles.btns}>+Add Expense</button>
               </div>
            </div>
            {showIncomeAdd && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                    <form action="submit" onSubmit={submitIncome}>
                    <input type="number" value={incomeAmount} onChange={handleIncomeAdd} placeholder='Add Income Amount' />
                    <button type='submit'>Submit</button>
                    <button type='button'>Cancel</button>
                    </form>
                    </div>
                    
                
                </div>
                
            )}
            {showExpense && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                    <form action="submit" onSubmit={submitExpense}>
                <input value={expenseName} type='input' onChange={handleAddExpense} placeholder="Expense Name" />
                <input value={expenseAmount} type='number' onChange={expenseAddAmount} placeholder="Expense Amount"/>
                <button type='submit'>Submit</button>
                <button type='button'>Cancel</button>
            </form>
                    </div>
                </div>
                
            )}
             <div>
             <h4>Recent Transactions</h4>
                {expense.map((exp, index) => (
                    <div>
                    
                    <div key={index} className={styles.transactions}>
                        <p>{exp.name}: {exp.amount}Rs</p>
                    </div>
                    </div>
                ))}
            </div>
        
        </div>
        
    )
}