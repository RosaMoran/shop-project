import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

export const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {
  const { getItemQuantity, increaseQuantity, decreaseQuantity, removeFormCart } = useShoppingCart();
  const quantity = getItemQuantity(id); 
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: 'cover'}} />
      <Card.Body className="d-flex flex-column ">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            {/* fs large size  */}
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{ formatCurrency(price)}</span>
        </Card.Title>
        {/* this div will fill all the possible space of multiple items  */}
        <div className="mt-auto">
          {quantity === 0 ?  (
            <Button className="w-100 " onClick={()=> increaseQuantity(id)}>+ Add To Cart</Button>
          ) : <div className="d-flex align-items-center flex-column " style={{gap: '.5rem'}}>
            <Button className=""onClick={()=> decreaseQuantity(id)}>-</Button>
            <div>
            <span className="fs-3">{quantity} in cart</span>
            </div>
            <Button className="" onClick={() => increaseQuantity(id)}>+</Button>
            <div className="d-flex align-items-center flex-column " style={{gap: '.5rem'}}>
              <Button variant="danger" size="sm" onClick={()=> removeFormCart(id )}>Remove</Button>
            </div>
          </div> }
        </div>
      </Card.Body>                       
    </Card>
  )
}
