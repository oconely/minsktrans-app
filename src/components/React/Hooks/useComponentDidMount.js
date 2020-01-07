import { useRef, useEffect } from "react"

const useComponentDidMount = fn => {
    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            // console.log(didMountRef.current.classList)
            fn(didMountRef.current)
        }
    })
    return didMountRef;
}

export default useComponentDidMount;