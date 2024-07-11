import { getCategories } from "../../service/load.data"
import { useEffect, useState } from "react"
import { setFilter, removeFilter } from "../redux/action/filterSlice"
import { useDispatch } from "react-redux"

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const price = document.getElementById("filterPrice")
    const category = document.getElementById("filterCategories")
    const clearFilter = document.getElementById("clear-filter")
    const open = document.getElementById("isOpen")


    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data)
        })
    }, [])


    return (
        <nav className="flex gap-4 justify-between mt-5">
            <form action="" className="flex gap-4 justify-between">
                <section className="flex gap-4">
                    <p>Filter By{" : "}</p>
                    <div>
                        <input type="checkbox" name="isOpen" id="isOpen"
                            onClick={() => dispatch(setFilter({
                                price: price.value,
                                categories: category.value,
                                isOpen: open.checked
                            }))
                            }
                        />
                        <label htmlFor="isOpen">Open Now</label>
                    </div>
                    <select name="filterPrice" id="filterPrice" onChange={() => dispatch(setFilter({
                        price: price.value == 'all' ? '' : price.value,
                        categories: category.value == 'all' ? '' : category.value,
                        isOpen: open.checked
                    }))}>
                        <option value="all">All</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select>
                    <select name="filterCategories" id="filterCategories" onChange={() => dispatch(setFilter({
                        price: (price.value === 'all' ? '' : price.value),
                        categories: (category.value === 'all' ? '' : category.value),
                        isOpen: open.checked
                    }))}>
                        <option value="all">All</option>
                        {categories.map((category, id) => {
                            return (
                                <option key={id} value={category}>{category}</option>
                            )
                        })}
                    </select>
                </section>
                
                <section>
                    <button type="reset" id="clear-filter" onClick={() => dispatch(removeFilter())}>Clear All</button>
                </section>
            </form>
        </nav>
    )
}

export default Navbar