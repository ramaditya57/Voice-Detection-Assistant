#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use enigo::{Enigo, Keyboard, Settings};
use std::{thread, time};

#[tauri::command]
fn type_text(text: String) {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    thread::sleep(time::Duration::from_millis(3000));

    let _ = enigo.text(&text);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![type_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}