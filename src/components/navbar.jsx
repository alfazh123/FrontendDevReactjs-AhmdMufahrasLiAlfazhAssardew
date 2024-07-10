import { getCategories } from "../../service/load.data"
import { useEffect, useState } from "react"

const Navbar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data)
        })
    }, [])


    return (
        <nav className="flex gap-4 justify-between mt-5">
            <section className="flex gap-4">
                <p>Filter By{" : "}</p>
                <div>
                    <input type="checkbox" name="isOpen" id="isOpen" />
                    <label htmlFor="isOpen">Open Now</label>
                </div>
                <select name="filterPrice" id="filterPrice">
                    <option value="all">All</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                </select>
                <select name="filterCategories" id="filterCategories">
                    <option value="all">All</option>
                    {categories.map((category, id) => {
                        return (
                            <option key={id} value={category}>{category}</option>
                        )
                    })}
                </select>
            </section>
            
            <section>
                <button type="reset" id="clear-filter">Clear All</button>
            </section>
        </nav>
    )
}

export default Navbar