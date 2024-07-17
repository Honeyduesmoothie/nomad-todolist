import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { categoryState, filteredToDoState, ITodo, toDoState } from "../atoms"
import { useForm } from "react-hook-form"

interface IForm {
    toDo: string;
}

export const TO_DO_STORAGE = "toDoList"

function ToDoForm(){
    const {register, handleSubmit, setValue, formState: {errors}} =  useForm<IForm>()
    const [toDos, setToDos] = useRecoilState<ITodo[]>(toDoState);
    const category = useRecoilValue(categoryState)
    console.log(category)
    const onSubmit = ({toDo}: IForm) => {
      const newTodos = [{text: toDo, id: Date.now(), category}, ...toDos]
      localStorage.setItem(TO_DO_STORAGE, JSON.stringify(newTodos))
        setToDos(newTodos)
        setValue("toDo", "")
      }
    return (
        <form style={{display: "flex", flexDirection: "column", width: "200px", margin: "30px auto"}} onSubmit={handleSubmit(onSubmit)} >
        <input {...register("toDo", {required: "Please write your to do."})} placeholder="Write a to do." />
        
          <span>{errors.toDo?.message}</span>
        <button>
          Add
        </button>
      </form>
    )
}

export default ToDoForm