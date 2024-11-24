import { useDispatch } from "react-redux"
import { setTag } from "../assets/searchSlice"


function SearchTag({text, tag})
{
    const dispatch = useDispatch();
    return( 
        <p className="text-center">
            <a onClick={() => dispatch(setTag(tag))} type="button">
                {text}
            </a>
        </p>
    )
}

export default SearchTag