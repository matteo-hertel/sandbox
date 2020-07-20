use std::io;
use std::process;

fn _test() {
    println!("HI")
}
fn main() {
    println!("Please enter number no. 1: ");
    let a = read_user_input();
    println!("Please enter number no. 2: ");
    let b = read_user_input();

    let result = sum(a, b);
    println!("{} + {} = {}", a, b, result);
}

fn sum(a: u32, b: u32) -> u32 {
    a + b
}

fn read_user_input() -> u32 {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    let digit: u32;

    match input.trim().parse() {
        Ok(val) => {
            digit = val;
        }
        Err(err) => {
            println!("Please enter a valid number, {}", err);
            process::exit(1);
        }
    }
    digit
}
