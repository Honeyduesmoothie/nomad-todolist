import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ToDoForm, { TO_DO_STORAGE } from "./ToDoForm";
import {  categoriesState, categoryState, filteredToDoState, ICategory, ITodo, showCategories, toDoState } from "../atoms";
import CategoryForm, { CATEGORY_STORAGE } from "./CategoryForm";
import ToDoList from "./ToDoList";
import { useEffect } from "react";




const ToDos = () => {
  const setAllTodos = useSetRecoilState(toDoState)
  const [cats, setCats] = useRecoilState(categoriesState)
  useEffect(()=>{
   const storageTodos = localStorage.getItem(TO_DO_STORAGE)
   const allToDos:ITodo[] = storageTodos? JSON.parse(storageTodos) : [];
    setAllTodos(allToDos);
  const storageCats = localStorage.getItem(CATEGORY_STORAGE)
  const allCats:ICategory[] = storageCats? JSON.parse(storageCats) : [];
  setCats(allCats)
 }, [setAllTodos, setCats])
  const toDos = useRecoilValue(filteredToDoState)
  console.log(toDos)
  const [category, setCategory] = useRecoilState(categoryState);
  const [showCats, setShowCats] = useRecoilState(showCategories)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {currentTarget: {value}} = event;
    setCategory(value)
  }
  const toggleShowCats = () => {
    setShowCats((current) => !current)
  }
  const removeCat = (editingCat: ICategory) => {
    const newCats =  cats.filter((cat) => cat.id !== editingCat.id)
    localStorage.setItem(CATEGORY_STORAGE, JSON.stringify(newCats))
    setCats(newCats)
  }
  
  return (
    <>
    <h1> To Dos</h1>
    <select value={category} onInput={onInput}> 
      {cats?.map(cat=> <option key={cat.id} value={cat.text}>{cat.text}</option>)}
    </select>
 
   <ToDoForm />
   <CategoryForm />
   <div style={{ marginBottom: "20px"}}>
   <h3 style={{color: "orange"}}>To dos</h3>
   <ul>
    {toDos.map(toDo => <ToDoList key={toDo.id} {...toDo} />)}
   </ul>
   </div>
   <div>
    <button onClick={toggleShowCats}>Show all categories</button>
    <ul>
    {showCats === false? "" : cats?.map((cat) => 
      <li><span>{cat.text}</span><button onClick={()=>removeCat(cat)} style={{color:"red"}}>X</button></li>)}
    </ul>
   </div>
    </>
  );
};

export default ToDos