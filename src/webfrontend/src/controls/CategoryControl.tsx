import { useState } from "react"
import { Category } from "../api/Category"
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
    client.GetCategories()
    .then(cats => {
        if(!areSame(cats, categories)) {
            setCategories(cats)
        }
    })
    return <label>
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
}