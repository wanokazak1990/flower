export const MobileMenuApp = (props) => {
    const { activeClass } = props;
    const closeMenu = (e) => {
        e.preventDefault();
        props.closeMenu();
    }
    return (
        <div className={`menu ${activeClass}`}>
            <div className="menu__wrapper">
                <a href="#" className="close" onClick={(e) => closeMenu(e)}>
                    <svg width="389" height="382" viewBox="0 0 389 382" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_210_2)">
                            <path d="M595 -206H-205V594H595V-206Z" fill="white"/>
                            <path d="M28.3334 360.667L358.317 30.6837" stroke="black" strokeWidth="33.3333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M28.3334 27.3337L358.317 357.317" stroke="black" strokeWidth="33.3333" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_210_2">
                                <rect width="389" height="382" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </a>
            </div>
        </div>
    )
}
