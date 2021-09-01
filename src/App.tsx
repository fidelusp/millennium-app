import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react'
import './App.css'

const App: React.FC = () => {
  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [isActive, setIsActive] = React.useState(true)

  const [fullNames, setFullName] = React.useState<
    {
      name: string
      surname: string
    }[]
  >([{ name: '', surname: '' }])

  useEffect(() => {
    if (fullNames.length > 5) {
      setIsActive(false)
    }
  }, [fullNames])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const onChangeSurname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSurname(e.target.value)
  }

  const removeTodo = (index: number) => {
    const newNames = [...fullNames]
    newNames.splice(index, 1)
    setFullName(newNames)
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setFullName((names) => [...names, { name: name, surname: surname }])

    setName('')
    setSurname('')
  }

  const namesElements = fullNames.map((item, key) => {
    if (!item.name || !item.surname) return <></>
    return (
      <div key={key}>
        <div>
          {item.name} {item.surname}
        </div>
        <button onClick={() => removeTodo(key)}>usuń</button>
      </div>
    )
  })

  return (
    <div className="App">
      <div className="header-wrapper">
        <div className="header" />
      </div>

      <div className="element-b">
        <div className="element-c">
          <div className="wrapper-e">
            <div className="element-e">E</div>
          </div>
        </div>
        <div className="table-wrapper">
          <form className="message-form" onSubmit={onSubmit}>
            Name:
            <input
              required
              className="name-input"
              onChange={onChangeName}
              value={name}
            />
            Surname:
            <input
              required
              className="surname-input"
              onChange={onChangeSurname}
              value={surname}
            />
            <button disabled={!isActive} type="submit">
              SEND
            </button>
          </form>

          {namesElements && (
            <div>
              <div className="box1">Pracownicy</div>
              {namesElements}
            </div>
          )}
        </div>
      </div>

      <div className="footer-wrapper">
        <div className="footer" />
      </div>
    </div>
  )
}

export default App
