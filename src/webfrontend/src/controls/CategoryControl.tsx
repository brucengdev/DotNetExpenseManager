import { useState } from "react"
import { Category } from "../models/Category"
import { IClient } from "../api/Client"
import { areSame } from "../utils"
import { TextBox } from "./TextBox"
import { Button, ButtonMode } from "./Button"

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
        {!selecting?
        <div>
            <label htmlFor="categoryName" className="block text-sm/6 font-semibold text-gray-900">
                Category
            </label>
            <div className="mt-2.5 mb-2.5">
                <a 
                    className="block"
                    id="categoryName"
                    href="#" onClick={e => {
                    e.preventDefault()
                    setSelecting(true)
                }}>
                    {categoryName}
                </a>
            </div>
        </div>
        : <div>
            <TextBox
                label="Category"
                type="text"
                name="category"
                value={filterText}
                onChange={(e) => {
                    const newFilterText = e.target.value
                    setFilterText(newFilterText)
                }}
                placeholder="Uncategorized" 
            />
        {
            cats.length > 0
            ?
            <ul className="list-disc list-inside text-blue-600 underline">
                {cats.map(c => 
                        <a className="list-item" 
                            href="#" onClick={() => {
                            const newCatId = c.id
                            onChange(newCatId)
                            setSelecting(false)
                        }}>
                            {c.name}
                        </a>)
                }
            </ul>
            :
            <Button
                mode={ButtonMode.PRIMARY}
                text={`Create new category ${filterText}`}
                onClick={() => {
                    client.AddCategory(filterText)
                    .then(succeeded => {
                        if(succeeded) {
                            setFilterText("")
                        }
                    })
                }}
            />
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
