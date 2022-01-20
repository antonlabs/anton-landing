import './Button.scss'

export const Button = ({children, onClick, type='submit', style='primary', extraClasses=[], disabled = false}: any) => (
    <button type={type} onClick={onClick} className={'anton-button ' + style + ' ' + (disabled ? 'disabled' : '') + ' ' + extraClasses.join(' ')}>{children}</button>
);
