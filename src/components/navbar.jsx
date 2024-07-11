import { getCategories } from "../../service/load.data"
import { useEffect, useState, useRef } from "react"
import { setFilter, removeFilter } from "../redux/action/filterSlice"
import { useDispatch } from "react-redux"

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const price = useRef()
    const category = useRef()
    const open = useRef()


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
                        <input type="checkbox" name="isOpen" id="isOpen" ref={open}
                            onClick={() => dispatch(setFilter({
                                price: price.current.value == 'all' ? '' : price.current.value,
                                categories: category.current.value == 'all' ? '' : category.current.value,
                                isOpen: open.current.checked ? 'Buka' : ''
                            }))
                            }
                        />
                        <label htmlFor="isOpen">Open Now</label>
                    </div>
                    <select name="filterPrice" id="filterPrice" ref={price} onChange={() => dispatch(setFilter({
                        price: price.current.value == 'all' ? '' : price.current.value,
                        categories: category.current.value == 'all' ? '' : category.current.value,
                        isOpen: open.current.checked ? 'Buka' : ''
                    }))}>
                        <option value="all">Price</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select>
                    <select name="filterCategories" id="filterCategories" ref={category} onChange={() => dispatch(setFilter({
                        price: price.current.value == 'all' ? '' : price.current.value,
                        categories: category.current.value == 'all' ? '' : category.current.value,
                        isOpen: open.current.checked ? 'Buka' : ''
                    }))}>
                        <option value="all">Category</option>
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