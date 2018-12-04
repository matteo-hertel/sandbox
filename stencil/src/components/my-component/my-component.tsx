import { Component, Prop, Listen, State } from "@stencil/core";
import { format } from "../../utils/utils";
import "@vaadin/vaadin-date-picker/vaadin-date-picker.js";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  constructor() {
    this.date = "1991-03-05";
  }
  /**
   * The first name
   */
  @State() date: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;
  @Listen("change")
  todoCompletedHandler(event: CustomEvent) {
    console.log("Received the custom todoCompleted event: ", event.detail);
  }

  changeHandler(event) {
    this.date = event.target.value;
  }
  private getText(): string {
    return format(this.date, this.middle, this.last);
  }

  render() {
    return (
      <div>
        Hello, World! I'm {this.getText()}
        <vaadin-date-picker
          onChange={this.changeHandler.bind(this)}
          value={this.date}
          label="Label"
          placeholder="Placeholder"
        />
      </div>
    );
  }
}
