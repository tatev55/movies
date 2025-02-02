export class Storage{
    static getItem(key){
        try{
            const value = localStorage.getItem(key);
            if(value){
                return JSON.parse(value);
            }
            
        }catch(error){
            return null;
        }
    }

    static setItem(key, value){
        try{
            localStorage.setItem(key, JSON.stringify(value)) ;
            return true;
        }catch(error){
            return false
        }
    }

    
   
}