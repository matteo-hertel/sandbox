use std::io;
fn _test() {
    println!("HI")
}
fn main() {
    let _test: u32 = 0;
    println!("Please enter number no. 1: ");

    let mut first_string = String::new();
    io::stdin().read_line(&mut first_string).unwrap();

    let mut a: u32 = 0;

    match first_string.trim().parse() {
        Ok(val) => {
            a = val;
        }
        Err(err) => {
            println!("Please enter a valid number, {}", err);
        }
    }

    println!("Please enter number no. 2: ");

    let mut second_string = String::new();
    io::stdin().read_line(&mut second_string).unwrap();

    let mut b: u32 = 0;

    match second_string.trim().parse() {
        Ok(val) => {
            b = val;
        }
        Err(err) => {
            println!("Please enter a valid number, {}", err);
        }
    }

    let result = sum(a, b);
    println!("{} + {} = {}", first_string, second_string, result);
}

fn sum(a: u32, b: u32) -> u32 {
    return a + b;
}
