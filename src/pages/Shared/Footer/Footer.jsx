

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-5">
            <aside>
                <img src="" alt="" />
                <p>Excali<br />Providing reliable tech since 1997</p>
            </aside>
            <nav>
                <header className="footer-title">Services</header>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
              
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
               
            </nav>
        </footer>
    );
};

export default Footer;