// fn old() {
//     let name = "Matt";
//     let mut mutable_name = "Bob";

//     println!("Hello, {}", name);
//     println!("Hello mutable, {}", mutable_name);
//     mutable_name = "Elon";
//     println!("Hello mutated, {}", mutable_name);

//     println!("Hello {} and {}!", name, mutable_name);
// }

fn main() {
    let first_name = "Elon".to_string();
    let last_name = "Musk".to_string();
    say_name(first_name, last_name);
}

fn say_name(first_name: String, last_name: String) {
    println!("Your full name is {} {}", first_name, last_name);
}
