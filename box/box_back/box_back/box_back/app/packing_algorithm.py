# box_back/box_back/app/packing_algorithm.py
"""
Default 3D Bin Packing Algorithm

This is a baseline algorithm for demonstrating the box placement visualization system.
Professors/researchers can upload custom algorithms via the web interface to test
different packing strategies (First-Fit, Best-Fit, Genetic Algorithm, etc.).

Algorithm: Simple Linear Placement (Demo Version)
- Places items sequentially along the X-axis
- No optimization for space utilization
- Serves as a baseline for comparing advanced algorithms

For production, consider implementing:
- 3D First-Fit Decreasing (FFD)
- Guillotine 2D/3D packing
- Skyline algorithm
- Genetic/Evolutionary algorithms
"""

def place_items(items_data, space_dimensions):
    """
    Place items in a 3D space using linear sequential placement.

    Args:
        items_data (list): List of items to place, each containing:
            - name (str): Item identifier
            - dimensions (dict): {'x': float, 'y': float, 'z': float}
            - face_up (bool): If item must be placed upright
            - fragile (bool): If item requires special handling
        space_dimensions (dict): Container dimensions {'x', 'y', 'z'}

    Returns:
        list: Placed items with positions and metadata

    Note: This is a simple demonstration algorithm. Custom algorithms can be
          uploaded through the web interface for research/testing purposes.
    """
    placed_items = []
    current_x = 0  # Track current position along X-axis

    for index, item in enumerate(items_data):
        order_id = index + 1  # 1-indexed for display purposes

        dimensions = item['dimensions']

        # Linear placement: stack items along X-axis
        # Y=2, Z=2 are fixed offsets to center items visually in the 3D space
        position = {
            'x': current_x,
            'y': 2,  # Fixed Y offset for visual alignment
            'z': 2   # Fixed Z offset for visual alignment
        }

        # Move to next position based on current item width
        current_x += dimensions['x']

        # Build placed item with all required metadata
        placed_item = {
            'order_id': order_id,
            'name': item['name'],
            'position': position,
            'dimensions': dimensions,
            'face_up': item.get('face_up', False),     # Orientation constraint
            'fragile': item.get('fragile', False)      # Handling constraint
        }

        placed_items.append(placed_item)

    return placed_items
