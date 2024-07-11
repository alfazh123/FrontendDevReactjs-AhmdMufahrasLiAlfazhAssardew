import {createStore} from 'redux'

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [action.payload]
        default:
            return state
    }
}

const store = createStore(cartReducer)

console.log(store.getState())

const action1 = {
    type: 'ADD_TO_CART',
    payload: {
        price: '$$',
        categories: 'Laptop',
        isOpen: true
    }
}

store.dispatch(action1)

console.log(store.getState())

const action2 = {
    type: 'ADD_TO_CART',
    payload: {
        price: '$$',
        categories: 'Ayam',
        isOpen: true
    }
}

store.dispatch(action2)

console.log(store.getState())