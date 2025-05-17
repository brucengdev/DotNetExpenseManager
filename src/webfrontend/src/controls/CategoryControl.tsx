import { useState } from "react"
import { Category } from "../models/Category"
import { IClient } from "../api/Client"
import { areSame } from "../utils"

interface CategoryControlProps {
    client: IClient
    categoryId: number | undefined
    onChange: (newCatId: number) => void
}

export function CategoryControl(props: CategoryControlProps) {
    const { client, categoryId, onChange } = props
    const [categories, setCategories] = useState([] as Category[])
    const [selecting, setSelecting] = useState(false)
    reloadCategories(client, categories, setCategories)
    const [filterText, setFilterText] = useState("")
    const matchedCategory = categories.find(c => c.id === categoryId)
    const categoryName = matchedCategory?.name ?? "Uncategorized"
    const cats: Category[] = [
        new Category(0, "Uncategorized"),
        ... categories
    ].filter(c => c.name.indexOf(filterText) !== -1)

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
                className="form-control"
                value={filterText}
                onChange={(e) => {
                    const newFilterText = e.target.value
                    setFilterText(newFilterText)
                }}
                placeholder="Uncategorized" 
                />
        </label>
        {
            cats.length > 0
            ?
            <ul className="list-group">
                {cats.map(c => 
                        <a 
                            className="list-group-item"
                            href="#" onClick={() => {
                            const newCatId = c.id
                            onChange(newCatId)
                            setSelecting(false)
                        }}>
                            {c.name}
                        </a>)
                }
            </ul>
            :<button 
                className="btn btn-primary"
                onClick={() => {
                    client.AddCategory(filterText)
                    .then(succeeded => {
                        if(succeeded) {
                            setFilterText("")
                        }
                    })
            }}>+</button>
        }
        </div>
        }
    </div>
}

function reloadCategories(client: IClient, currentCats: Category[], setCategories: (cats: Category[]) => void) {
    client.GetCategories()
        .then(cats => {
            if (!areSame(cats, currentCats)) {
                setCategories(cats)
            }
        })
}
