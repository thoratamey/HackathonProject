'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, CloudRain, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid,
} from 'recharts';

export default function WeatherUpdatesPage() {
  const [today, setToday] = useState<any>({});
  const [yesterday, setYesterday] = useState<any>({});
  const [forecast, setForecast] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=1&forecast_days=6&timezone=auto`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        // Today’s data
        const now = new Date().getHours();
        setToday({
          current: data.hourly.temperature_2m[data.hourly.time.findIndex((t: string) => t.includes(`${now}:00`))],
          min: data.daily.temperature_2m_min[1],
          max: data.daily.temperature_2m_max[1],
          rain: data.daily.precipitation_sum[1], // today
        });

        setYesterday({
          min: data.daily.temperature_2m_min[0],
          max: data.daily.temperature_2m_max[0],
          rain: data.daily.precipitation_sum[0], // yesterday
        });



        // Forecast next 5 days (from index 2 onwards)
        const upcoming = data.daily.time.slice(2).map((day: string, i: number) => ({
          date: day,
          min: data.daily.temperature_2m_min[i + 2],
          max: data.daily.temperature_2m_max[i + 2],
          rain: data.daily.precipitation_sum[i + 2],
        }));
        setForecast(upcoming);

        // Weather Graph data
        const hourly = data.hourly.time.map((time: string, i: number) => ({
          time: time.slice(5, 16),
          temperature: data.hourly.temperature_2m[i],
          humidity: data.hourly.relative_humidity_2m[i],
        }));
        setGraphData(hourly);
      } catch (err) {
        console.error('Weather fetch failed:', err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-300 via-orange-200 via-yellow-100 to-blue-300">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Link href="/dashboard" className="text-green-600 hover:text-green-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full shadow-md">
                <CloudRain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-800">Weather Updates</h1>
                <p className="text-xs text-green-600">Forecasts and rainfall alerts</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 bg-gradient-to-br from-green-300 via-orange-200 via-yellow-100 to-blue-300"
>
        {/* Yesterday & Today Cards */}
        <div className="flex flex-col md:flex-row gap-4">
        {/* Yesterday */}
        <Card className="flex-1 bg-gradient-to-br from-sky-400 via-indigo-300 to-blue-500 text-white rounded-xl shadow-xl p-4 text-center relative overflow-hidden">
          <CardHeader className="pb-2 relative z-10">
            <p className="text-sm font-bold text-green-700">Yesterday</p>
            <CardTitle className="text-lg font-bold text-green-900">
              {new Date(Date.now() - 86400000).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-2xl font-bold text-gray-700 px-6">
              <div>
                <p>Min</p>
                <p>
                  {yesterday.min}°C{' '}
                  <span>
                    {yesterday.rain > 2
                      ? '🌧️'
                      : yesterday.min >= 30
                      ? '☀️'
                      : '☁️'}
                  </span>
                </p>
              </div>
              <div>
                <p>Max</p>
                <p>
                  {yesterday.max}°C{' '}
                  <span>
                    {yesterday.rain > 2
                      ? '🌧️'
                      : yesterday.max >= 30
                      ? '☀️'
                      : '☁️'}
                  </span>
                </p>
              </div>
            </div>
            <b><p className="mt-2 text-sm text-gray-600">
              {yesterday.rain > 2
                ? 'Rainy'
                : yesterday.max >= 30
                ? 'Sunny'
                : 'Cloudy'}
            </p></b>
          </CardContent>
        </Card>

        {/* Today */}
        <Card className="flex-1 bg-gradient-to-br from-sky-400 via-indigo-300 to-blue-500 text-white rounded-xl shadow-xl p-4 text-center relative overflow-hidden">
          <CardHeader className="pb-2 relative z-10">
            <p className="text-sm font-bold text-green-700">Today</p>
            <CardTitle className="text-lg font-bold text-green-900">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-2xl font-bold text-gray-700 px-4">
              <div>
                <p>Min</p>
                <p>
                  {today.min}°C{' '}
                  <span>
                    {today.rain > 2
                      ? '🌧️'
                      : today.min >= 30
                      ? '☀️'
                      : '☁️'}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-orange-600">Now</p>
                <p className="text-orange-500">
                  {today.current}°C{' '}
                  <span>
                    {today.rain > 2
                      ? '🌧️'
                      : today.current >= 30
                      ? '☀️'
                      : '☁️'}
                  </span>
                </p>
              </div>
              <div>
                <p>Max</p>
                <p>
                  {today.max}°C{' '}
                  <span>
                    {today.rain > 2
                      ? '🌧️'
                      : today.max >= 30
                      ? '☀️'
                      : '☁️'}
                  </span>
                </p>
              </div>
            </div>
            <b><p className="mt-1 text-sm text-gray-600">
              {today.rain > 2
                ? 'Rainy'
                : today.current >= 30
                ? 'Sunny'
                : 'Cloudy'}
            </p></b>
          </CardContent>
        </Card>
      </div>




        {/* Next 5 Days Forecast */}
        <Card className="flex-1 bg-gradient-to-br from-gray-900 via-indigo-800 to-blue-900 text-white rounded-xl shadow-xl p-4 text-center relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">Next 5 Days Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
              {forecast.map((day, idx) => {
                // Determine icon based on rain and temperature
                let weatherIcon = '';
                if (day.rain > 2) weatherIcon = '🌧️';
                else if (day.max >= 30) weatherIcon = '☀️';
                else weatherIcon = '☁️';

                return (
                  <div
                    key={idx}
                    className="bg-white/90 text-gray-800 rounded-xl p-3 shadow-md border border-gray-200 text-center"
                  >
                    <p className="font-semibold text-sm">
                      {day.date}
                    </p>
                    <p className="text-xl">{weatherIcon}</p>
                    <p>Min: {day.min}°C</p>
                    <p>Max: {day.max}°C</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>


        {/* Rainfall Alerts */}
        <Card className="bg-gradient-to-br from-cyan-700 via-blue-800 to-indigo-900 text-white rounded-xl shadow-[0_4px_30px_rgba(0,100,255,0.4)] p-4 text-center relative overflow-hidden backdrop-blur-sm border border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">🌧️ Rainfall Alerts</CardTitle>
          </CardHeader>

          <CardContent>
            {forecast.filter(day => day.rain > 5).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
                {forecast
                  .filter(day => day.rain > 5)
                  .map((day, i) => {
                    let bgColor = "";

                    if (day.rain > 45) {
                      bgColor = "bg-blue-900 text-white";
                    } else if (day.rain > 35) {
                      bgColor = "bg-blue-600 text-white";
                    } else {
                      bgColor = "bg-blue-200 text-black";
                    }

                    return (
                      <Card
                        key={i}
                        className={`min-w-[120px] flex-shrink-0 rounded-md p-2 text-xs ${bgColor} shadow-md border border-white/10 backdrop-blur-sm`}
                      >
                        <div className="font-semibold">{day.date}</div>
                        <div>🌧️ {day.rain} mm</div>
                      </Card>
                    );
                  })}
              </div>
            ) : (
              <p className="text-center text-gray-200">No rainfall alerts for upcoming days.</p>
            )}
          </CardContent>
        </Card>




        {/* Weather Graph */}
        <Card className="bg-green-50/80 text-center border border-green-200 shadow-md p-4 text-green-900">
          <CardHeader>
            <CardTitle className="text-green-700">Weather Graph</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-500">Loading graph...</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Temperature (°C)" />
                  <Line type="monotone" dataKey="humidity" stroke="#22c55e" strokeWidth={2} name="Humidity (%)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
