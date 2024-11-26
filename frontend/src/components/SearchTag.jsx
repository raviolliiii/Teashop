import { useDispatch } from "react-redux"
import { setQuery, setTag } from "../assets/searchSlice"


function SearchTag({text, tag})
{
    const dispatch = useDispatch();
    return( 
        <p className="text-center">
            <a type="button" onClick={() => {
                dispatch(setTag(tag));
                dispatch(setQuery(""));
                }}>
                {text}
            </a>
        </p>
    )
}

export default SearchTag