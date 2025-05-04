import {useEffect, useState} from "react";
import {
    XAxis,
    CartesianGrid, AreaChart, Area,
} from "recharts";
import {
    Card,
    CardContent, CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {DHT11Type} from "@/types/dht11Type.tsx";

const chartConfig = {
    temperature: {
        label: "Température",
        color: "var(--chart-5)",
    },
    humidity: {
        label: "Humdidité",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export default function LiveChart() {

    const [timeRange, setTimeRange] = useState("90d")
    const [data, setData] = useState<DHT11Type[]>([]);

    const fetchData = () => {
        fetch("http://localhost:5000/data")
            .then((res) => res.json())
            .then((raw: DHT11Type[]) => {
                const processed = raw.map((entry: DHT11Type) => ({
                    date: new Date(entry.date).toLocaleTimeString(),
                    temperature: entry.temperature,
                    humidity: entry.humidity,
                }));
                setData(processed);
            })
            .catch((err) => console.error("Erreur fetch /data :", err));
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000 * 5 * 10);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>📈 Évolution des Données</CardTitle>
                    <CardDescription>
                       Affichage de dernières tendances
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                           10 dernières
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            20 dernières
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            30 dernières
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-temperature)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-temperature)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillHumdidity" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-humidity)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-humidity)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="humidity"
                            type="natural"
                            fill="url(#fillHumdidity)"
                            stroke="var(--color-humidity)"
                            stackId="a"
                        />
                        <Area
                            dataKey="temperature"
                            type="natural"
                            fill="url(#fillTemperature)"
                            stroke="var(--color-temperature)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent/>}/>
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
