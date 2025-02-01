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
    const [selecting, setSelecting] = useState(false)
    client.GetCategories()
    .then(cats => {
        if(!areSame(cats, categories)) {
            setCategories(cats)
        }
        const matchedCategory = categories.find(c => c.id === categoryId)
        if(matchedCategory) {
            setFilterText(matchedCategory.name)
        }
    })
    const [filterText, setFilterText] = useState("")
    const matchedCategory = categories.find(c => c.id === categoryId)
    const categoryName = matchedCategory?.name ?? "Uncategorized"
    const cats: Category[] = [
        new Category(0, "Uncategorized"),
        ... categories
    ].filter(c => c.name.indexOf(filterText) !== -1)

    console.log("cats = " + cats.map(c => c.name).join(","))
     
    return <div data-testid="category-control">
        {!selecting?<label>
            Category
            <a href="#" onClick={e => {
                e.preventDefault()
                setSelecting(true)
            }}>
                {categoryName}
            </a>
        </label>
        : <div><label>
            Category
            <input type="text" 
                value={filterText}
                onChange={(e) => {
                    const newFilterText = e.target.value
                    setFilterText(newFilterText)
                }}
                placeholder="Uncategorized" 
                />
        </label>
        {cats.map(c => <a href="#" onClick={() => {
            const newCatId = c.id
            onChange(newCatId)
        }}>{c.name}</a>)}
        </div>
        }
    </div>
}