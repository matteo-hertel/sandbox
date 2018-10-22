import { tag, WeElement } from 'omi'
import logo from './logo.svg'
import style from './_index.css'
import '../app-intro'
import '../todo-app'
import '../footer'
@tag('my-app')
class MyApp extends WeElement {

  static get data() {
    return { name: '' }
  }

  clickHandler = () => {
    this.store.rename('Omi V4.0')
  }

  css() {
    return style 
  }

  render(props, data) {
    return (
        <div>
      <div class="app">
        <header class="app-header">
          <img src={logo} onClick={this.clickHandler} class="app-logo" alt="logo" />
          <h1 class="app-title">Welcome to {data.name}</h1>
        </header>
        <app-intro></app-intro>
      </div>
        <footer-element>
        <todo-app></todo-app>
        </footer-element>
        <footer-element>
        <todo-app></todo-app>
        </footer-element>
        </div>
    )
  }
}
