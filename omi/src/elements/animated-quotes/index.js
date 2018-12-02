import { define, WeElement } from 'omi'
import style from './_index.css'

define('animated-quotes', class extends WeElement {
  css() {
    return style
  }

  render(props) {
    console.log(props)
    return (
      <div class="animated-border-quote">
        <blockquote>
          <slot />
          {props.author && <cite>{props.author}</cite>}
        </blockquote>
      </div>
    )
  }
})
