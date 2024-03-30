const Part = (props) => {
    return (
    <p>
    {props.part} {props.exercises}
    </p>
    )
  }
  
  const Header = (props) => {
    return (
    <h1> {props.course} </h1>
    )
  }
  
  const Content = ({ course}) => {
    return (
    <> 
      <Part part = {course.name} exercises = {course.exercises} />
    </>
    )
  }
  
  const Total = ( {course} ) => {
    const total = course.parts.map(x => x.exercises).reduce( (s, p) => s + p, 0)
    return (
      <>
      <p>total of {total} exercises</p> 
      </>
    )
  }
  

const Course = ({course}) => {
    return (
      <>
      <Header course={course.name} />
      {course.parts.map(p=> 
            <li key={p.id}>
            <Content course={p} />
            </li>
      )}
      <b><Total course={course}/></b>
      </>
    )
  
  }

  export default Course