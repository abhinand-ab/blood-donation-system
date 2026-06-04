import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function App() {

  const [donors, setDonors] =
  useState([]);

  const [editingId, setEditingId] =
  useState(null);

  const [searchGroup, setSearchGroup] =
  useState("");

  const [formData, setFormData] =
  useState({

    name: "",
    bloodGroup: "",
    age: "",
    phone: "",
    location: ""
  });


  // FETCH DONORS
  useEffect(() => {

    fetchDonors();

  }, []);


  const fetchDonors = async () => {

    try {

      const res = await axios.get(
        "https://blood-donation-system-fkzb.onrender.com/donors"
      );

      setDonors(res.data);

    } catch(error){

      console.log(error);
    }
  };


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };


  // ADD OR UPDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // UPDATE
      if(editingId){

        await axios.put(

          `https://blood-donation-system-fkzb.onrender.com/donors/${editingId}`,

          formData
        );

        setEditingId(null);

      } else {

        // ADD
        await axios.post(

          "https://blood-donation-system-fkzb.onrender.com/donors",

          formData
        );
      }

      fetchDonors();

      setFormData({

        name: "",
        bloodGroup: "",
        age: "",
        phone: "",
        location: ""
      });

    } catch(error){

      console.log(error);
    }
  };


  // DELETE
  const deleteDonor = async (id) => {

    try {

      await axios.delete(

        `https://blood-donation-system-fkzb.onrender.com/donors/${id}`
      );

      fetchDonors();

    } catch(error){

      console.log(error);
    }
  };


  // EDIT
  const editDonor = (donor) => {

    setFormData({

      name: donor.name,
      bloodGroup: donor.bloodGroup,
      age: donor.age,
      phone: donor.phone,
      location: donor.location
    });

    setEditingId(donor._id);
  };


  // SEARCH
  const searchDonors = async () => {

    try {

      const res = await axios.get(

        `https://blood-donation-system-fkzb.onrender.com/donors/blood/${searchGroup}`
      );

      setDonors(res.data);

    } catch(error){

      console.log(error);
    }
  };


  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: "900px",
          margin: "auto"
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#c0392b",
            marginBottom: "30px"
          }}
        >
          Blood Donation System
        </h1>


        {/* SEARCH */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >

          <input
            type="text"
            placeholder="Search Blood Group"
            value={searchGroup}
            onChange={(e) =>
              setSearchGroup(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={searchDonors}
            style={searchButton}
          >
            Search
          </button>

          <button
            onClick={fetchDonors}
            style={showAllButton}
          >
            Show All
          </button>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          style={formStyle}
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={submitButton}
          >

            {
              editingId
              ? "Update Donor"
              : "Add Donor"
            }

          </button>

        </form>


        {/* DONOR LIST */}

        <div
          style={{
            marginTop: "30px"
          }}
        >

          {
            donors.map((donor) => (

              <div
                key={donor._id}
                style={cardStyle}
              >

                <h2
                  style={{
                    color: "#2c3e50"
                  }}
                >
                  {donor.name}
                </h2>

                <p>
                  <strong>
                    Blood Group:
                  </strong>

                  {donor.bloodGroup}
                </p>

                <p>
                  <strong>
                    Age:
                  </strong>

                  {donor.age}
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>

                  {donor.phone}
                </p>

                <p>
                  <strong>
                    Location:
                  </strong>

                  {donor.location}
                </p>


                {/* BUTTONS */}

                <div
                  style={{
                    marginTop: "15px"
                  }}
                >

                  <button
                    onClick={() =>
                      editDonor(donor)
                    }
                    style={editButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteDonor(donor._id)
                    }
                    style={deleteButton}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}


/* STYLES */

const formStyle = {

  backgroundColor: "white",

  padding: "20px",

  borderRadius: "10px",

  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",

  display: "flex",

  flexDirection: "column",

  gap: "15px"
};


const inputStyle = {

  padding: "12px",

  borderRadius: "5px",

  border: "1px solid #ccc",

  fontSize: "16px"
};


const submitButton = {

  padding: "12px",

  backgroundColor: "#c0392b",

  color: "white",

  border: "none",

  borderRadius: "5px",

  fontSize: "16px",

  cursor: "pointer"
};


const cardStyle = {

  backgroundColor: "white",

  padding: "20px",

  borderRadius: "10px",

  marginBottom: "20px",

  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};


const editButton = {

  padding: "10px 15px",

  backgroundColor: "#2980b9",

  color: "white",

  border: "none",

  borderRadius: "5px",

  cursor: "pointer",

  marginRight: "10px"
};


const deleteButton = {

  padding: "10px 15px",

  backgroundColor: "#e74c3c",

  color: "white",

  border: "none",

  borderRadius: "5px",

  cursor: "pointer"
};


const searchButton = {

  padding: "12px",

  backgroundColor: "#27ae60",

  color: "white",

  border: "none",

  borderRadius: "5px",

  cursor: "pointer"
};


const showAllButton = {

  padding: "12px",

  backgroundColor: "#7f8c8d",

  color: "white",

  border: "none",

  borderRadius: "5px",

  cursor: "pointer"
};


export default App;