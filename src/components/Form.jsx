import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  let auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid,
      });
      setName("");
      setDescription("");
      setCity("");
      getItemList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 text-white">
      <h2 className="text-center fw-bold">
        Add Your Hotel <i className="fa-solid fa-hotel" />
      </h2>
      <form onSubmit={onSubmitItem}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label text-white">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="form-label text-white">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="city" className="form-label text-white">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-secondary d-flex gap-1 justify-content-center align-items-center"
            style={{ width: "170px" }}
          >
            Add New
            <i className="fa-solid fa-map-location" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
