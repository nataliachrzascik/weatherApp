import React from "react";
const Weather = (props) => {
  return (
    <div className="container text-light">
      <div className="cards">
        <div className="offset-md-4">
          <div className="row py-md-1 py-lg-1">
            {props.icon ? (
              <i
                className={`fas col-md-6 col-sm-12 py-md-5 py-lg-5 ${props.weatherIcon}`}
              ></i>
            ) : null}
            <h1 className=" fas col-md-2 col-sm-12 ">{props.city}</h1>
          </div>
        </div>
        <h6 className="py-1">{props.description}</h6>
        {props.temp_celsius ? (
          <h2 className="py-1">{props.temp_celsius}&deg;</h2>
        ) : null}
        {minmaxTemp(props.temp_min, props.temp_max, props.feels)}

        <div className="row">
          <div className="col-lg-2 col-sm-4 offset-md-3 small">
            {props.wind ? (
              <h4 className="border">
                <i className="fas min fa-wind"></i>
                <br />
                {`${Math.floor(props.wind * 3.6)} km/h`}
                <div className="text">WIND</div>
              </h4>
            ) : null}
          </div>

          <div className="col-lg-2 col-sm-4 small">
            {props.direct ? (
              <h4 className="border">
                <i className="far fa-compass"></i>
                <br />
                {props.direct}&deg;
                <div className="text">WIND DIRECTION</div>
              </h4>
            ) : null}
          </div>

          <div className="col-lg-2 col-sm-4 small">
            {props.pressure ? (
              <h4 className="border">
                <i className="fas fa-equals"></i>
                <br />
                {` ${props.pressure} h/Pa`}
                <div className="text">PRESSURE</div>
              </h4>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-sm-5 offset-md-4 small">
            {props.sunrise ? (
              <h4 className="border">
                <i className="far fa-sun"></i>
                <br />
                {props.sunrise}
                <div className="text">SUNRISE/SUNSET</div>
              </h4>
            ) : null}
          </div>
          <div className="col-lg-2 col-sm-4 small">
            {props.humidity ? (
              <h4 className="border">
                <i className="fas fa-tint"></i>
                <br />
                {`${props.humidity} %`}
                <div className="text">HUMIDITY</div>
              </h4>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
function minmaxTemp(min, max, feels) {
  if (min && max) {
    return (
      <h3>
        <div className="row small">
          <div className="col-lg-1  col-sm-3 offset-md-4 offset-sm-2">
            <span className="px-4">
              <i class="fas fa-arrow-down"></i>
              {` ${min}`}&deg;
            </span>
          </div>
          <div className="col-lg-1 col-sm-3">
            <span className="px-4">
              <i class="fas fa-arrow-up"></i>
              {` ${max}`}&deg;
            </span>
          </div>
          <div className="col-lg-1 col-sm-2">
            <span className="px-4">FEELS:{feels}&deg;</span>
          </div>
        </div>
      </h3>
    );
  }
}
export default Weather;
