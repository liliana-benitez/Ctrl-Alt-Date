import React, { useState } from "react"

// Alphabet Dating App with Fixed Bottom Section
const App = () => {
  const [completedDates, setCompletedDates] = useState([])
  const [openLetter, setOpenLetter] = useState(null) // Track which letter is open
  const [newDate, setNewDate] = useState("") // State for new date input
  const [selectedLetter, setSelectedLetter] = useState("A") // State for selected letter
  const [randomDate, setRandomDate] = useState("") // State for random date display
  const [isAddingDate, setIsAddingDate] = useState(false) // State to manage the Add Date form visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const alphabetDates = {
    A: ["Arenas Mall", "Arcade", "Aquarium", "Axe Throwing", "Art Gallery"],
    B: [
      "Baking",
      "Bowling",
      "Board Games",
      "Brunch",
      "Beach",
      "Boat Ride",
      "Bar",
      "Bubble Tea"
    ],
    C: ["Churros", "Cinema", "Casa Batllo", "Comedy Show", "Concert"],
    D: ["Dancing", "Double Date", "Darts", "Dessert"],
    E: ["Escape Room"],
    F: ["Food Truck"],
    G: ["Game Night", "Go-Karting"],
    H: ["Hike", "Happy Hour", "Horror Movie", "Heads or Tails"],
    I: ["Ice Cream", "Italian Restaurant", "Irish Pub"],
    J: ["Jigsaw Puzzle", "Junk Food Night"],
    K: ["Karaoke", "Korean BBQ"],
    L: ["Laser Tag", "Lego", "Live Music"],
    M: ["Movies", "Museum", "Mini Golf"],
    N: ["Nightclub", "Noodles"],
    O: ["Outdoor Date"],
    P: [
      "Pizza del Born",
      "Parc Guell",
      "Paint Night",
      "Picnic",
      "Paddle Boarding"
    ],
    Q: ["Quesadillas"],
    R: ["Rooftop Bar", "Roller Skating"],
    S: [
      "Sagrada Familia",
      "Sunset Date",
      "Swimming",
      "Stargazing",
      "Sports Bar",
      "Sushi"
    ],
    T: ["Tibidabo", "Taco Night", "Theme Park", "Trivia Night"],
    U: [],
    V: ["Video Games", "Vineyard"],
    W: ["Wine Tasting", "Waterfall"],
    X: [],
    Y: ["Yellow-Themed Date"],
    Z: ["Zoo", "Zip Lining"]
  }

  const handleToggleCompleted = (letter, date) => {
    const newCompletedDates = [...completedDates]
    const dateString = `${letter} - ${date}`

    if (completedDates.includes(dateString)) {
      setCompletedDates(newCompletedDates.filter((d) => d !== dateString))
    } else {
      newCompletedDates.push(dateString)
      setCompletedDates(newCompletedDates)
    }
  }

  const handleToggleLetter = (letter) => {
    setOpenLetter(openLetter === letter ? null : letter) // Toggle open/close for the clicked letter
  }

  const isLetterCompleted = (letter) => {
    return alphabetDates[letter].some((date) =>
      completedDates.includes(`${letter} - ${date}`)
    )
  }

  const handleRandomDate = () => {
    const allDates = Object.keys(alphabetDates)
      .map((letter) => alphabetDates[letter])
      .flat() // Flatten to get a single array of all dates
      .filter((date) => date.trim() !== "") // Exclude empty dates

    if (allDates.length === 0) {
      setRandomDate("No dates available!")
    } else {
      const randomIndex = Math.floor(Math.random() * allDates.length)
      setRandomDate(allDates[randomIndex])
    }
  }

  const handleAddDate = () => {
    if (newDate.trim() === "") return

    const updatedDates = { ...alphabetDates }
    updatedDates[selectedLetter] = [...updatedDates[selectedLetter], newDate]
    alphabetDates[selectedLetter] = updatedDates[selectedLetter]
    setNewDate("") // Clear the input after adding
    setIsAddingDate(false) // Close the pop-up form
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6 text-gray-900">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        🖤 Let's be nerdy together 🖤
      </h1>

      {/* Keyboard Layout for Alphabet (QWERTY style) */}
      <div className="grid grid-cols-10 gap-2 mb-6">
        {/* First row - QWERTY */}
        <div className="col-span-10 flex justify-center space-x-2">
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
            <button
              key={letter}
              onClick={() => handleToggleLetter(letter)}
              className={`p-3 text-lg font-medium rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors ${
                isLetterCompleted(letter)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Second row - ASDF */}
        <div className="col-span-10 flex justify-center space-x-2">
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
            <button
              key={letter}
              onClick={() => handleToggleLetter(letter)}
              className={`p-3 text-lg font-medium rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors ${
                isLetterCompleted(letter)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Third row - ZXCV */}
        <div className="col-span-10 flex justify-center space-x-2">
          {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
            <button
              key={letter}
              onClick={() => handleToggleLetter(letter)}
              className={`p-3 text-lg font-medium rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors ${
                isLetterCompleted(letter)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {/* Random Date Button */}
        <button
          onClick={handleRandomDate}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg mt-4 hover:bg-gray-400 transition-colors"
        >
          Surprise Date
        </button>

        {/* Add New Date Button (Pop-up Form) */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mt-4 hover:bg-gray-400"
        >
          Add
        </button>
      </div>

      {randomDate && (
        <div className="mt-4 text-lg font-medium text-gray-700">
          Surprise Date: {randomDate}
        </div>
      )}

      {/* Add New Date Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add a New Date
            </h2>
            <input
              type="text"
              placeholder="Enter new date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <select
              value={selectedLetter}
              onChange={(e) => setSelectedLetter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              {Object.keys(alphabetDates).map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleAddDate}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Add
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Fixed Section */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 max-h-[300px] overflow-y-auto"
        style={{ zIndex: 100 }}
      >
        {/* Display the list of dates for the clicked letter */}
        {openLetter && (
          <div>
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {openLetter}
            </div>
            <ul className="grid grid-cols-3 gap-4">
              {alphabetDates[openLetter].map((date, index) => (
                <li
                  key={index}
                  className={`cursor-pointer mb-2 p-2 rounded-lg flex items-center justify-between transition-opacity ${
                    completedDates.includes(`${openLetter} - ${date}`)
                      ? "opacity-50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={completedDates.includes(
                        `${openLetter} - ${date}`
                      )}
                      onChange={() => handleToggleCompleted(openLetter, date)}
                      className="form-checkbox h-5 w-5 text-gray-600 focus:ring-0 focus:ring-gray-300 checked:bg-gray-500 checked:border-gray-500 focus:outline-none transition duration-300"
                    />
                    <span>{date}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
