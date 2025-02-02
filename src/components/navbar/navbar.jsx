import "./navbar.css"


const Navbar = () => {
    return (
        <div className = "navbar-container">
        <a className = "link" href = "home">Home</a>
        <a className = "link" href = "about">About</a>
        <a className = "link" href = "contact">Contact</a>
        <a className = "link" href = "pages">Pages</a>
      </div>
    )
}

export default Navbar;