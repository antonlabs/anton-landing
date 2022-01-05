import "./Footer.scss";

export const Footer = () => {
    return <div className={'footer'}>
        <div className={'w-100 flex-row between'}>
            <div className={'flex-column'}>
                <h3>About Anton</h3>
                <a>Community</a>
                <a>Contact</a>
                <a>Brand</a>
                <a>Blog</a>
            </div>
            <div className={'flex-column'}>
                <h3>Help me!</h3>
                <a>Customer support</a>
                <a>FAQs</a>
                <a>Docs</a>

            </div>
            <div className={'flex-column'}>
                <h3>For Developers</h3>
            </div>
        </div>
        <div className={'credits'}>
            <a href="https://www.freepik.com/vectors/logo">Logo vector created by catalyststuff - www.freepik.com</a>
        </div>
    </div>
}
