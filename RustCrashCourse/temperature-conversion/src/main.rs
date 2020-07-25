use std::io;
use std::process;

fn main() {
    println!("Type the temperature in fahrenheit you want to convert");

    let mut fahrenheit = String::new();
    io::stdin()
        .read_line(&mut fahrenheit)
        .expect("failed to read line");

    let fahrenheit: f64 = match fahrenheit.trim().parse() {
        Ok(f) => f,
        Err(_) => {
            println!("You need to pass a valid number");
            process::exit(1);
        }
    };
    println!(
        "{} fahrenheit equal {} celsius",
        fahrenheit,
        fahrenheit_to_celsius(fahrenheit)
    );
}

fn fahrenheit_to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}
