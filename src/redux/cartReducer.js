import React from "react";


export function cartReducer(

    state = {
        products: [],
        cart: []
    }, action) {
    switch (action.type) {
        case "INITAL":
            return { products: action.payload, cart: [] }
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((c) => c.id !== action.payload.id),
            };
            case "CHANGE_CART_QTY":
                return {
                  ...state,
                  cart: state.cart.filter((c) =>
                    c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
                  ),
                };
        default:
            return state;
    }
}