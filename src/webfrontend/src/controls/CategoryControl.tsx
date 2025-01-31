import { useState } from "react"
import { Category } from "../models/Category"
import { IClient } from "../api/Client"
import { areSame } from "../utils"

interface CategoryControlProps {
    client: IClient
    categoryId: number
    onChange: (newCatId: number) => void
}

export function CategoryControl(props: CategoryControlProps) {
    const { client, categoryId, onChange } = props
    const [categories, setCategories] = useState([] as Category[])
    const [focused, setFocused] = useState(false)
    client.GetCategories()
    .then(cats => {
        if(!areSame(cats, categories)) {
            setCategories(cats)
        }
    })
    const cats: Category[] = [
        new Category(0, "Uncategorized"),
        ... categories
    ]
    const matchedCategory = cats.find(c => c.id === categoryId)
    const categoryName = categoryId === 0? "": matchedCategory?.name ?? ""
    return <div data-testid="category-control">
        <label>
            Category
            <input type="text" 
                value={categoryName}
                placeholder="Uncategorized" 
                onFocus={() => setFocused(true)} />
        </label>
        {focused
            ? cats.map(c => <a href="#" onClick={() => {
                const newCatId = c.id
                onChange(newCatId)
            }}>{c.name}</a>)
            :<></>}
    </div>
}