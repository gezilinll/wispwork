# SPDX-FileCopyrightText: 2026 linbinghe
# SPDX-License-Identifier: GPL-3.0-or-later

"""Export the two approved Opening Studio collections as uncompressed GLB."""

import argparse
from pathlib import Path
import sys

import bpy


EXPECTED_BLENDER_VERSION = (4, 5, 13)
EXPORTS = {
    "Runtime_Shell": "opening-studio-shell.glb",
    "Runtime_Display": "opening-studio-display.glb",
}


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(allow_abbrev=False)
    parser.add_argument("--output-dir", required=True, type=Path)
    blender_arguments = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    return parser.parse_args(blender_arguments)


def select_collection(collection_name: str) -> None:
    collection = bpy.data.collections.get(collection_name)
    if collection is None:
        raise RuntimeError(f"Missing export collection: {collection_name}")
    if collection.children:
        raise RuntimeError(f"Nested collections are not allowed: {collection_name}")

    bpy.ops.object.select_all(action="DESELECT")
    visible_meshes = [
        obj
        for obj in collection.objects
        if obj.type == "MESH" and not obj.hide_get() and not obj.hide_render
    ]
    if not visible_meshes:
        raise RuntimeError(f"Export collection has no visible meshes: {collection_name}")

    for obj in visible_meshes:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = visible_meshes[0]


def export_collection(collection_name: str, output_path: Path) -> None:
    select_collection(collection_name)
    result = bpy.ops.export_scene.gltf(
        check_existing=False,
        export_animations=False,
        export_apply=True,
        export_attributes=False,
        export_cameras=False,
        export_copyright="Copyright 2026 linbinghe; see repository license scope",
        export_current_frame=True,
        export_draco_mesh_compression_enable=False,
        export_extras=False,
        export_format="GLB",
        export_gn_mesh=False,
        export_gpu_instances=False,
        export_hierarchy_full_collections=False,
        export_image_format="AUTO",
        export_lights=False,
        export_materials="EXPORT",
        export_normals=True,
        export_tangents=False,
        export_texcoords=True,
        export_unused_images=False,
        export_unused_textures=False,
        export_yup=True,
        filepath=str(output_path),
        use_active_collection=False,
        use_active_scene=True,
        use_mesh_edges=False,
        use_mesh_vertices=False,
        use_renderable=True,
        use_selection=True,
        use_visible=True,
        will_save_settings=False,
    )
    if result != {"FINISHED"}:
        raise RuntimeError(f"Blender export failed for {collection_name}: {result}")


def main() -> None:
    if bpy.app.version[:3] != EXPECTED_BLENDER_VERSION:
        raise RuntimeError(
            f"Expected Blender {EXPECTED_BLENDER_VERSION}, got {bpy.app.version[:3]}"
        )

    arguments = parse_arguments()
    output_directory = arguments.output_dir.expanduser().resolve()
    output_directory.mkdir(parents=True, exist_ok=True)

    for collection_name, filename in EXPORTS.items():
        output_path = output_directory / filename
        export_collection(collection_name, output_path)
        print(f"Exported {collection_name} -> {output_path}")


main()
