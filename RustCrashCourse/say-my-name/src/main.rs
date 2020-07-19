fn main() {
    let name = "Matt";
    let mut mutable_name = "Bob";

    println!("Hello, {}", name);
    println!("Hello mutable, {}", mutable_name);
    mutable_name = "Elon";
    println!("Hello mutated, {}", mutable_name);
}
