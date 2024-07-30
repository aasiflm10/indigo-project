import { useParams } from "react-router-dom"
import { useflight } from "../hook/hook"
import { FullDisplay } from "../component/FullDisplay"


export default function Details(){


    const {id}= useParams<{ id: string }>()

    const{flight}= useflight({
        id:id||""
    })
    return(
        <div>
            <FullDisplay flight={flight} />
           
        </div>

    )

}