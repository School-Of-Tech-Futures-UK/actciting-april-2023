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
    const baseUrl = `${process.env.REACT_APP_BASE_ADDRESS}`
    const fullUrl = baseUrl + '/' + props.venueId

    return (
        <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-bg-light rounded-4 shadow-lg" 
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${props.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="my-5 display-6 lh-1 fw-bold rounded-4">{props.name}</h3>
                <ul className="d-flex list-unstyled mt-auto">
                <li className="d-flex align-items-center me-3">
                    <a href ={fullUrl} className='btn btn-light btn-sm fw-bold shadow-lg'>View Venue</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default VenueItem