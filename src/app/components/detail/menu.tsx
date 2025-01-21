interface Menu {
    name: string;
}

interface MenuProps {
    list: Menu[];
}

export default function MenuList({ list} : MenuProps) {
    <>
        {list.map((item, id) => (
            <p key={id} className="text-lg">{item.name}</p>
        ))}
    </>
}