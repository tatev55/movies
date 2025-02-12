import { useEffect } from "react";

const useKey = (key, callback)=> {
    const handleKeyDown =(event)=>{
        if(event.key === key){
            
            
            callback();
        }
    }
    useEffect(()=> {
        window.addEventListener('keydown', handleKeyDown);

        return(()=> {
            window.removeEventListener('keydown', handleKeyDown);
        })
    },[])

}

export default useKey;