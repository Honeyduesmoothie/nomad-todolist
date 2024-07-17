import { useRecoilState, useSetRecoilState } from "recoil"
import { categoriesState, ICategory, ITodo, toDoState } from "../atoms"
import { TO_DO_STORAGE } from "./ToDoForm"




function ToDoList({text, category, id}: ITodo){
//     console.log(category)
    // const [toDos, setToDos] = useRecoilState(toDoState)
    // const onClick = (cat: ITodo["category"]) => {
    //     const targetIndex = toDos.findIndex((todo) => todo.id === id)
    //     const newToDo = {text, id, category: cat}
    //     const newToDos = [...toDos.slice(0, targetIndex), newToDo, ...toDos.slice(targetIndex +1) ]
    //     setToDos(newToDos)
    // }



    const [toDos, setToDos] = useRecoilState(toDoState)
    const [cats, setCats] = useRecoilState(categoriesState)
    console.log(toDos)
    const onClick = (cat: string) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((todo) => todo.id === id)
            const newToDos = [...oldToDos.slice(0, targetIndex), {text, id, category: cat}, ...oldToDos.slice(targetIndex +1) ]
            localStorage.setItem(TO_DO_STORAGE, JSON.stringify(newToDos))
            return  newToDos;
        })
        
    }
    const removeTodo = () => {
        const newToDos = toDos.filter((todo)=> todo.id !== id)
        localStorage.setItem(TO_DO_STORAGE, JSON.stringify(newToDos))
        setToDos(newToDos)
    }
    return (
        <li>
            <span>{text}</span>
            {cats?.map(cat => category !== cat.text && <button key={cat.id} onClick={()=> onClick(cat.text)}>{cat.text}</button>)}
            <button onClick={removeTodo} style={{color:"red"}}>X</button>
        </li>
    ) 
}

export default ToDoList