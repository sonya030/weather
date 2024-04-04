import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import "./styles/App.css";
import "./styles/Responsive.css";

const API_KEY = "afde3795e8c89c11b7122376f93c2169";

function App() {
  let [weather, setWeather] = useState(null);
  let [city, setCity] = useState("");
  let [loading, setLoading] = useState(true);
  let cities = ["Tokyo", "Danang", "Hongkong", "Swiss"];
  let getCurrentLocaton = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  let getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `날씨 데이터를 가져오는데 실패했습니다. 상태: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("data", data);
      setWeather(data);
    } catch (error) {
      console.error("현재 위치 날씨를 가져오는 중 오류 발생:", error);
      // 에러 상태를 처리하거나 사용자에게 알림을 표시할 수 있습니다.
    } finally {
      setLoading(false);
    }
  };
  let getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `날씨 데이터를 가져오는데 실패했습니다. 상태: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("data", data);
      setWeather(data);
    } catch (error) {
      console.error("도시 날씨를 가져오는 중 오류 발생:", error);
      // 에러 상태를 처리하거나 사용자에게 알림을 표시할 수 있습니다.
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("city?", city);
    getWeatherByCity();
    getCurrentLocaton();
    if (city == "") {
      getCurrentLocaton();
    } else {
      getWeatherByCity();
    }
  }, [city]);
  return (
    <div
      className="WeatherApi"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/sky.jpg)`,
      }}
    >
      <div className="App">
        {loading ? (
          <ClimbingBoxLoader
            className="ClipLoader"
            loading={loading}
            size={20}
            color="lightblue"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="WeatherWrap">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} setCity={setCity} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
