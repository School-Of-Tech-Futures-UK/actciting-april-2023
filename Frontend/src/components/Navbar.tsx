export type HeaderProps = {
    
}

const Navbar = () => {
    return (
        <div>
        <header className="header">
            <h1 className="logo"><a href="#">GigSiting</a></h1>
        <ul className="main-nav">
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        </header> 
    </div>
        )
}

export default Navbar
