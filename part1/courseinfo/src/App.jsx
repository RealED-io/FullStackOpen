const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <p>
        {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return(
    <>
    {props.parts.map((part, i = 0) =>  {
     return <Part key={i++} name={part.name} exercises={part.exercises}/>
    })}
    </>
  )
}

const Total = (props) => {
  let total = 0
  const parts = props.parts

  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises
  }

  return(
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App