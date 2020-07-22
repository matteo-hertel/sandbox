use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1, 101);

    loop {
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(err) => {
                println!("Please enter a valid number, {}", err);
                process::exit(1);
            }
        };
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too low"),
            Ordering::Greater => println!("Too big"),
            Ordering::Equal => {
                println!("That's it!!");
                process::exit(0);
            }
        }
    }
}
