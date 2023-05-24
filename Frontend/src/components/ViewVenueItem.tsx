export type ViewVenueItemProps = {
    venueId: number,
    name: string,
    capacity: number,
    address: string,
    geolocation: string,
    image: string,
    email: string,
    startDate: string,
    endDate: string
}

const ViewVenueItem = (props: ViewVenueItemProps) => {


    return (
        <div className="container-fluid px-5" style={{
            backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)), url(${props.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}>
          <div className="row flex-lg-row-reverse align-items-center py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src={props.image} className="d-block mx-lg-auto img-fluid rounded-4 shadow-lg" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3 actcitingOrange">{props.name} <h1 className="display-5 fw-bold lh-1 mb-3 text-dark">Details</h1></h1>
              <h3>Capacity: {props.capacity}</h3>
              <h3>Address: {props.address}</h3>
              <h3>Contact Email: {props.email}</h3>
              <h3>Available: {props.startDate} - {props.endDate}</h3>
            </div>
          </div>
          </div>
    )
}

export default ViewVenueItem