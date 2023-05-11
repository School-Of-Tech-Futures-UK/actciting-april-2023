export type VenueItemProps = {
    venueId: number,
    name: string,
    capacity: number,
    address: string,
    geolocation: string,
    image: string,
    email: string,
    startDate: number,
    endDate: number
}

const VenueItem = (props: VenueItemProps) => {
    const baseUrl = 'http://localhost:3001'
    const fullUrl = baseUrl + '/' + props.venueId

    return (
        <div className="col d-flex justify-content-center mb-3">
            <div className="venueItem card text-center bg-light h-100">
                <img className="card-img-top" src={props.image} alt={props.name}></img>
                <div className="card-body">
                    <h4 className="card-title">{props.name}</h4>
                    <p className="card-text">
                        Capacity: {props.capacity}
                        <br></br>
                        {props.address}
                        <br></br>
                        {props.email}
                        <br></br>
                        Available: {props.startDate} - {props.endDate}
                    </p>
                   {/* <button className='btn btn-primary' type='button' onClick={() => window.open(fullUrl)}>View Venue</button> */}
                   <a href ={fullUrl} className='btn btn-primary'>view venue</a>
                </div>
            </div>
        </div>
    )
}

export default VenueItem