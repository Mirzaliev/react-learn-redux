import './App.css'
import User from "./modules/users/user";
import Counter from "./modules/counters/counter";


function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Counter counterId="one"/>
      <Counter counterId="two"/>
      <Counter counterId="free"/>
      <User />
      <User />
    </div>
  )
}

export default App
