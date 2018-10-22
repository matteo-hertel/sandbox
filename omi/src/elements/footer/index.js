import { tag, WeElement } from 'omi'
import style from './_index.css'

@tag('footer-element')
class FooterElement extends WeElement{
    css(){
        return style
    }

    render(props, data, children){
        return(
            <div class="footer">
            <slot></slot>
            </div> 
        )
    }
}
