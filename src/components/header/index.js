import React, { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import SearchMenu from "./serchMenu";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMessage, faShop, faStore } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));
  const { cart } = useSelector((cart) => ({ ...cart }));
  console.log(user);
  const dispatch = useDispatch();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
  };
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">

      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">

          <span>{user ? `${user.first_name} ${user.last_name}` : ""}</span>
        </Link>
        <Link to="/messenger" className="profile_link hover1"><FontAwesomeIcon icon={faMessage} /></Link>

        <Link to="/marketPlace" className="profile_link hover1"><FontAwesomeIcon icon={faStore} /></Link>

        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="transparent">
              <FaShoppingCart color="primary" fontSize="25px" />
              <Badge >{cart.cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.cart.length > 0 ? (
                <>
                  {cart.cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.title}</span>
                        <span>₹ {prod.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        
        <Link to="/login" className="profile_link hover1" onClick={() => {
          logout();
        }}>

          <span>Logout</span>
        </Link>

      </div>
    </header>
  );
}
