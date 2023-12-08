#!/bin/bash

declare -a ethereum_contracts=(
    "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42 # Wizards"
    "0x251b5f14a825c537ff788604ea1b58e49b70726f # Souls"
    "0xf55b615b479482440135ebf1b907fd4c37ed9420 # Ponies"
    "0x8634C23D5794Ed177E9Ffd55b22fdB80A505ab7B # Beasts"
    "0x7de11a2d9E9727fa5eAd3094E40211C5e9cf5857 # Spawn"
    "0x9690b63Eb85467BE5267A3603f770589Ab12Dc95 # Warriors"
    "0x7c104b4db94494688027cced1e2ebfb89642c80f # Athenaeum"
    "0xda5cf3a42ebacd2d8fcb53830b1025e01d37832d # Locks"
    "0x31158181b4b91a423bfdc758fc3bf8735711f9c5 # Flames"
    "0x59775fd5f266c216d7566eb216153ab8863c9c84 # Boxes"
    "0x5d4aa6ff9de7963ead5a17b454dc1093ca9e98e7 # Rings"
)
declare -a arbitrum_contracts=(
    "0xa3abf5552cc5e1477009bbf90d0b8d2689883891 # Runiverse items" 
)

declare -a arbitrum_contracts=(
    "0xa3abf5552cc5e1477009bbf90d0b8d2689883891 # Runiverse items" 
)


ethereum_api_url="https://api.reservoir.tools/collections-sets/v1"
arbitrum_api_url="https://api-arbitrum.reservoir.tools/collections-sets/v1"
api_key="714b97e1-980d-595e-8d37-66093bd91a33" 

# Function to make an API request
make_api_request() {
    local contracts=("$@")
    local api_url=$1
    
    # Remove the first element (API URL) from the array
    contracts=("${contracts[@]:1}")

    # Create the JSON array
    json_array="[]"
    for contract in "${contracts[@]}"; do
        address="${contract%% #*}"
        json_array=$(echo $json_array | jq --arg address "$address" '. += [$address]')
    done

    # Create JSON data payload
    json_payload=$(jq -n --argjson collections "$json_array" '{"collections": $collections}')


    # Make the API request and capture the response
    response=$(curl --silent --request POST \
             --url $api_url \
             --header 'accept: */*' \
             --header 'content-type: application/json' \
             --header "x-api-key: $api_key" \
             --data "$json_payload")

    echo "Response for $api_url: $response"
}

make_api_request $ethereum_api_url "${ethereum_contracts[@]}"
make_api_request $arbitrum_api_url "${arbitrum_contracts[@]}"

