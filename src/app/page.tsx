"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { log } from "console";
import { format } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import { useQuery } from "react-query";

type Location = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

type Condition = {
  text: string;
  icon: string;
  code: number;
};

type CurrentWeather = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

type WeatherData = {
  location: Location;
  current: CurrentWeather;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=jabalpur&aqi=no`
      );
      return data;
    }
  );

  console.log("data", data);

  const firstData = data?.current;

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen  justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today data  */}
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p className="text-2xl">
                {format(parseISO(firstData?.last_updated ?? ""), "EEEE")}
              </p>
              <p className="text-lg">
                {format(parseISO(firstData?.last_updated ?? ""), "dd.MM.yyyy")}
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className=" flex flex-col px-4">
                <span className="text-5xl">{firstData?.temp_c ?? ""} °</span>
                <p className="ms-2 text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{firstData?.feelslike_c ?? ""}</span>
                </p>
                <p className=" ms-[-1vw] text-xs space-x-2">
                  <span>
                    Wind speed
                  </span>
                  <span>
                    {firstData?.wind_kph} kmph
                  </span>
                </p>
              </div>
            </Container>
          </div>
        </section>
        {/* 7 days data  */}
        <section></section>
      </main>
    </div>
  );
}
