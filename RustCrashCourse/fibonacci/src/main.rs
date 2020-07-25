use std::io;
use std::process;

fn main() {
    println!("Type a number to get the nth fibonacci number");

    let mut n = String::new();

    io::stdin().read_line(&mut n).expect("Failed to read line");

    let n: u32 = match n.trim().parse() {
        Ok(n) => n,
        Err(_) => {
            println!("Type in a valid number");
            process::exit(1);
        }
    };

    println!("The fibonacci number is {}", generate_fibonacci_number(n));
}

fn generate_fibonacci_number(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => generate_fibonacci_number(n - 1) + generate_fibonacci_number(n - 2),
    }
}
