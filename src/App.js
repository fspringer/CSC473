import { useState } from 'react';
import './App.css';


function App() {

  const [myClasses, classDefaults] = useState([
    { classTitle: '', classGrade: 'A', classCredits: 3, computeInGPA: true },
  ]);

  const addAClass = () => {
    classDefaults([...myClasses, { classTitle: '', classGrade: 'A', classCredits: 3, computeInGPA: true }]);
  };

  const removeAClass = (x) => {
    const newmyClasses = myClasses.filter((_, i) => i !== x);
    classDefaults(newmyClasses);
  };

  const classUpdate = (index, field, value) => {

    console.log(`index:${index} - field:${field} - value:${value}`)

    //console.log(newmyClasses[index][field]);

    const newmyClasses = [...myClasses];
    newmyClasses[index][field] = value;
    classDefaults(newmyClasses);
  };

  const GPA_Calculator = () => {

    let pointsAccumulated = 0;
    let credictsAccumulated = 0;
    let classPoints = 0;
    let myPoints = 0;

    console.log('-----------------')
    myClasses.forEach((myClass) => {

      console.log(`classTitle:${myClass.classTitle} - computeInGPA:${myClass.computeInGPA}`);

      classPoints = 0;
        if(myClass.computeInGPA === true)
        {
          if(myClass.classGrade === 'A+')
            classPoints = 4.0;
          if(myClass.classGrade === 'A')
            classPoints =  4.0;
          if(myClass.classGrade === 'A-')
            classPoints =  3.7;
          if(myClass.classGrade === 'B+')
            classPoints =  3.3;
          if(myClass.classGrade === 'B')
            classPoints =  3.0;
          if(myClass.classGrade === 'B-')
            classPoints =  2.7;    
          if(myClass.classGrade === 'C+')
            classPoints =  2.5;
          if(myClass.classGrade === 'C')
            classPoints =  2.0;        
          if(myClass.classGrade === 'C-')
            classPoints =  1.7;    
          if(myClass.classGrade === 'D+')
            classPoints =  1.3;
          if(myClass.classGrade === 'D')
            classPoints =  1.0;
          if(myClass.classGrade === 'F')
            classPoints =   0;
          
          pointsAccumulated += classPoints * myClass.classCredits;
          credictsAccumulated += myClass.classCredits;      
          myPoints = (pointsAccumulated / credictsAccumulated);
        }
    });

    console.log("GPA_Calculator");
    console.log(myPoints.toFixed(2));

    if(credictsAccumulated === 0)
        return 0;
    else
      return myPoints.toFixed(2);
  };


  const defaultClassValues = () => {
    classDefaults([{ classTitle: '', classGrade: 'A', classCredits: 3, computeInGPA: true }]);
  };

  return (
    <div className='max-h-screen bg-green-900 flex items-center justify-center'>
        <form className='p-2'>
        <div className='flex justify-between'>
            <button type='button' 
              onClick={addAClass} className='bg-green-600 hover:bg-green-700 transition-colors text-white rounded px-4 py-3 mt-5 flex items-center'>            
              Add Course
            </button>
            <button type='button' 
              onClick={defaultClassValues}
              className='bg-green-600 hover:bg-green-700 transition-colors text-white rounded ml-5 px-4 py-3 mt-5 flex items-center'>            
              Reset
            </button>
          </div>

          <br></br>

          {myClasses.map((myClass, index) => (
            <div key={index} className='flex items-center mb-4'>
              <input
                type='text'
                placeholder='Enter Class Name'
                value={myClass.classTitle}
                onChange={(e) => classUpdate(index, 'classTitle', e.target.value)}
                className='mr-4 p-4 w-1/3 border rounded border-gray-400  '/>
              <select
                value={myClass.classGrade}
                onChange={(e) => classUpdate(index, 'classGrade', e.target.value)}
                className='mr-4 p-4 w-1/3 border rounded border-gray-400'>
                <option value='A+'>A+</option>
                <option value='A'>A</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B'>B</option>
                <option value='B-'>B-</option>
                <option value='C+'>C+</option>
                <option value='C'>C</option>
                <option value='C-'>C-</option>
                <option value='D+'>D+</option>
                <option value='D'>D</option>
                <option value='F'>F</option>
              </select>
              <input
                type='number'
                value={myClass.classCredits}
                onChange={(e) => classUpdate(index, 'classCredits', Math.max(1, e.target.value))}
                className='mr-4 p-4 w-1/3 border rounded border-gray-400' min='1'/>

              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={myClass.computeInGPA}
                  onChange={(e) => classUpdate(index, 'computeInGPA', e.target.checked)}
                  className='mr-1'/>
                Calculate
              </label>

              <button 
                type="button" 
                onClick={() => removeAClass(index)}                 
                  className='bg-green-600 hover:bg-green-700 transition-colors text-white rounded ml-5 px-4 py-3 mt-5 flex items-center'>            
               x
              </button>
            </div>
          ))}
          <br></br>
          <h1 className=' text-3xl py-2 border-b-2 bg-green-500  border-stone-900 text-center'>GPA Calculator</h1>
          <h2 className='text-white text-2xl text-center'>GPA: {GPA_Calculator()}</h2>
        </form>
    </div>
  );
}


export default App;
