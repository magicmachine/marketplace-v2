import json
import os
import argparse


# def create_vrt_entry(filename, x, y, width, height):
#     """Create VRT entries for all color bands of an image."""
#     vrt_entry = ""
#     for band in range(1, 4):  # Looping through 3 bands: 1-Red, 2-Green, 3-Blue
#         vrt_entry += f"""
#             <ComplexSource>
#                 <SourceFilename relativeToVRT="1">{filename}</SourceFilename>
#                 <SourceBand>{band}</SourceBand>
#                 <SourceProperties RasterXSize="{width}" RasterYSize="{height}" DataType="Byte" BlockXSize="256" BlockYSize="256"/>
#                 <SrcRect xOff="0" yOff="0" xSize="{width}" ySize="{height}"/>
#                 <DstRect xOff="{x}" yOff="{y}" xSize="{width}" ySize="{height}"/>
#             </ComplexSource>"""
#     return vrt_entry


def create_vrt_entry(filename, x, y, width, height, band):
    """Create a VRT entry for a specific band of an image."""
    return f"""
        <ComplexSource>
            <SourceFilename relativeToVRT="1">{filename}</SourceFilename>
            <SourceBand>{band}</SourceBand>
            <SourceProperties RasterXSize="{width}" RasterYSize="{height}" DataType="Byte" BlockXSize="256" BlockYSize="256"/>
            <SrcRect xOff="0" yOff="0" xSize="{width}" ySize="{height}"/>
            <DstRect xOff="{x}" yOff="{y}" xSize="{width}" ySize="{height}"/>
        </ComplexSource>"""


def generate_vrt(json_file, output_vrt):
    """Generate a VRT file from JSON data."""
    with open(json_file, "r") as file:
        data = json.load(file)
        chunks = data["maps"]

    if not chunks:
        print("No chunks found in JSON.")
        return

    json_file_dir = os.path.dirname(json_file)
    # vrt_entries = []
    vrt_entries = {1: [], 2: [], 3: [], 4: []}  # One entry list for each band

    for chunk in chunks:
        img_filename = chunk["fileName"].replace(".json", ".png")
        img_path = os.path.join(json_file_dir, img_filename)

        if not os.path.exists(img_path):
            print(f"Image file does not exist, skipping: {img_path}")
            continue

        x_coord, y_coord = chunk["x"], chunk["y"]
        tile_width, tile_height = chunk["width"], chunk["height"]
        # vrt_entries.append(
        #     create_vrt_entry(img_filename, x_coord, y_coord, tile_width, tile_height)
        # )
        # Add entries for each band
        for band in range(1, 5):  # Bands 1-Red, 2-Green, 3-Blue, 4-Alpha
            vrt_entries[band].append(
                create_vrt_entry(
                    img_filename, x_coord, y_coord, tile_width, tile_height, band
                )
            )

    raster_x_size = max(
        chunk["x"] + chunk["width"]
        for chunk in chunks
        if os.path.exists(
            os.path.join(json_file_dir, chunk["fileName"].replace(".json", ".png"))
        )
    )
    raster_y_size = max(
        chunk["y"] + chunk["height"]
        for chunk in chunks
        if os.path.exists(
            os.path.join(json_file_dir, chunk["fileName"].replace(".json", ".png"))
        )
    )

    # vrt_content = f"""<VRTDataset rasterXSize="{raster_x_size}" rasterYSize="{raster_y_size}">
    # <VRTRasterBand dataType="Byte" band="1">
    # {" ".join(vrt_entries)}
    # </VRTRasterBand>
    # </VRTDataset>"""

    vrt_content = f"""<VRTDataset rasterXSize="{raster_x_size}" rasterYSize="{raster_y_size}">\n"""
    for band in range(1, 5):
        vrt_content += f"""<VRTRasterBand dataType="Byte" band="{band}">\n"""
        vrt_content += " ".join(vrt_entries[band])
        vrt_content += "\n</VRTRasterBand>\n"
    vrt_content += "</VRTDataset>"

    with open(output_vrt, "w") as vrt_file:
        vrt_file.write(vrt_content)
    print(f"VRT file created: {output_vrt}")


# Create the parser and parse arguments
parser = argparse.ArgumentParser(description="Process the map data file.")
parser.add_argument(
    "JsonFile", metavar="JsonFile", type=str, help="the path to the JSON file"
)
args = parser.parse_args()

json_file = args.JsonFile
output_vrt = os.path.join(os.path.dirname(json_file), "output_map.vrt")
generate_vrt(json_file, output_vrt)

# python map-vrt.py ../public/maps/runiverse-sketch/FullMap.world.json
# gdal2tiles.py -p raster -r near -z 0-5 ../public/maps/runiverse-sketch/output_map.vrt mapchunks
