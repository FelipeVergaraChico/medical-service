import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../context/UserContext";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";
import pantanalLogo from "../../assets/pantanal-removebg-preview.png"


export default function Header() {
  const { authenticated, logout } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <h1 style={{padding: 0}}>  <Link to="/" ><img src={pantanalLogo} alt="Logo" /></Link></h1>

      {/* Ícone do menu hamburguer */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Links do menu (toggle via CSS no modo mobile) */}
      <nav
        className={`${styles["right-links"]} ${isMenuOpen ? styles.open : ""}`}
      >
        <ul>
          {authenticated ? (
            <>
              <li>
                <Link to="/ors/add">
                  <p>Criar Ors </p> <IoIosAddCircle />
                </Link>
              </li>
              <li>
                <Link to={`/ors/myors`}>
                  <p>Suas Ors</p>
                </Link>
              </li>
              <li onClick={logout}>
                <Link>
                  <p>Sair</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <p>Entrar</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
