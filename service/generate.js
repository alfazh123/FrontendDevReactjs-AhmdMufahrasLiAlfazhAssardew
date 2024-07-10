const users = ['Jhon', 'Jane', 'Budi', 'Doe', 'Smith', 'Rizky', 'Rudi', 'Ridho', 'Bambang']

// food images
const images =[
    'https://i.pinimg.com/564x/7d/c9/7c/7dc97c423bb61a948c726794c57e2085.jpg',
    'https://i.pinimg.com/564x/26/73/5c/26735c97a84de1837ca02be163eac204.jpg',
    'https://i.pinimg.com/564x/99/b2/9a/99b29aa6ce47b11fe06c21c65bb9d7ce.jpg',
    'https://i.pinimg.com/564x/47/67/63/476763e4f415560645fa6c4f7b5ef08f.jpg',
    'https://i.pinimg.com/736x/4b/22/60/4b2260ec7474094eb959a8abb1ae7685.jpg',
    'https://i.pinimg.com/564x/bf/2c/4b/bf2c4b9decaf6a31dcc28f6dbe48caa3.jpg',
    'https://i.pinimg.com/564x/fd/62/05/fd62055940ee1d97f45ba6280c475e94.jpg',
    'https://i.pinimg.com/564x/cc/c0/9f/ccc09fd10e395154d92183e29fbcb9fa.jpg',
    'https://i.pinimg.com/564x/c6/51/37/c6513757b3fb34c2d1067f36d8aa1e37.jpg',
    'https://i.pinimg.com/564x/7e/50/9b/7e509bbbfa56205b6a173773ad9361af.jpg'
]

const generateData = () => {
    const data = []
    for (let i = 0; i < 5; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomImage = images[Math.floor(Math.random() * images.length)]
        const randomRating = Math.floor(Math.random() * 5) + 1
        // using for loop to push random rating
        let rating = ''
        for (let i = 0; i < randomRating; i++) {
            rating += '⭐'
        }
        data.push({
            reviewerName: randomUser,
            rating,
            isOpen: Math.random() < 0.5 ? 'Buka' : 'Tutup',
            image: randomImage,
        })
    }
    return data
}

export default generateData