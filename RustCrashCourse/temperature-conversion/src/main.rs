use std::io;
use std::process;

fn main() {
    println!(
        "What would you like to convert, C to F or F or C (type c for C to F, or f for F to C)"
    );
    let mut temperature = String::new();

    io::stdin()
        .read_line(&mut temperature)
        .expect("failed to read line for temperature");

    match temperature.trim() {
        "c" | "C" => use_celsius_to_fahrenheit(),
        "f" | "F" => use_fahrenheit_to_celsius(),
        _ => {
            println!("You need to chose between f and c");
            process::exit(1);
        }
    };
}
fn ask_for_temperature() -> f64 {
    println!("Type the temperature you want to convert");

    let mut degrees = String::new();
    io::stdin()
        .read_line(&mut degrees)
        .expect("failed to read line");

    return match degrees.trim().parse() {
        Ok(f) => f,
        Err(_) => {
            println!("You need to pass a valid number");
            process::exit(1);
        }
    };
}
fn use_fahrenheit_to_celsius() {
    let f = ask_for_temperature();
    println!(
        "{} degrees fahrenheit equal {} celsius",
        f,
        fahrenheit_to_celsius(f)
    );
}
fn use_celsius_to_fahrenheit() {
    let c = ask_for_temperature();
    println!(
        "{} degrees celsius equal {} fahrenheit",
        c,
        celsius_to_fahrenheit(c)
    );
}

fn fahrenheit_to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}

fn celsius_to_fahrenheit(c: f64) -> f64 {
    (c * 9.0 / 5.0) + 32.0
}
