// import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import StoreItems from "../data/items.json";

export const Store = () => {
  return (
    <>
    {/* md= media screen   xs = extra small  lg= large screen 3 columns g= gap of 3 row-gap and column-gap , specifying the size of gutters, which is the space between rows and columns within grid, flex, and multi-column layouts.*/}
    <Row md={2} xs={1} lg={3} className="g-3">
      {StoreItems.map(item=>(
        <Col key={item.id}>
          <StoreItem {...item}/>
        </Col>
      ))}
      
    </Row>
    </>
  )
}
