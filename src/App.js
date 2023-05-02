import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { RiQuillPenLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiX } from "react-icons/fi";

const inLocalStorage = () => {
  let inLocal = localStorage.getItem("list");
  if (inLocal) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
const App = () => {
  const [input, setinput] = useState();
  const [item, setitem] = useState(inLocalStorage());
  const [index, setindex] = useState(-1);
  const inputRef = useRef();

  const addItems = (e) => {
    e.preventDefault();
    setitem([...item, input]);
    setinput("");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [input]);

  const deleteItem = (id) => {
    const updateItem = item.filter((elem, index) => {
      return index !== id;
    });
    setitem(updateItem);
  };

  const EditItem = (index1) => {
    setinput(item[index1].trim());
    setindex(index1);
  };
  const update = (e) => {
    e.preventDefault();
    let arr = [...item];
    arr[index] = input;
    setitem(arr);
    setinput("");
    setindex(-1);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);
  const cancel = () => {
    setinput("");
    setindex(-1);
  };
  const removeAll = () => {
    setitem([]);
    setinput("");
  };

  return (
    <div>
      <div className="navcontaimmer">
        <div className="nav">
          <h2>
            Tasky Todo... <RiQuillPenLine />{" "}
          </h2>
        </div>
      </div>
      <div className="mainContainer">
        <h3>Add Your Task!</h3>
        <div className="formcontaainer">
          <form
            action=""
            onSubmit={(e) => (index > -1 ? update(e) : addItems(e))}
          >
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setinput(e.target.value.trimStart())}
            />
            <div className="buttonmain">
              {index > 0 || index === 0 ? (
                <div className="updateCancel">
                  <button
                    onClick={update}
                    disabled={!input}
                    className="UPSTYLE hoverButton"
                    type="submit"
                  >
                    <FaEdit
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    />
                  </button>
                  <div>
                    <button className="UPSTYLE1 hoverButton" onClick={cancel}>
                      <FiX
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="addbutton">
                  <button disabled={!input} className="addstyle" type="submit">
                    Add
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="main">
          {item.map((elem, index1) => {
            return (
              <div className="show" key={index1}>
                <h6>{elem} </h6>
                <p className="buttons">
                  <button
                    className="addDel1 hoverButton"
                    onClick={() => {
                      EditItem(index1);
                    }}
                  >
                    <FaEdit className="editButton " />
                  </button>
                  <button
                    className="addDel hoverButton"
                    disabled={index > -1}
                    onClick={() => {
                      deleteItem(index1);
                    }}
                  >
                    <RiDeleteBin6Line className="delteButton" />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
        {item?.length > 0 && (
          <div className="removflex">
            <button
              disabled={index > -1}
              className="remove hoverButton"
              onClick={() => removeAll()}
            >
              Remove All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
