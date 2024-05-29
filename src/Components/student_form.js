import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { student_details,edit_student } from '../Store/student_slice'
import '../form_style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { remove_student } from '../Store/student_slice'



const StudentForm = () => {
    const selector=useSelector((state)=>state.students.list) 
    const [edit,set_edit]=useState(false);
    const[reg,set_reg]=useState();
    const[name,set_name]=useState("");
    const[percentage,set_percentage]=useState();
    const[grade,set_grade]=useState("");
    const dispatch=useDispatch(); //dispatch sends actions to the store. These actions update the state

const handle_change=(e)=>{ //e-> Event object that's triggered 
    const {name,value}=e.target; //extracting name and value from the target event. 
                                 //target->input field
switch(name)
{
    case 'register':
        set_reg(value);
        break;
    case 'student_name':
        set_name(value);
        break;
    case 'student_percentage':
        set_percentage(value);
        break;
    case 'student_grade':
        set_grade(value);
        break;
}
}


    const handle_submit=(e)=> //once the form is submitted, this method is called
        {
            e.preventDefault(); //prevents default form behaviour (no reloading)

            //custom operations to be performed after submitting
            if(edit)
                {
            dispatch(edit_student({reg,name,percentage,grade}))
                }
                else
                {
                    dispatch(student_details({reg,name,percentage,grade}))
                }
            reset_form();
            //dispatch-> adds actions to the store
            //add_details-> action creator function
            //name, contact, percentage-> payloads to add to the list
        }
   const reset_form=()=>
    {
        set_reg("");
        set_name("");
        set_percentage("");
        set_grade("");
        set_edit(false);
        //clears all the fields of radio button once the form is submitted
    }
    const handle_delete=(student_reg)=>{
    dispatch(remove_student(student_reg));
  }

  const handle_edit=(i)=>
    {
      set_edit(true)
      set_reg(i.reg)
      set_name(i.name)
      set_grade(i.grade)
      set_percentage(i.percentage)
    }
    // const edit_details=()=>
    //     {
    //         const details={reg,name,grade,percentage}
    //         dispatch(edit_student(details))
    //         set_edit(false)
    //         set_reg("")
    //         set_name("")
    //         set_grade("")
    //         set_percentage("")
    //     }

  return (
    <div>
    <div class="form_container">
          <u><h2>Student Details</h2></u>
    <form onSubmit={handle_submit} className='form'>
    <div class="form_input">
        <label>Reg Number:</label>
        <input type="number" placeholder='Register Number' value={reg} name='register' onChange={handle_change} required/>
</div>
        <div class="form_input">
        <label>Name:</label>
        <input type="text" placeholder='Name' value={name} name='student_name' onChange={handle_change} required/>
</div>
     {/* e- represents the event thats triggered
    target- input element that triggered the event
    value- value entered by the user 
    required- inidicates that its a necessary field*/}

<div class="form_input">
    <label>Class:</label>
    <label><input type="radio" name="student_grade" value="10th" checked={grade==='10th'} onChange={handle_change}/>10th</label>
    <label><input type="radio" name="student_grade" value="11th" checked={grade==='11th'} onChange={handle_change}/>11th</label>
    <label><input type="radio" name="student_grade" value="12th" checked={grade=='12th'} onChange={handle_change}/>12th</label>
</div>

<div class="form_input">
        <label>Percentage:</label>
        <input type="number" placeholder='Percenetage' name='student_percentage' value={percentage} onChange={handle_change} required/>
</div>
<br/>
<button className='submitbutton' type='submit'>
                        {edit ? 'Update' : 'Submit'}
                    </button><br/><br/>
    </form>
    </div>
    <div class="output">
      {
        selector.map((student)=>( //map using the retirved array selector
               <div className='card'> 
               <u><h2>Report Card</h2></u>
               <img src="https://i.pinimg.com/564x/40/1c/34/401c34cca874ed57a1256599cddd3a90.jpg" />
               <p>Register No: {student.reg}</p>
               <p>Name: {student.name}</p>
                <p>Class: {student.grade}</p>
                <p>Percentage: {student.percentage}%</p>
                <button type="button" className="edit" onClick={()=>handle_edit(student)}><FontAwesomeIcon icon={faEdit} /></button>
                <button type="button" className="del" onClick={()=>handle_delete(student.reg)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
        ))
      }
    </div>
    </div>
    
  )
}

export default StudentForm