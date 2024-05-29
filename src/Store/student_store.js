import { configureStore } from "@reduxjs/toolkit";
import student_reducer from "./student_slice"

const store=configureStore( //reducer is an object of configureStore
    {   //store uses reducer to update state
        
        reducer:{students:student_reducer} //students: the list containing the details 
           //current state //action        //student_reducer: reducer function (add_details) to manage state

    }
)

export default store; //store 