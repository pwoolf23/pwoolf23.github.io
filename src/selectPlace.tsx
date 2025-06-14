import { ReactNode, useEffect } from "react"

function getRandInt(length: number): number {
    return Math.floor(Math.random() * (length * 2.5)) + length;
}

function SelectPlace(places: any, setPlaceList: any, setSelecting: any) {
    let placeList: Array<ReactNode> = places.map((place: any) => (<li key={place.location}>{place.displayName}</li>))
    let index = 0;
    const length = places.length;
    const randInt: number = getRandInt(length);
    let delay = 75;

    function boldItems() {
        boldItem(places, placeList, index, setPlaceList)
        if (index === randInt) {
            stopSelection()
        } else {
            index += 1
            delay *= 1.0 + (1/(1.5*(randInt-(index-2))))
            setTimeout(boldItems, delay)
        }
    }

    setTimeout(boldItems, delay)

    function stopSelection() {
        setSelecting(false)
    }

}

function boldItem(places: any, placeList: any, index: number, setPlaceList: any) {
    const length: number = places.length;

    placeList[Math.abs(index - 1) % length] = <li key={places[Math.abs(index - 1) % length].location}>{places[Math.abs(index - 1) % length].displayName}</li>
    placeList[index % length] = <li key={places[index % length].location}><strong>{places[index % length].displayName}</strong></li>

    setPlaceList(<ul>{placeList}</ul>)

}

function BuildList(places: any, setPlaceList: any, loading: boolean) {

    useEffect(() => {
        if (!loading)
            setPlaceList(
                <ul>
                    {places.map((place: any) => (
                        <li key={place.location}>{place.displayName}</li>
                    ))}
                </ul>
            )
    }, [places]
    )

}

export { BuildList, SelectPlace }