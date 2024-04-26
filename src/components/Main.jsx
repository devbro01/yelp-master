import React, { useEffect, useState, useCallback } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import Form from "./Form";
import Table from "./Table";
import main_logo from "../assets/logo.png";
import main_bg from "../assets/main-background.png";
import profile_pic from "../assets/profile.jpg";

const Main = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const currentEmail = getAuth().currentUser;

  const userName = accountList.find(
    (acc) => acc.email === currentEmail.email
  )?.userName;

  const itemCollectionRef = collection(db, "restaurants");

  const getItemList = useCallback(async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));

      setItemList(filteredData);
      setUserId(getAuth().currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  }, [itemCollectionRef]);

  useEffect(() => {
    getAccountList();
    getItemList();
  }, [accountList, getAccountList, getItemList]);

  const logoutHandler = () => {
    signOut(getAuth());
  };

  return (
    <div
      style={{
        backgroundImage: `url(${main_bg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* navbar */}
      <div className="bg-dark p-2 d-flex justify-content-between">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <img src={main_logo} alt="logo" width={50} />
          <h2 className="fw-bold text-white mt-2">YELP</h2>
        </div>
        <div className="d-flex align-items-center">
          <p className="m-3 text-white h5">{userName}</p>
          <div className="gap-4 d-flex align-items-center justify-content-center">
            <img
              src={profile_pic}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
              }}
              alt="profile?"
            />
            <button
              onClick={logoutHandler}
              className="btn btn-danger d-flex gap-1 justify-content-center align-items-center"
            >
              Logout <i className="fa-solid fa-plug-circle-xmark" />
            </button>
          </div>
        </div>
      </div>

      {/* end navbar */}
      <div className="mt-5 d-flex flex-column align-items-center">
        <div className="col-md-12 col-lg-6 mb-4">
          <div className="bg-dark rounded p-4">
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="bg-dark rounded p-4">
            <Table itemList={itemList} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
