import "./Footer.scss";

export const Footer = (): JSX.Element => {
    return <div className={'footer'}>
        <div className={'w-100 flex-row between'}>
            <div className={'flex-column'}>
                <h3>About Anton</h3>
                <a href={'/'}>Community</a>
                <a href={'/'}>Contact</a>
                <a href={'/'}>Brand</a>
                <a href={'/'}>Blog</a>
            </div>
            <div className={'flex-column'}>
                <h3>Help me!</h3>
                <a href={'/'}>Customer support</a>
                <a href={'/'}>FAQs</a>
                <a href={'/'}>Docs</a>

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
