// WAV.co — Tauri Main Entry Point

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    wav_co_lib::run();
}
