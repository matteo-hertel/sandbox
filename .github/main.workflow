workflow "Push" {
  on = "push"
  resolves = ["Hello World"]
}

action "Hello World" {
  uses = "./../actions/action-a"
  env = {
    MY_NAME = "Papoi"
  }
  args = "\"Hello world, I'm $MY_NAME!\""
}
