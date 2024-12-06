
import { useState } from "react"
import data from "./data"
import './styles.css'


export default function Accordion() {
    const [selected, setSelected] = useState(null)
    const [multiSelection, setMultiSelection] = useState(false)
    const [multiple, setMultiple] = useState([])

    function handleSingleSelection(itemID) {
        setSelected(itemID === selected ? null : itemID)
    }

    function handleMultiSelection(itemID) {
        let copyMultiple = [...multiple]

        const findIndexOfCurrentID = copyMultiple.indexOf(itemID)

        console.log(findIndexOfCurrentID)


        findIndexOfCurrentID === -1 ? copyMultiple.push(itemID)
            : copyMultiple.splice(findIndexOfCurrentID, 1)

        setMultiple(copyMultiple)

    }

    return (
        <div className="wrapper">
            <button onClick={() => setMultiSelection(!multiSelection)}>Enable multi select</button>
            <div className="accordion">
                {
                    data && data.length > 0 ? (
                        data.map(dataItem => <div className="item" key={dataItem.id}>
                            <div onClick={multiSelection
                                ? () => handleMultiSelection(dataItem.id)
                                : () => handleSingleSelection(dataItem.id)} className="title">
                                <h3>{dataItem.question}</h3>
                            </div>
                            {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1
                                ? <div className="content">{dataItem.answer}</div>
                                : null}
                        </div>
                        ))
                        : <p>no data found</p>
                }
            </div>
        </div>
    )
}