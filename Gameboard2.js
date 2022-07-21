import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";

//Helper functions
//produces an nxn array of items
const setArrays = (item, num) => {
  let arrays = [];
  for (let i = 0; i < num; i++) {
    arrays.push([]); //forms n rows
    for (let j = 0; j < num; j++) {
      arrays[i].push(item); //forms n items within rows
    }
  }
  return arrays; // returns nxn array of arrays of items
};

//converts the 1d array to a 2d array and null to empty string
const toTwoDim = (array) => {
  let result = [];
  let temp = [];
  for (let i = 0; i < array.length; i++) {
    // if (array[i] === null) {
    //   temp.push("");
    // } else {
    //   temp.push(array[i]);
    // } before weird stuff happened --- change it back if weird stuff doesn't happen

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
const hasDupe = (list) => {
  let temp = new Set(list);
  if (temp.size < 9) {
    return true;
  }
  return false;
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

//4.HELP/set it so that hints are permanent (cannot be deleted from input field)
//5./ Prettier
//6./ make arrow keys move between inputs
//7./ solution generator with backtracking?
//8./ errors: solve -> submit -> change number to wrong number -> submit still outputs congrats

// const plusOne = (array) => {
//   // array = array.map((item) => (item !== "") ? item + 1 : "")
//   array = array.map((item) => {
//     if (item !== null) {
//       return item + 1;
//     } else {
//       return "";
//     }
//   });
//   return array;
// };

const Gameboard = () => {
  const [puzzle, setPuzzle] = useState(makepuzzle());
  const [hints, setHints] = useState(toTwoDim(puzzle)); //hints make it so that inputs are permanent
  const [list, setList] = useState(setArrays("", 9));
  const [done, setDone] = useState(false);
  const solution = toTwoDim(solvepuzzle(puzzle));
  // const [num, setNum] = useState("")
  // find a way to be able to change user inputted
  // exclude IC items (permanent nums ie. "hints")

  const updateList = (i, j, num) => {
    let tempList = list;
    tempList[i][j] = num; //where to get number --> input?
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
    isComplete(list) && isValid(list) ? setDone(true) : alert("Try Again!");
  };

  //testing
  //effect for submit button
  useEffect(() => {
    // console.log(solution);
    // console.log(hintReveal2(list,puzzle,solution));
    // console.log(indexOfEmpty(list).length)
    console.log(list);
    setDone(false); //needs to be done
  }, [list]);

  //effect for new puzzle button
  useEffect(() => {
    setList(toTwoDim(puzzle));
  }, [puzzle]);

  return (
    <>
      <button onClick={() => setPuzzle(makepuzzle())}>new puzzle</button>
      <main>
        {" "}
        {list.map((row, i) => (
          <div key={i}>
            {row.map((item, j) => (
              <input
                key={j}
                type="text"
                size="1"
                maxLength="1"
                value={item}
                onChange={(e) => {
                  // if (hints[i][j] !== solution[i][j]) {
                  let num = e.target.value;
                  (numCheck(parseInt(num)) || num === "") &&
                    updateList(i, j, num);
                  // }
                }}
              />
            ))}
          </div>
        ))}
      </main>
      <button onClick={() => buttonSubmit(list)}>Submit</button>
      {done ? <div>congrats</div> : null}
      <button onClick={() => setList(toTwoDim(solvepuzzle(puzzle)))}>
        solve
      </button>
      <button
        onClick={() => (!isComplete(list) ? hintReveal(list, solution) : null)}
      >
        hint
      </button>
    </>
  );
};

export default Gameboard;
