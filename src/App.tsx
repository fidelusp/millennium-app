import React, {
  ChangeEvent,
  createRef,
  SyntheticEvent,
  useEffect,
} from 'react'
import './App.css'

const App: React.FC = () => {
  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [isActive, setIsActive] = React.useState(true)
  const [fullNames, setFullNames] = React.useState<
    {
      name: string
      surname: string
    }[]
  >([{ name: '', surname: '' }])

  useEffect(() => {
    setIsActive(!(fullNames.length > 5))
  }, [fullNames])

  const elRefs = React.useRef([])

  if (elRefs.current.length !== 6) {
    // add or remove refs
    elRefs.current = Array(6)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .fill()
      .map((_, i) => elRefs.current[i] || createRef())
  }

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
    setFullNames(newNames)
  }

  const onMouseOver = (key: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    elRefs.current[key].current.style.backgroundColor = 'red'
  }

  const onMouseLeave = (key: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    elRefs.current[key].current.style.backgroundColor = 'transparent'
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setFullNames((names) => [...names, { name: name, surname: surname }])

    setName('')
    setSurname('')
  }

  const namesElements = fullNames.map((item, key) => {
    if (!item.name || !item.surname) return <></>
    return (
      <div style={{ display: 'flex' }} key={key}>
        <div ref={elRefs.current[key]}>
          {item.name} {item.surname}
        </div>

        <button
          onMouseLeave={() => onMouseLeave(key)}
          onMouseOver={() => onMouseOver(key)}
          style={{ marginLeft: '10px' }}
          onClick={() => removeTodo(key)}
        >
          usuń
        </button>
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
          {/*//TODO grid*/}
          <div>
            <div className="box1">Pracownicy</div>
            {namesElements}
          </div>
        </div>
      </div>

      <div className="footer-wrapper">
        <div className="footer" />
      </div>
    </div>
  )
}

export default App
