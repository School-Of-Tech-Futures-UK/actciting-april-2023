const MainHero = () => {
  return (
    <div className="container-fluid px-5" style={{
      backgroundImage: 'linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8)), url(https://media.timeout.com/images/105948176/750/562/image.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
    <div className="row flex-lg-row-reverse align-items-center py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src="https://media.timeout.com/images/105948176/750/562/image.jpg" className="d-block mx-lg-auto img-fluid rounded-4 shadow-lg" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">Welcome to <span className="display-5 fw-bold lh-1 mb-3 actcitingOrange">ActCiting.</span></h1>
        <p className="lead">The best place for finding the best gigs all around the country for your venue. Discover your talent now.</p>
      </div>
    </div>
    </div>
  );
}

export default MainHero;