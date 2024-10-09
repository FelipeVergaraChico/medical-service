import { createContext } from "react";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({children}){

    const { authenticated, register, logout, login } = useAuth()

    return (
        <Context.Provider value={{ authenticated, register, logout, login }}>
            {children}
        </Context.Provider>
    )

}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, UserProvider }