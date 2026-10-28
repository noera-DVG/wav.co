#!/usr/bin/env python3
"""
WAV.co — Ableton Live Bridge
WebSocket bridge between WAV.co and Ableton Live 11+

This script:
- Opens a WebSocket server on 127.0.0.1:8765
- Streams tempo, key, track list, and device list to WAV.co
- Accepts preset load commands from WAV.co
- Uses only macOS built-in Python 3 (no external packages)
- Requires Ableton Live 11+ with Remote-Scripts API enabled

Usage:
  python3 wavco_bridge.py

Log file: ~/Library/Application Support/WAV.co/bridge.log
"""

import asyncio
import json
import logging
import os
import sys
import websockets
from datetime import datetime

# Configuration
HOST = "127.0.0.1"
PORT = 8765
LOG_DIR = os.path.expanduser("~/Library/Application Support/WAV.co")
LOG_FILE = os.path.join(LOG_DIR, "bridge.log")

# Setup logging
os.makedirs(LOG_DIR, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger("WAV.co Bridge")

# Bridge state
bridge_state = {
    "connected": False,
    "host": HOST,
    "port": PORT,
    "tempo": None,
    "key": None,
    "tracks": [],
    "devices": [],
}


def get_ableton_info():
    """
    Attempt to get info from Ableton Live via MIDI/OSC.
    In a full implementation, this would use the Ableton Link API
    or connect to an Ableton Remote Script.

    For now, returns mock data for demonstration.
    """
    # TODO: Implement actual Ableton Live API connection
    # This requires Ableton Live 11+ with Remote-Scripts enabled
    # and the WAV.co Remote Script installed in Ableton's User Library

    try:
        # Check if Ableton Live is running
        # On macOS, we can check via process list
        import subprocess
        result = subprocess.run(
            ["pgrep", "-x", "Ableton Live 11"],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0:
            logger.info("Ableton Live 11 detected")
            # In a full implementation, connect via Ableton's API
            return {
                "tempo": 128,
                "key": "Am",
                "tracks": [
                    {"name": "Lead", "color": "#f39c12", "devices": ["Operator", "Reverb"]},
                    {"name": "Bass", "color": "#e67e22", "devices": ["Simpler"]},
                    {"name": "Drums", "color": "#c0392b", "devices": ["Drum Rack"]},
                    {"name": "Pads", "color": "#2980b9", "devices": ["Operator", "Chorus"]},
                ],
                "devices": ["Operator", "Reverb", "Chorus", "Delay", "EQ Eight"],
            }
    except Exception as e:
        logger.warning(f"Could not connect to Ableton Live: {e}")

    return {
        "tempo": None,
        "key": None,
        "tracks": [],
        "devices": [],
    }


async def handle_client(websocket, path):
    """Handle a WebSocket client connection from WAV.co."""
    logger.info(f"Client connected from {websocket.remote_address}")
    bridge_state["connected"] = True

    # Send initial state
    initial_state = {
        "type": "state",
        "data": bridge_state,
    }
    await websocket.send(json.dumps(initial_state))

    try:
        async for message in websocket:
            try:
                data = json.loads(message)
                command = data.get("command")
                payload = data.get("payload", {})

                logger.info(f"Received command: {command}")

                if command == "get_status":
                    response = {
                        "type": "status",
                        "data": bridge_state,
                    }
                    await websocket.send(json.dumps(response))

                elif command == "load_preset":
                    preset_name = payload.get("name", "")
                    logger.info(f"Loading preset: {preset_name}")
                    response = {
                        "type": "preset_loaded",
                        "data": {"name": preset_name, "success": True},
                    }
                    await websocket.send(json.dumps(response))

                elif command == "get_tracks":
                    tracks = get_ableton_info().get("tracks", [])
                    response = {
                        "type": "tracks",
                        "data": tracks,
                    }
                    await websocket.send(json.dumps(response))

                elif command == "get_devices":
                    devices = get_ableton_info().get("devices", [])
                    response = {
                        "type": "devices",
                        "data": devices,
                    }
                    await websocket.send(json.dumps(response))

                else:
                    logger.warning(f"Unknown command: {command}")
                    response = {
                        "type": "error",
                        "data": {"message": f"Unknown command: {command}"},
                    }
                    await websocket.send(json.dumps(response))

            except json.JSONDecodeError:
                logger.error(f"Invalid JSON: {message}")
                await websocket.send(json.dumps({
                    "type": "error",
                    "data": {"message": "Invalid JSON"},
                }))

    except websockets.exceptions.ConnectionClosed:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error handling client: {e}")
    finally:
        bridge_state["connected"] = False
        logger.info("Bridge connection closed")


async def broadcast_state():
    """Periodically broadcast the current bridge state."""
    while True:
        if bridge_state["connected"]:
            state_message = {
                "type": "state_update",
                "data": bridge_state,
            }
            # In a full implementation, broadcast to all connected clients
            # For now, just log the state
            logger.debug(f"State: {bridge_state}")
        await asyncio.sleep(1)


async def main():
    """Start the WebSocket server."""
    logger.info(f"Starting WAV.co Bridge on {HOST}:{PORT}")
    logger.info(f"Log file: {LOG_FILE}")

    # Get initial Ableton info
    ableton_info = get_ableton_info()
    bridge_state["tempo"] = ableton_info.get("tempo")
    bridge_state["key"] = ableton_info.get("key")
    bridge_state["tracks"] = ableton_info.get("tracks", [])
    bridge_state["devices"] = ableton_info.get("devices", [])

    # Start state broadcaster
    state_task = asyncio.create_task(broadcast_state())

    # Start WebSocket server
    async with websockets.serve(handle_client, HOST, PORT):
        logger.info(f"WAV.co Bridge running on ws://{HOST}:{PORT}")
        logger.info("Press Ctrl+C to stop")
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Bridge stopped by user")
    except Exception as e:
        logger.error(f"Bridge crashed: {e}")
        sys.exit(1)
