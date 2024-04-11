const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}



// components:

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({parts}) => {
  return (
     <>
       {parts.map((part) => (
         <Part key={part.id} part={part} />
       ))}
     </>
  );
 };
 

const Part=({part})=>{
  return <p>{part.name} {part.exercises}</p>
}

const Total=({parts})=>{
  const total=parts.reduce((sum,part)=>sum+part.exercises,0)
  return <h4>Total of {total} exercises</h4>
}

// const Total=({parts})=>{
//   let total=0
//   parts.forEach(element => {
//     total+=element.exercises
//   });
//   return <h4>Total of {total} exercises</h4>
// }


export default App