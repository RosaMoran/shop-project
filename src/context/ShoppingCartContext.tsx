import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
    openCart: ()=> void, 
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseQuantity: (id:number) => void,
    decreaseQuantity: (id:number) => void,
    removeFormCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[]

}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type CartItem = {
    id: number, 
    quantity: number
}

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {

    const  [isOpen, setIsOpen] = useState(false);

    const  [cartItems, setCartItems] = useLocalStorage<CartItem[]>(" ",[]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseQuantity(id:number){
        setCartItems(currItems =>{
            if (currItems.find(item => item.id == id) ==  null ){
                return [...currItems, {id, quantity: 1}]
            } else{
                return currItems.map(item=>{
                    if(item.id === id ){
                        return{ ...item, quantity: item.quantity + 1 }
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseQuantity(id:number){
        setCartItems(currItems =>{
            if (currItems.find(item => item.id == id)?.quantity ===  1 ){
                return currItems.filter(item => item.id !== id)
            } else{
                return currItems.map(item=>{
                    if(item.id === id ){
                        return{ ...item, quantity: item.quantity - 1 }
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function removeFormCart(id:number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }



    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseQuantity, decreaseQuantity, removeFormCart, cartItems,cartQuantity, openCart, closeCart }}>{
        children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
}