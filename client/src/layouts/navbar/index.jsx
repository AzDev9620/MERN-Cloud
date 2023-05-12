import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../constants';
import "./style.scss";



function NavbarCustom() {
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)

  const isAuth = useSelector(state => state.user.isAuth)
  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
console.log(API_URL + currentUser.avatar);
  const avatar = currentUser.avatar ? `http://localhost:5000/${currentUser.avatar}` : avatarLogo

  const dispatch = useDispatch()

  function searchChangeHandler(e) {
    setSearchName(e.target.value)
    if (searchTimeout != false) {
      clearTimeout(searchTimeout)
    }
    dispatch(showLoader())
    if (e.target.value != '') {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value));
      }, 1000, e.target.value))
    } else {
      dispatch(getFiles(currentDir))
    }
  }


  return (
    <Navbar bg="danger" expand="lg">
      <Container>
        <Navbar.Brand className='navbar'>
          <Link className='nav_links' to="/">MERN_CLOUD</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth && <input
              value={searchName}
              onChange={e => searchChangeHandler(e)}
              className='navbar__search'
              type="text"
              placeholder="Название файла..." />}
            {!isAuth ? <Link className='nav_links' to="login">Войти</Link> : ''}
            {!isAuth ? <Link className='nav_links' to="register">Регистрация</Link> : ''}
            {isAuth ? <Link className='nav_links' to="login" onClick={() => dispatch(logout())}>Выйти</Link> : ''}
            {isAuth && <Link to='/profile'>
              <img className="navbar__avatar" src={avatar} alt="" />
            </Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;