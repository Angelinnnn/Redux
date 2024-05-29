import { createSlice } from "@reduxjs/toolkit";


const student_slice=createSlice( //reducer and action stored in a var named student_slice
{
    name:"student", //name of the slice
    initialState:{list:[]}, //initial state of the slice
    reducers:{
        student_details:(state,action)=>
            {
                state.list.push(action.payload) //updates the state based on the already existing state
            },
        remove_student:(state,action)=>
            {
                const deleted=action.payload;  
                state.list=state.list.filter(student=>student.reg!==deleted);
            },
        edit_student:(state,action)=>
            {
                const {reg,name,grade,percentage}=action.payload;
                const update_student=state.list.find(i=>i.reg===reg)
                if(update_student)
                    {
                        update_student.name=name;
                        update_student.grade=grade;
                        update_student.percentage=percentage;
                    }
                
            }
             },
}

)
export default student_slice.reducer; //exporting as default so that we can even change the name while 
                                     //importing it from another file
export const {student_details,remove_student,edit_student}=student_slice.actions; //retriving only the actions from the student_slice and
                                                  //storing it in add_details
