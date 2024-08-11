

// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_CART = 'SET_CART';
const DELETE_ITEM_CART = 'DELETE_ITEM_CART';
// const SET_ITEM = 'SET_ITEM';

// Action creators
const login = (data) => {
    localStorage.setItem("token", data.token)
    return { type: LOGIN }
};
const logout = () => {
    localStorage.removeItem("token")
    return { type: LOGOUT }
};
const setCart = (item) => {
    return { type: SET_CART, item: item }
};
const deleteItemCart = (id) => {
    return { type: DELETE_ITEM_CART, id: id }
}



// Reducer
const initialState = {
    isAuthenticated: !!localStorage.getItem("token"),
};
const initialCartState = {
    listItem: [],
    Total: 0,
    length: 0
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuthenticated: true };
        case LOGOUT:
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};

const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case SET_CART:
            {
                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const total = parseFloat((state.Total + (action.item.quantity * action.item.price)).toFixed(2))
                const existingItemIndex = state.listItem.findIndex(cartItem => cartItem.id === action.item.id);
                // console.log(action.item)
                if (existingItemIndex !== -1) {
                    // Nếu sản phẩm đã có, cập nhật số lượng
                    const updatedCart = state.listItem.map((cartItem, index) => {
                        if (index === existingItemIndex) {
                            return { ...cartItem, quantity: cartItem.quantity + action.item.quantity };
                        }
                        return cartItem;
                    });
                    return { ...state, listItem: updatedCart, Total: total };
                } else {
                    // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
                    return { ...state, listItem: [...state.listItem, { ...action.item, quantity: action.item.quantity }], Total: total, length: state.length + 1 };
                }
            }
        case DELETE_ITEM_CART:
            {
                const existingItemIndex = state.listItem.findIndex(cartItem => cartItem.id === action.id);
                if (existingItemIndex !== -1) {
                    const total = parseFloat((state.Total - (state.listItem[existingItemIndex].price * state.listItem[existingItemIndex].quantity)).toFixed(2))
                    return { ...state, listItem: state.listItem.filter(item => item.id !== action.id), Total: total, length: state.length - 1 }
                }
            }

        default:
            return state;
    }
};



export { login, logout, authReducer, cartReducer, setCart, deleteItemCart };
