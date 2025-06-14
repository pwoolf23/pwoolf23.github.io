import {useState } from "react";

function fetchPlaces(setPlaces: any, loading: boolean, setLoading: any, radius = 20000, resultCount = 10) {
        console.log(resultCount)
        console.log(loading)
        navigator.geolocation.getCurrentPosition(async (position) => {
            //@ts-ignore
            const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

            let lat: number = position.coords.latitude;
            let long: number = position.coords.longitude;
            //@ts-ignore
            let center = new google.maps.LatLng(lat, long);
            const request = {
                fields: ['displayName', 'location', 'businessStatus'],
                locationRestriction: {
                    center: center,
                    radius: radius,
                },
                includedPrimaryTypes: ['restaurant'],
                maxResultCount: resultCount,
                rankPreference: SearchNearbyRankPreference.POPULARITY,
            };


            const { places } = await Place.searchNearby(request);
            setPlaces(places)
            setLoading(false)
        }
        )

}


function PlaceForm(setPlaces: any, loading: boolean, setLoading: any) {

    const [radiusInvalid, setRadiusInvalid] = useState(true)
    const [resultsInvalid, setResultsInvalid] = useState(true)
    const [radius, setRadius] = useState("5")
    const [resultCount, setResultCount] = useState("10")


    function handleSubmit(e: any) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries())

        console.log(radius)
        console.log(resultCount)

        setLoading(true)
        fetchPlaces(setPlaces, loading, setLoading, Number(formJson.radius)*1609.34, Number(formJson.resultCount))
        setRadiusInvalid(true)
        setResultsInvalid(true)
        setRadius(formJson.radius as string)
        setResultCount(formJson.resultCount as string)
    }

    function handleRadiusChange(e:any){
        setRadiusInvalid(e.target.value as string === radius);
    }

    function handleResultCountChange(e:any){
        setResultsInvalid(e.target.value as string === resultCount);
    }


    return (
        <form method="post" onSubmit={handleSubmit}>
            <label> Search Radius (miles)
                <input name="radius" type="number" defaultValue={radius}  min="1" max="30" onChange={handleRadiusChange}></input>
            </label>
            <label>
                Number of Restaurants
                <input name="resultCount" type="number" defaultValue={resultCount} min="1" max="20" onChange={handleResultCountChange}></input>
            </label>
            <div>
                <button type="submit" disabled={(loading)||(radiusInvalid&&resultsInvalid)}>Update place list</button>
            </div>
        </form>
    )
}

export { fetchPlaces, PlaceForm }