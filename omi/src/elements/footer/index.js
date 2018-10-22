import { tag, WeElement } from 'omi'
import style from './_index.css'

@tag('footer-element')
class FooterElement extends WeElement{
    css(){
        return style
    }

    render(props, data){
        console.log({props, data})
        return(
            <div class="footer">
            </div> 
        )
    }
}
