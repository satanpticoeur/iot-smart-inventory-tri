import {useEffect, useState} from 'react';
import Header from "@/components/header.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {WeatherCard} from "@/components/weather-card.tsx";
import {DHT11Type} from "@/types/dht11Type.tsx";
import LiveChart from "@/components/LiveChart.tsx";

export default function DHTData() {
    const [data, setData] = useState<DHT11Type>({
        date: Date.now(),
        temperature: 0,
        humidity: 0,
    });

    const fetchData = () => {
        fetch('http://localhost:5000/latest') // ← adapte l'adresse si besoin
            .then(res => res.json())
            .then(newData => {
                setData(newData);
            })
            .catch(err => console.error('Erreur fetch :', err));
    };

    useEffect(() => {
        fetchData(); // Chargement initial

        const interval = setInterval(fetchData, 1000 * 60 * 10); // toutes les 10 minutes
        return () => clearInterval(interval); // nettoyage
    }, []);

    return (
        <ThemeProvider>
            <Header/>
            <div className={"max-w-3xl mx-auto p-4 space-y-4"}>
                <h1 className={"text-3xl font-bold mb-9"}>Sytème de tri intelligent des élements</h1>
                <WeatherCard
                    humidity={data.humidity}
                    temperature={data.temperature}
                    date={data.date}
                    onclick={() => fetchData()}
                />
                <LiveChart/>
            </div>
        </ThemeProvider>
    )
        ;
}
