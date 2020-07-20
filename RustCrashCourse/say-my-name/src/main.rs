use std::io;
fn main() {
    println!("Please enter number no. 1: ");

    let mut first_string = String::new();
    io::stdin().read_line(&mut first_string);

    let a: u32 = first_string
        .trim()
        .parse()
        .expect("Please enter a valid number");

    println!("Please enter number no. 2: ");

    let mut second_string = String::new();
    io::stdin().read_line(&mut second_string);

    let b: u32 = second_string
        .trim()
        .parse()
        .expect("Please enter a valid number");

    let result = sum(a, b);
    println!("{} + {} = {}", first_string, second_string, result);
}

fn sum(a: u32, b: u32) -> u32 {
    return a + b;
}
