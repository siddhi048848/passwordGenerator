import { useState, useCallback, useEffect, useRef} from 'react'

import './App.css'// 👈 import tailwind plugin
function App() {
  const [length, setLength] = useState(8)
  const [noAllowed, setNoAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (noAllowed) str += "0123456789"
    if (charactersAllowed) str += "!@#$%^&*()_+?><:{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) //0 value na aaye
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, noAllowed, charactersAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  },
[password])

  useEffect(() => {
    PasswordGenerator()
  }, [length, noAllowed, charactersAllowed, PasswordGenerator])

  return (
    <>
      <div className=' w-full max-m-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex items-center Shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value={password}
          className='outline-none w-full py-2 px-3 bg-white text-black rounded-lg'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className= 'outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
              min = {6}
              max={100}
              value={length}
              onChange={(e) => {setLength(e.target.value)}}
              className='cursor-pointer'
              />
              <label>Length : {length}</label>
            </div>
            <div className='flex text-sm gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={noAllowed}
              id = "numberInput"
              onChange={() => {setNoAllowed((prev) => !prev);
            }}  
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

            <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id = "characterInput"
              onChange={() => {setCharactersAllowed((prev) => !prev);
            }}  
            />
            <label htmlFor="characterInput">Characters</label>
          </div>

          </div>
          </div>
        
    </>
  )
}

export default App
