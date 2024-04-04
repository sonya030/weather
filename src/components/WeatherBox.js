import React from "react";

//월, 일, 요일 불러오기
const todayData = () => {
  const week = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
  let now = new Date();
  let todayMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : now.getMonth() + 1;
  let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
  let dayOfWeek = week[now.getDay()];
  return todayMonth + "/" + todayDate + " " + dayOfWeek + "day";
};
//날씨별 배경이미지 불러오기
const getWeatherBackgroundImage = (weatherData) => {
  if (weatherData && weatherData.length > 0) {
    const weatherDescription = weatherData[0].description.toLowerCase();
    switch (weatherDescription) {
      case "clear sky":
        return "clearSkyBG.png";
      case "few clouds":
        return "cloudBG.png";
      case "scattered clouds":
        return "cloudBG.png";
      case "broken clouds":
        return "broken_cloudBG.png";
      case "shower rain":
        return "rainyBG.jpg";
      case "rain":
        return "rainyBG.jpg";
      case "light rain":
        return "rainyBG.jpg";
      case "moderate rain":
        return "rainyBG.jpg";
      case "heavy intensity rain":
        return "heavy_rainBG.png";
      case "very heavy rain":
        return "heavy_rainBG.png";
      case "heavy intensity shower rain":
        return "heavy_rainBG.png";
      case "thunderstorm":
        return "thyphoonBG.jpg";
      case "snow":
        return "snowBG.jpg";
      case "mist":
        return "mistBG.jpg";
      case "clouds":
        return "cloudBG.png";
      case "overcast clouds":
        return "broken_cloudBG.png";
      default:
        return "defaultBG.jpg";
    }
  } else {
    return "defaultBG.png";
  }
};

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);
  // OpenWeatherMap에서 아이콘을 가져오는 URL을 생성하는 함수
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };
  const getWeatherImageUrl = (weatherData) => {
    if (weatherData && weatherData.length > 0) {
      const weatherDescription = weatherData[0].description.toLowerCase();
      switch (weatherDescription) {
        case "clear sky":
          return "./images/clear_sky.png";
        case "few clouds":
          return "./images/few_clouds.png";
        case "scattered clouds":
          return "./images/scattered_clouds.png";
        case "broken clouds":
          return "./images/broken_clouds.png";
        case "shower rain":
          return "./images/shower_rain.png";
        case "heavy intensity rain":
          return "./images/rain.png";
        case "rain":
          return "./images/rain.png";
        case "light rain":
          return "./images/shower_rain.png";
        case "moderate rain":
          return "./images/shower_rain.png";
        case "thunderstorm":
          return "./images/thunderstorm.png";
        case "snow":
          return "./images/snow.png";
        case "mist":
          return "./images/mist.png";
        case "clouds":
          return "./images/clouds.png";
        case "overcast clouds":
          return "./images/clouds.png";
        default:
          return "./images/default.png";
        // 알 수 없는 날씨에 대한 기본 이미지 설정
      }
    } else {
      return "./images/default.png";
      // 기본 이미지 설정 (날씨 정보가 없을 경우)
    }
  };
  // weather 또는 weather.main이 없는 경우 렌더링하지 않음
  if (!weather || !weather.main) {
    return null;
  }
  return (
    <div
      className="WeatherBox"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL
        }/images/${getWeatherBackgroundImage(weather.weather)})`,
      }}
    >
      <div className="top">
        <h3>{todayData()}</h3>
        {weather.sys && weather.name && (
          <p className="date">
            <span className="country">
              {weather.sys.country},&nbsp;{weather.name}
            </span>
          </p>
        )}
      </div>
      <div className="bottom">
        <h1>{Math.round(weather.main.temp)}℃</h1>
        <h5>
          {weather.weather[0]?.main} &nbsp;
          {weather && weather.weather[0]?.icon && (
            // 기존 아이콘 대신 날씨에 따른 이미지로 변경
            <img
              src={process.env.PUBLIC_URL + getWeatherImageUrl(weather.weather)}
              alt="Weather Image"
              style={{
                width: "30px",
              }}
            />
          )}
        </h5>
      </div>
    </div>
  );
};
export default WeatherBox;
