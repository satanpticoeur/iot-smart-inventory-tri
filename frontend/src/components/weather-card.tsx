import {cn} from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.tsx";

type CardProps = {
    temperature: number
    humidity: number
    date: string | number | Date
    onclick: () => void
}

export function WeatherCard({temperature, humidity, date, onclick}: CardProps) {
    return (
        <Card className={cn("w-[380px]")}>
            <CardHeader>
                <CardTitle>
                    <div className={"flex justify-between items-center"}>
                        <span>Suivi du climat</span>

                    </div>
                </CardTitle>
                <CardDescription>
                    <div className="-mt-4 flex items-end justify-between">
                        <span className="text-sm text-muted-foreground">Dernière mise à jour :</span>
                        <p className={"text-sm text-right font-extralight text-muted-foreground flex flex-col"}>
                            <span>
                                {new Date(date).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </span>
                            <span>
                            {new Date(date).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })}
                        </span>

                        </p>
                    </div>

                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className="text-2xl font-bold"> ⛅ Température : {temperature} °C</div>
                <div className="text-2xl font-bold"> ❄️ Humidité : {humidity} %</div>
            </CardContent>
            <CardFooter>

                <div className="w-full flex justify-between items-center">
                    <Button
                        className={"w-full"}
                        onClick={ onclick }
                    >
                        Actualiser
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
