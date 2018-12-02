import { Component, Prop } from "@stencil/core";

@Component({
  tag: "animated-quotes",
  styleUrl: "animated-quotes.css",
  shadow: true
})
export class AnimatedQuotes {
  @Prop() author: string;

  render() {
    return (
      <div class="animated-border-quote">
        <blockquote>
          <p>{<slot />}</p>
          {this.author && <cite>{this.author}</cite>}
        </blockquote>
      </div>
    );
  }
}
