import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState } from "../atoms";

export const CATEGORY_STORAGE = "category"

interface IForm {
    category: string;
}

function CategoryForm(){
    const [cats, setCats] = useRecoilState(categoriesState)
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<IForm>()
    function onSubmit({category}: IForm){
        const newCats = [{text: category, id: Date.now()}, ...cats]
        localStorage.setItem(CATEGORY_STORAGE, JSON.stringify(newCats))
        setCats(newCats)
        setValue("category", "")
    }
    return (
        <div>
            <form style={{display: "flex", flexDirection: "column", width: "200px", margin: "30px auto"}} onSubmit={handleSubmit(onSubmit)}>
                <input {...register("category", {required: "Please write a category."})} placeholder="Add a category" />
            <span>{errors.category?.message}</span>
                <button> Add </button>
            </form>
        </div>
    );
}

export default CategoryForm;