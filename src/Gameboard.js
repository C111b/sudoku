import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import Box from "@mui/material/Box";
import "./App.css";
import { Button, TextField} from "@mui/material";

//Helper functions
//produces an nxn array of items --- NVM DONT NEED
// const setArrays = (item, num) => {
//   let arrays = [];
//   for (let i = 0; i < num; i++) {
//     arrays.push([]); //forms n rows
//     for (let j = 0; j < num; j++) {
//       arrays[i].push(item); //forms n items within rows
//     }
//   }
//   return arrays; // returns nxn array of arrays of items
// };

//converts the 1d array to a 2d array and null to empty string
const toTwoDim = (array) => {
  let result = [];
  let temp = [];
  for (let i = 0; i < array.length; i++) {
    temp.push(array[i]);
    if (temp.length === 9) {
      result.push(temp);
      temp = [];
    }
  }
  return result;
};

//checks if input is a number
const numCheck = (num) => {
  if (num >= 1 && num <= 9) {
    return true;
  }
  return false;
};

//check if all values are completely filled
const isComplete = (list) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (list[i][j] === "") {
        return false;
      }
    }
  }
  return true;
};

//check exclusivity by checking if repeat numbers in rows,cols, and boxes
//function checks if dupe in list
//error solved: will indicate that there is no dupe after incorrectly changing a number in a completed and valid sudoku
//occurance is only on the first instance ......set was a mix of string (user inputs) and numbers (starting list & hints)
const hasDupe = (list) => {
  let temp = new Set(list);
  return temp.size < 9 || temp.has("") ? true : false;
};

//checks rows are all 1 to 9 exclusively
const checkRows = (list) => {
  for (let i = 0; i < 9; i++) {
    if (hasDupe(list[i])) {
      return false;
    }
  }
  return true;
};

//checks columns are all 1 to 9 exclusively
const checkCols = (list) => {
  for (let i = 0; i < 9; i++) {
    let col = [];
    for (let j = 0; j < 9; j++) {
      col.push(list[j][i]);
    }
    if (hasDupe(col)) {
      return false;
    }
  }
  return true;
};

const checkBoxes = (list) => {
  let temp = [];
  for (let box = 0; box < 9; box++) {
    temp.push([]);
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (box % 3 === 0) {
          temp[box].push(list[box + k][j]);
        }
        if (box % 3 === 1) {
          temp[box].push(list[box - 1 + k][j + 3]);
        }
        if (box % 3 === 2) {
          temp[box].push(list[box - 2 + k][j + 6]);
        }
      }
    }
    if (hasDupe(temp[box])) {
      return false;
    }
  }
  return true;
};

//totalling it all: const isValid
const isValid = (list) => {
  if (checkRows(list) && checkCols(list) && checkBoxes(list)) {
    return true;
  }
  return false;
};

//outputs an array of indices where the list is empty
const indexOfEmpty = (list) => {
  let array = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (list[i][j] === "") {
        array.push([i, j]);
      }
    }
  }
  return array;
};

//// count number of tries after submission
//5./ Prettier
//6. DONE/ make hints and starting boxes a different colour, OR bolded numbers
//7./ make arrow keys move between inputs

//for use with makepuzzle(), where sudokus go from 0-8
// we want sudokus to be from 1-9
const plusOne = (array) => {
  // array = array.map((item) => (item !== "") ? item + 1 : "")
  array = array.map((item) => {
    if (item === null) {
      return "";
    } else {
      return item + 1;
    }
  });
  return array;
};

// const make = () => {
//   return plusOne(makepuzzle());
// };

const Gameboard = () => {
  const [puzzle, setPuzzle] = useState(makepuzzle()); //DOES NOT ALLOW FOR plusOne(makepuzzle()) or make() ... have to work around

  const [hints, setHints] = useState(toTwoDim(plusOne(puzzle))); //hints make it so that inputs are permanent -> maybe only updateList when input clicked hints[i][j] !== solution[i][j]
  const [list, setList] = useState(toTwoDim(plusOne(puzzle)));
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  let solution = toTwoDim(plusOne(solvepuzzle(puzzle)));

  const updateList = (i, j, num) => {
    let tempList = list;
    tempList[i][j] = num;
    setList([...tempList]);
  };

  const updateHints = (i, j, num) => {
    let tempList = hints;
    tempList[i][j] = num;
    setHints([...tempList]);
  };

  const hintReveal = (list, solution) => {
    let indices = indexOfEmpty(list);
    let index = indices[Math.floor(Math.random() * indices.length)];
    updateHints(index[0], index[1], solution[index[0]][index[1]]);
    updateList(index[0], index[1], solution[index[0]][index[1]]);
  };

  const buttonSubmit = (list) => {
    if (isComplete(list) && isValid(list)) {
      return setDone(true);
    }
    alert("Try Again!");
    setCount(count + 1);
  };

  //testing
  //effect for submit button
  useEffect(() => {
    setDone(false); //needs to be done
  }, [list, count]);

  const testingSet = (list) => {
    let test = new Set(list);
    return test;
  };
  useEffect(() => {
    console.log(testingSet(list[8]));
  });
  //effect for new puzzle button
  useEffect(() => {
    setList(toTwoDim(plusOne(puzzle)));
    setHints(toTwoDim(plusOne(puzzle)));
    setCount(0);
  }, [puzzle]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mt: "5%",
          // height: "50%"
        }}
      >
        <Box sx={{
          display: "flex", 
          justifyContent: "space-between",
          width: "18.5rem",
          mb: ".5rem"
          }}>
          <Button onClick={() => buttonSubmit(list)}>Submit</Button>
          {done ? <div>congrats {console.log(done)}</div> : null}
          <Button
            onClick={() => setList(toTwoDim(plusOne(solvepuzzle(puzzle))))}
          >
            solve
          </Button>
          <Button
            onClick={() =>
              !isComplete(list) ? hintReveal(list, solution) : null
            }
          >
            hint
          </Button>
          {count >= 1 && (
            <div>
              You've made {count} Attempt{count > 1 ? "s." : "."}
            </div>
          )}
          <Button onClick={() => setPuzzle(makepuzzle())}>new puzzle</Button>
        </Box>
        <Box
          // className = "box"
          sx={{
            display: "flex",
            // justifyContent: "center",

            flexWrap: "wrap",
            // justifyContent: "center",
            // alignItems: "center",
            width: "18.5rem",
            height: "18.5rem",
            // height: 296,
          }}
        >
          {list.map((row, i) => (
            <div key={i} className="row">
              {row.map((item, j) => (
                <TextField
                  className={hints[i][j] !== "" ? "perm" : "normal"}
                  id="cell"
                  key={j}
                  type="text"
                  size="1"
                  maxLength="1"
                  value={item}
                  onChange={(e) => {
                    if (hints[i][j] !== solution[i][j]) {
                      let num = e.target.value;
                      return numCheck(parseInt(num))
                        ? updateList(i, j, parseInt(num))
                        : num === ""
                        ? updateList(i, j, num)
                        : null;
                    }
                  }}
                />
              ))}
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Gameboard;
