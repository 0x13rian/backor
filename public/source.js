// This functions get details about Star Wars characters. This example will showcase usage of HTTP requests and console.logs.
// 1, 2, 3 etc.
const teamId = args[0]

// Execute the API request (Promise)
console.log(teamId, `https://backorfade-elo-calc.onrender.com/teams?team=${teamId}`)
const apiResponse = await Functions.makeHttpRequest({
    url: `https://backorfade-elo-calc.onrender.com/teams?team=${teamId}`
})

if (apiResponse.error) {
    console.error(apiResponse.error)
    throw Error("Request failed")
}

const { data } = apiResponse;

console.log('API response data:', JSON.stringify(data, null, 2));

// Return Character Name
return Functions.encodeUint256(parseInt(data.rating))