import {
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@mui/icons-material";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { TextField } from "@mui/material";
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export interface productProps {
      product: Product,
      key: number,
  }

  export const ProductCard = (props: productProps) => {

    const { cart, setCart } = useContext(CartContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
      window.sessionStorage.setItem("cart", JSON.stringify(newCart))
    }

    function updateQuantity(event: any) {
      props.product.quantity = +event.target.value > 0 ? +event.target.value : 1
    }

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.product.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.product.description}<br />
              ${props.product.price}
            </Typography>
            <br />
            <form>
              <TextField id="outlined-number" label="Number" type="number" onChange={(event) => {updateQuantity(event)}} defaultValue="1" InputLabelProps={{shrink: true}} InputProps={{inputProps: {min: 1}}} />
              <Icon>
                <ShoppingCartOutlined onClick={() => {addItemToCart({...props.product})}} />
              </Icon>
            </form>
          </Box>
        </Modal>
      </Container>
    );
  };