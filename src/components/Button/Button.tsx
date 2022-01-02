import './Button.scss'

export const Button = ({children, onClick, type='submit', style='primary', extraClasses=[]}: any) => (
    <button type={type} onClick={onClick} className={'anton-button ' + style + ' ' + extraClasses.join(' ')}>{children}</button>
);
