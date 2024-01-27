import json
import os


def create_vrt_entry(filename, x, y, width, height):
    """Create a VRT entry for an image."""
    return f"""
        <ComplexSource>
            <SourceFilename relativeToVRT="1">{filename}</SourceFilename>
            <SourceBand>1</SourceBand>
            <SourceProperties RasterXSize="{width}" RasterYSize="{height}" DataType="Byte" BlockXSize="256" BlockYSize="256"/>
            <SrcRect xOff="0" yOff="0" xSize="{width}" ySize="{height}"/>
            <DstRect xOff="{x}" yOff="{y}" xSize="{width}" ySize="{height}"/>
        </ComplexSource>"""


def generate_vrt(json_file, output_vrt):
    """Generate a VRT file from JSON data."""
    with open(json_file, "r") as file:
        data = json.load(file)
        chunks = data["maps"]

    # Assuming all tiles are the same size, get the dimensions from the first tile
    if chunks:
        tile_width = chunks[0]["width"]
        tile_height = chunks[0]["height"]
    else:
        print("No chunks found in JSON.")
        return

    vrt_entries = []
    for chunk in chunks:
        img_filename = chunk["fileName"].replace(".json", ".png")
        x_coord = chunk["x"]
        y_coord = chunk["y"]
        vrt_entries.append(
            create_vrt_entry(img_filename, x_coord, y_coord, tile_width, tile_height)
        )

    # Assemble the VRT content
    vrt_content = f"""<VRTDataset rasterXSize="{max(chunk['x'] + tile_width for chunk in chunks)}" rasterYSize="{max(chunk['y'] + tile_height for chunk in chunks)}">
    <VRTRasterBand dataType="Byte" band="1">
    {" ".join(vrt_entries)}
    </VRTRasterBand>
    </VRTDataset>"""

    # Write to VRT file
    with open(output_vrt, "w") as vrt_file:
        vrt_file.write(vrt_content)
    print(f"VRT file created: {output_vrt}")


# Usage
import argparse

# Create the parser
parser = argparse.ArgumentParser(description="Process the map data file.")

# Add the arguments
parser.add_argument(
    "JsonFile", metavar="JsonFile", type=str, help="the path to the JSON file"
)

# Execute the parse_args() method
args = parser.parse_args()

json_file = args.JsonFile  # Update with the path to your JSON file
import os

output_vrt = os.path.join(
    os.path.dirname(json_file), "output_map.vrt"
)  # Name of the output VRT file
generate_vrt(json_file, output_vrt)
