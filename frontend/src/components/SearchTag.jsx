import { useDispatch } from "react-redux"
import { setQuery, setTag, setTagName } from "../assets/searchSlice"


function SearchTag({text, tag})
{
    const dispatch = useDispatch();
    return( 
        <p className="text-center">
            <a type="button" onClick={() => {
                dispatch(setTag(tag));
                dispatch(setQuery(""));
                dispatch(setTagName(text));
                }}>
                {text}
            </a>
        </p>
    )
}

export default SearchTag