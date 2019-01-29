workflow "Main Workflow" {
  resolves = ["Hello World"]
  on = "push"
}

action "Hello World" {
  uses = "./actions/action-a"
  env = {
    MY_NAME = "Papoi"
  }
  args = "\"Hello world, I'm $MY_NAME!\""
}
