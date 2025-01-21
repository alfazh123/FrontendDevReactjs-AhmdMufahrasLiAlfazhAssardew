'use client';

export default function Dropdown(categories: { categories:  string[] }) {

    return (
        <>
            <select className="w-1/4 p-2 rounded-lg bg-gray-100" name="categories" id="categories">
                <option value="all">All</option>
                {categories.categories.map((category, id) => (
                    <option key={id} value={category}>{category}</option>
                ))}
            </select>
        </>
    )
}