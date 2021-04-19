import React ,{useState} from "react";
import { Button, Dropdown, Image } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import logo from "../../../assets/logo/Fingerprints.png";
import AddTokenModal from "../../modals/create-token/createModel";
import LoginModal from "../../modals/login-modal/loginModal";
import _ from 'lodash'
const Header = (props) => {
  let history = useHistory();
  function logoutUser(){
    console.log("logging out")
    localStorage.removeItem("userInfo");
    // setLoggedUserInfo(undefined)
  }
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [loggedUserInfo, setLoggedUserInfo] = useState(undefined);

  const ProfileDropDown = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href= ""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Image
        src="http://pathfindersacademypune.com/profile/53FFLTTds4.png"
        width="35"
        height="35"
        roundedCircle
      />
    </a>
  ));

  return (
    <div>
    <LoginModal
      show={showLoginModal}
      onHide={() => setShowLoginModal(false)}
      onSubmit={props.submitLoginForm}
    ></LoginModal>


    <AddTokenModal
      show={showCreateModal}
      onHide={() => setShowCreateModal(false)}
      onSubmit={props.submitForm}
    ></AddTokenModal>
      <nav className="navbar navbar-light bg-light flex-md-nowrap shadow">
        <a className="navbar-brand" target="_blank" rel="noopener noreferrer">
          <img src={logo} width="70" height="70" alt=""></img>
        </a>

        {/* <InputGroup >
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Search for tokens, creators or categories"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                </InputGroup> */}
        <form className="buttonGroup">
          <Button
            variant="outline-danger"
            className="nav-button create-token"
            type="button"
            onClick={() => setShowCreateModal(true)}
          >
            Create
          </Button>
          <Button
            variant="outline-dark"
            className="nav-button connect-wallet"
            type="button"
          >
            Connect Wallet
          </Button>
        </form>
        <Dropdown>
          <Dropdown.Toggle as={ProfileDropDown} id="dropdown-custom-components">
            Custom toggle
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">Portfolio</Dropdown.Item>
            <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
            {!_.isEmpty(localStorage.getItem("userInfo")) ?
            <Dropdown.Item eventKey="1" onClick={ () =>{logoutUser()} }>Logout</Dropdown.Item>
            :
            <Dropdown.Item eventKey="1" onClick={() => setShowLoginModal(true)}>Login</Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </div>
  );
};

export default Header;
