from PIL import Image
import json
import os
import subprocess

# Load JSON data (assuming it's stored in a file named 'map_data.json')
import argparse

# Create the parser
parser = argparse.ArgumentParser(description="Process the map data file.")

# Add the arguments
parser.add_argument(
    "MapData", metavar="MapData", type=str, help="the path to the map data file"
)

# Execute the parse_args() method
args = parser.parse_args()

with open(args.MapData, "r") as file:
    data = json.load(file)
    chunks = data["maps"]

# Assuming all chunks are of the same size and perfectly align
tile_width = 8000
tile_height = 8000

# Calculate the dimensions of the full map
max_x = max(chunk["x"] for chunk in chunks) + tile_width
max_y = max(chunk["y"] for chunk in chunks) + tile_height

print(f"Max X: {max_x}")
print(f"Max Y: {max_y}")


# Create a new blank image with the size of the full map
full_map = Image.new("RGB", (max_x, max_y))

# Paste each chunk into the full map image
for chunk in chunks:
    chunk_img = Image.open(chunk["fileName"])
    full_map.paste(chunk_img, (chunk["x"], chunk["y"]))

print(f"found {len(chunks)} chunks. writing the merged file")

# Save the merged image
merged_filename = "merged_map.png"
full_map.save(merged_filename)

# Georeference the image (simple approach, treating pixels as coordinates)
# Creating world file for the merged image
world_file_content = f"1.0\n0.0\n0.0\n-1.0\n0.0\n{max_y}"
world_filename = merged_filename.replace(".png", ".pgw")

with open(world_filename, "w") as world_file:
    world_file.write(world_file_content)

print("wrote the megafile to", merged_filename)
print("wrote the world content to", world_file_content)

# Step 3: Creating Tiles with gdal2tiles.py
# Command to run gdal2tiles.py
# gdal2tiles_command = f"gdal2tiles.py -p raster -z 0-5 {merged_filename}"
# subprocess.run(gdal2tiles_command, shell=True)
