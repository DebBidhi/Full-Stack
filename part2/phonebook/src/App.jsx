import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='messege'>
      {message}
    </div>
  )
}

const ErrorNotification=({message})=>{
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchvalue, setsearchvalue] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(()=>{
    personsService
    .getAll()
    .then(personsdata=>{
      setPersons(personsdata)
    })
  },[])
 
  
  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old no with new one? `)){
        const personObject = {
          name: newName,
          number: newNumber
        }
        personsService
        .update(person.id, personObject)
        .then(returnedPerson => {
          setMessage(`Updated ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    personsService
    .create(personObject)
    .then(returnedPersons=>{
      setPersons(persons.concat(returnedPersons))
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
    .catch((error) => {
      console.log(error.response.data)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    });

  }

  const handlenamechnage=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlenochnage=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const searchvaluehandaler=(event)=>{
    console.log(event.target.value)
    setsearchvalue(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchvalue.toLowerCase())
  )

  const deletePerson=(id, name)=>{
    //aleart if they want to delete 
    if(window.confirm(`Delete ${name} ?`)){
    personsService
    .delete_person(id)
    .then(returnedPersons=>{
      setMessage(`Deleted ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(person=>person.id!==id))
    })
    .catch((error) => {
      console.log(error.response.data)
      setError(`Information of ${name} has already been removed from server`)
      setTimeout(() => {
        setError(null)
      }, 5000)
      persons.filter(person=>person.id!==id)
      })}
    }

  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorNotification message={error}/>
      <Filter searchvalue={searchvalue} searchvaluehandaler={searchvaluehandaler}/>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlenamechnage={handlenamechnage} newNumber={newNumber} handlenochnage={handlenochnage}/>

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>

    </div>
  )
}


const Filter=({searchvalue,searchvaluehandaler})=>{
  return(
    <div>
      filter shown with <input value={searchvalue} onChange={searchvaluehandaler}/>
    </div>
  )
}

const PersonForm=({addPerson,newName,handlenamechnage,newNumber,handlenochnage})=>{
  return(
    <form onSubmit={addPerson}>

        <div>name: <input value={newName} onChange={handlenamechnage}/></div>
        <br/>
        <div>number: <input value={newNumber} onChange={handlenochnage}/></div>
        <div><button type="submit">add</button> </div>

      </form>
  )
}



const Persons=({filteredPersons, deletePerson})=>{
  return(
    <div>
      {filteredPersons.map(person => (
        <p key={person.name}>{person.name} {person.number}
        <button type='delete' onClick={()=>deletePerson(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default App