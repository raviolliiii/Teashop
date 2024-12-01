import { useDispatch } from "react-redux"
import { setCatOpen, setQuery, setTag, setTagName } from "../assets/searchSlice"
import { Link } from "react-router-dom";


function SearchTag({text, tag})
{
    const dispatch = useDispatch();
    return( 
        <p className="text-center">
            <Link className="Link" type="button" onClick={() => {
                dispatch(setTag(tag));
                dispatch(setQuery(""));
                dispatch(setTagName(text));
                dispatch(setCatOpen(""));
                }}>
                {text}
            </Link>
        </p>
    )
}

export default SearchTag