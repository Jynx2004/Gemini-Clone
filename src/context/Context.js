import {createContext, useState} from "react";
import run from "../config/Gemini";

export const Context= createContext();

const ContextProvider = (props) => {

    const[input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setloading]= useState(false);
    const [resultData,setResultData]=useState("");


    const newChat = () => {
        setloading(false);
        setShowResult(false);
    }

   

    const onSent = async (prompt) =>{

        setResultData("");
        setloading(true);
        setShowResult(true);
        let response;
        if(prompt !==undefined){
            response=await run(prompt);
            setRecentPrompt(prompt);


        }

        else{
            setPrevPrompts(prev =>[...prev,input]);
            setRecentPrompt(input);
            response=await run(input);
            
        }

        console.log(response);

        
        let responseArray=response.split("**");
        let newResponse="";
        for(let i=0;i< responseArray.length;i++)
        {
            if(i===0 || i%2 !==1){
                newResponse +=responseArray[i];

            }

            else{
                newResponse+="<b>" + responseArray[i] + "</b>"
            }
        }

        let newResponse2=newResponse.split("*").join("</br>")

        setResultData(newResponse2);
        setloading(false);
        setInput("");

    }

    





    const contextValue = {

        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
        



    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )


}

export default ContextProvider