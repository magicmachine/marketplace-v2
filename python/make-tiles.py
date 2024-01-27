from PIL import Image
import json
import os
import subprocess
import argparse
import shutil

# Create the parser
parser = argparse.ArgumentParser(description="Process the map data file.")

# Add the arguments
parser.add_argument(
    "MapData", metavar="MapData", type=str, help="the path to the map data file"
)
parser.add_argument(
    "ImgDir", metavar="ImgDir", type=str, help="the path to the image directory"
)

# Execute the parse_args() method
args = parser.parse_args()

with open(args.MapData, "r") as file:
    data = json.load(file)
    chunks = data["maps"]

# Create a directory for the chunks if it doesn't exist
chunks_dir = "chunks"
os.makedirs(chunks_dir, exist_ok=True)

# Process each chunk individually
for chunk in chunks:
    img_dir = args.ImgDir
    img_filename = chunk["fileName"].replace(".json", ".png")
    x_coord = chunk["x"]
    y_coord = chunk["y"]
    original_img_path = os.path.join(img_dir, img_filename)

    # Define the paths for the image and world file within the chunks folder
    img_path = os.path.join(chunks_dir, img_filename)
    if not os.path.exists(original_img_path):
        print(f"Warning: {img_path} does not exist. Skipping...")
        continue
    world_filename = img_filename.replace(".png", ".pgw")
    world_path = os.path.join(chunks_dir, world_filename)

    # Copy the image to the chunks directory
    shutil.copyfile(original_img_path, img_path)

    # Creating world file for each image in the chunks directory
    # The .pgw file, also known as a world file, is used by GDAL and other GIS software to georeference raster data. The world file contains six lines, each representing a specific parameter:
    #
    # 1. x-dimension of a pixel in map units
    # 2. rotation term for row
    # 3. rotation term for column
    # 4. NEGATIVE of y-dimension of a pixel in map units
    # 5. x-coordinate of the center of the upper left pixel
    # 6. y-coordinate of the center of the upper left pixel
    #
    # In our case, you're assuming that each pixel corresponds to one map unit, there's no rotation, and the coordinates of the upper left pixel are given by x_coord and y_coord. This is a common setup, but the exact values would depend on your specific use case.
    world_file_content = f"1.0\n0.0\n0.0\n-1.0\n{x_coord}\n{y_coord}"
    with open(world_path, "w") as world_file:
        world_file.write(world_file_content)

    print(f"Processed world file for {img_path}")

    # Run gdal2tiles.py on each image in the chunks directory
    # gdal2tiles_command = f"gdal2tiles.py -p raster -r near -z 0-5 {img_path}"
    gdal2tiles_command = [
        "gdal2tiles.py",
        "-p",
        "raster",
        "-r",
        "near",
        "-z",
        "0-5",
        img_path,
    ]

    print(gdal2tiles_command)

    env_vars = os.environ.copy()

    # subprocess.run(gdal2tiles_command, shell=True, cwd=chunks_dir)
    result = subprocess.run(
        gdal2tiles_command,
        shell=False,
        cwd=os.getcwd(),
        env=env_vars,
        stderr=subprocess.PIPE,
    )
    if result.returncode != 0:
        print("Error in gdal2tiles.py:")
        print(result.stderr.decode())
    else:
        print(f"Generated tiles for {img_path}")

# Note: The tiles will be generated within the chunks directory, alongside the images and world files.

# export GEOS_LIBRARY_PATH='/opt/homebrew/Cellar/geos/3.12.1/lib/libgeos_c.1.18.1.dylib'
# export GDAL_LIBRARY_PATH='/opt/homebrew/Cellar/gdal/3.8.3_1/lib/libgdal.34.3.8.3.dylib'
# conda activate

# python make-tiles.py ../public/maps/runiverse-sketch/FullMap.world.json ../public/maps/runiverse-sketch/
