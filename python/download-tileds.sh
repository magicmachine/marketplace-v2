#!/bin/bash

# Base URL for downloading chunk JSON files and tileset images
base_url="http://ec2-18-208-114-170.compute-1.amazonaws.com/sale/map"

# Directory to store downloaded files
base_dir="./tiledmaps"

# Ensure the base directory exists
mkdir -p "$base_dir"

# Loop through chunk numbers
for i in $(seq 1 2033); do
    chunk_file="chunk$i.json"
    chunk_url="$base_url/$chunk_file"

    # Check if the chunk JSON file already exists
    if [ ! -f "$base_dir/$chunk_file" ]; then
        echo "Downloading $chunk_file..."
        curl -# -o "$base_dir/$chunk_file" "$chunk_url"

        # Check if download was successful
        if [ $? -eq 0 ] && [ -s "$base_dir/$chunk_file" ]; then
            echo "$chunk_file downloaded successfully."
        else
            echo "Failed to download $chunk_file or file is empty. Skipping..."
            continue
        fi
    else
        echo "$chunk_file already exists. Skipping download."
    fi

    # Parse the JSON file for tileset images and download them
    tilesets=$(jq -r '.tilesets[].image' "$base_dir/$chunk_file")
    for tileset in $tilesets; do
        # Extract directory name and ensure it exists
        dir_name=$(dirname "$tileset")
        mkdir -p "$base_dir/$dir_name"

        tileset_url="$base_url/$tileset"
        tileset_path="$base_dir/$tileset"

        # Check if the tileset image already exists
        if [ ! -f "$tileset_path" ]; then
            echo "Downloading $tileset..."
            curl -# -o "$tileset_path" "$tileset_url"
            if [ $? -eq 0 ] && [ -s "$tileset_path" ]; then
                echo "$tileset downloaded successfully."
            else
                echo "Failed to download $tileset or file is empty. Skipping..."
            fi
        else
            echo "$tileset already exists. Skipping download."
        fi
    done
done

echo "Download process completed."
