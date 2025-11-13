import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

function handleLike(toy) {
  const newLikes = toy.likes + 1;

  fetch(`/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes: newLikes }),
  })
    .then((res) => res.json())
    .then((updatedToy) => {
      setToys(toys.map((t) =>
        t.id === updatedToy.id ? updatedToy : t
      ));
    });
}
function handleDelete(toy) {
fetch(`/toys/${toy.id}`, {
  method: "DELETE"
})
.then(() => {
  setToys(toys.filter(t => t.id !== toy.id));
});
}
useEffect(() => {
  fetch(`http://localhost:3001/toys`)
  .then((res) => res.json())
  .then((toyData) => {
    setToys(toyData)
     });
     }, []);






  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} 
      onLike={handleLike} 
      onDelete={handleDelete}/>
    </>
  );
}



export default App;





