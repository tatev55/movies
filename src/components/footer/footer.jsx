import Navbar from "../navbar/navbar"
import "./footer.css"


const Footer =() => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-text">
                    <p>"Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"</p>
                    <p className="phoneNumber"><strong>Phone: </strong>+3377990011</p>
                    <p className="emailAddress"><strong>Email:</strong>moviespage@gmail.com</p>
                </div>
                <Navbar />
            </div>
        </div>
    )
}

export default Footer;