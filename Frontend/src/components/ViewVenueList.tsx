import ViewVenueItem from "./ViewVenueItem"

// export interface ViewVenue {
//     venue_id: number,
//     name: string,
//     capacity: number,
//     address: string,
//     geolocation: string,
//     image: string,
//     email: string,
//     start_date: number,
//     end_date: number
// }

export interface ViewVenue {
    venue_id:1,
    name:"The 02",
    capacity:20000,
    address:"Peninsula Square, London SE10 0DX",
    geolocation:"51.50325308011004, 0.0031158253165805916",
    image:"https://lh5.googleusercontent.com/p/AF1QipP2sN2qKTb-4beqF1zFeMWGCP3vW-Ih1X2o4QfE=w426-h240-k-no",
    email:"02contactemail@02.com",
    start_date:1012023,
    end_date:1052023
}

export type ViewVenueListProps = {
    venueArray: Array<ViewVenue>,
    venueIdShow: any
}

const ViewVenueList = (props: ViewVenueListProps) => {
  const { venueArray, venueIdShow } = props;
  
    return (
        <>
        <h1>(change to venue name) Venue ID: {venueIdShow}</h1>
        <div className="venueList container-fluid">
          <div className="row">
            {props.venueArray.map((venue, index) => (
              <ViewVenueItem key={venue.venue_id} venueId={venue.venue_id} name={venue.name} capacity={venue.capacity}
              address={venue.address} geolocation={venue.geolocation} image={venue.image}
              email={venue.email} startDate={venue.start_date} endDate={venue.end_date}/>
            ))}
          </div>
        </div>
        </>
    )
}

export default ViewVenueList