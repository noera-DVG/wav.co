// WAV.co — Tauri Rust Backend
// Minimal backend: serves as a bridge between the React frontend and native system features.

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct BridgeStatus {
    pub connected: bool,
    pub host: String,
    pub port: u16,
    pub tempo: Option<u32>,
    pub key: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrackInfo {
    pub name: String,
    pub color: Option<String>,
    pub devices: Vec<String>,
}

#[tauri::command]
fn get_bridge_status() -> BridgeStatus {
    // In a full implementation, this would check the WebSocket connection state.
    // For now, we return a disconnected status.
    BridgeStatus {
        connected: false,
        host: "127.0.0.1".to_string(),
        port: 8765,
        tempo: None,
        key: None,
    }
}

#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[tauri::command]
fn get_app_name() -> String {
    "WAV.co".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_bridge_status,
            get_app_version,
            get_app_name,
        ])
        .run(tauri::generate_context!())
        .expect("error while running WAV.co");
}
