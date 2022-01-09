export const NoDataFound = (props: {message?: string} = {message: 'No Data found'}) => {
    return (
        <div style={{margin: '0 auto', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', transform: 'translateY(5%)'}}>
            <img alt={''} style={{maxWidth: '300px', margin: '0 auto'}} src={'/assets/no-data-found.svg'} />
            <h3>{props.message}</h3>
        </div>
    );
}
