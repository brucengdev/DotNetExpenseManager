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
        <label>
            Category
            <select value={categoryId} onChange={(e) => { 
                    const newCatId = parseInt(e.target.value)
                    onChange(newCatId)
                }}>
                <option data-testid="category-option" value="0">
                    Uncategorized
                </option>
                {categories.map(cat => 
                    <option data-testid="category-option" 
                        value={cat.id}
                        >
                        {cat.name}
                    </option>)
                }
            </select>
        </label>
    </div>
}