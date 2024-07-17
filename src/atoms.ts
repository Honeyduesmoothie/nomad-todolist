import { atom, selector } from "recoil";


export interface ITodo {
  text: string;
  id: number;
  category: string;
}

export interface ICategory {
  text: string;
  id: number;
}


export  const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: []
})

export const categoriesState = atom<ICategory[]>({
  key: "categories", 
  default: []
}) 

  export const categoryState =atom<ITodo['category']>({
    key: "category",
    default: ""
  })

  export const showCategories = atom({
    key: "showCategories",
    default: false
  })

 export const filteredToDoState = selector({
    key: "filteredTodoList",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState)
        return  toDos.filter(toDo => toDo.category === category)
    }
  })

