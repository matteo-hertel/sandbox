# Rust Crash Course

# Cargo Package Manager

Cargo is Rust's package manger it comes with a bunch of useful commands:

- `cargo new {project name}` will create a new directory with a hello world main file
- `cargo build` in a directory with a Cargo.toml file will build the source in a target directory
- `cargo run` in a directory with a Cargo.toml will build and run the source code
- `cargo clean` will remove all the generated artifacts

# Features

## Ownership / Borrowing

In Rust each variable owns its valuea and by default when passing the variable to a function the value is _moved_ to the argument of the function and the ownership trasfered.

For example, take the following code

```
fn main() {
    let first_name = "Elon".to_string();
    let last_name = "Musk".to_string();
    say_name(first_name, last_name);
    say_name(first_name, last_name);
}

fn say_name(first_name: String, last_name: String) {
    println!("Your full name is {} {}", first_name, last_name);
}
```

the compiler will complain as following

```
error[E0382]: use of moved value: `first_name`
  --> src/main.rs:17:14
   |
14 |     let first_name = "Elon".to_string();
   |         ---------- move occurs because `first_name` has type `std::string::String`, which does not implement the `Copy` trait
15 |     let last_name = "Musk".to_string();
16 |     say_name(first_name, last_name);
   |              ---------- value moved here
17 |     say_name(first_name, last_name);
   |              ^^^^^^^^^^ value used here after move

error[E0382]: use of moved value: `last_name`
  --> src/main.rs:17:26
   |
15 |     let last_name = "Musk".to_string();
   |         --------- move occurs because `last_name` has type `std::string::String`, which does not implement the `Copy` trait
16 |     say_name(first_name, last_name);
   |                          --------- value moved here
17 |     say_name(first_name, last_name);
   |                          ^^^^^^^^^ value used here after move
```

once the function `say_name` has been called, the variables `first_name` and `last_name` can no longer be used as Rust will drop the value;
if a value need to be re-used afer being passed around, needs to be passes by reference with the `&` symbol, this is also called _borrowing_ as the value of the variable is borrowed from the variable that owns the value. Note that the function signature needs to be updated to receive a type of borrowed value (same type prepended with a `&`)

## Unwrap

For quick development error handling can be defered to a later time with the `unwrap` method, in case of error the program will panic, for example

```
    println!("Please enter number no. 1: ");

    let mut first_string = String::new();
    io::stdin().read_line(&mut first_string);

    let a: u32 = first_string.trim().parse().unwrap();
```

if the `parse` method fails, the program will panic, it's quicker to developr but the compiler will still complain

## unused declaration

prefixing a variable or function declaration with `_` will tell the compiler that the declaration doesn't have to be used
