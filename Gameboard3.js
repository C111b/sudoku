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
    if (array[i] === null) {
      temp.push("");
    } else {
      temp.push(array[i]);
    }
    if (temp.length === 9) {
      result.push(temp);
      temp = [];
    }
  }
  return result;
};

//checks if input is a number
const numCheck = (num) => {
  //takes a number
  if (num >= 1 && num <= 9) {
    //checks if between 1-9
    return true; //outputs true if 1-9
  }
  return false; //false if not
};

////TODOs
//1.DONE/Checking for winning conditions
//check if all values are completely filled
const isComplete = (list) => {
  //takes a list
  for (let i = 0; i < 9; i++) {
    //iterates through
    for (let j = 0; j < 9; j++) {
      if (list[i][j] === "") {
        //checks if item in list has an empty value
        return false; //outputs false if empty value is found
      }
    }
  }
  return true; //if no empty value is found throughout the list, output true
};

//check exclusivity by checking if repeat numbers in rows,cols, and boxes
//function checks if dupe in list
const hasDupe = (list) => {
  //takes a list
  let temp = new Set(list); //creates a temporary list from the set of the list
  if (temp.size < 9) {
    //as the set removes duplicates, a size < 9 would indicate that the original list of length 9 had a duplicate
    return true; //outputs true if size is less than 9
  }
  return false; // false if not, indicating that there are no duplicates
};

//checks rows are all 1 to 9 exclusively
const checkRows = (list) => {
  //takes a list
  for (let i = 0; i < 9; i++) {
    //iterates through rows
    if (hasDupe(list[i])) {
      //checks if there is a dupe in a row
      return false; // if there is then the row checker will output false
    }
  }
  return true; //outputs true if rows are exclusively 1-9
};

//checks columns are all 1 to 9 exclusively
const checkCols = (list) => {
  //takes list
  // let col = []; //creates column array
  for (let i = 0; i < 9; i++) {
    // col.push([]); //forms a row
    let col = [];
    for (let j = 0; j < 9; j++) {
      col.push(list[j][i]); //pushes the list's column into the row
    }
    if (hasDupe(col)) {
      //checks if the column has a duplicate
      return false; //outputs false if there is
    }
  }
  return true; //outputs true if no duplicates in columns
};

//checks boxes? maybe just...
const checkBoxes = (list) => {
  let temp = []; //creates a temporary array                                                BOXES 1-9
  for (let box = 0; box < 9; box++) {
    //                                                                 col1   col2   col3
    temp.push([]); //makes array rows for contents of each box         [ 0 ]  [ 1 ]  [ 2 ]
    for (let j = 0; j < 3; j++) {
      //loops through columns (3 per box)  ================= SEE =====>[ 3 ]  [ 4 ]  [ 5 ]
      for (let k = 0; k < 3; k++) {
        //additional loop for adjusting each box                       [ 6 ]  [ 7 ]  [ 8 ]
        if (box % 3 === 0) {
          //boxes at col 1 [i+j][j]
          temp[box].push(list[box + k][j]);
        }
        if (box % 3 === 1) {
          //boxes at col 2 [i-1+j][j+3]
          temp[box].push(list[box - 1 + k][j + 3]);
        }
        if (box % 3 === 2) {
          //boxes at col 3 [i-2+j][j+6]
          temp[box].push(list[box - 2 + k][j + 6]);
        }
      }
    }
    if (hasDupe(temp[box])) {
      //checks for dupes in each box
      return false; //if a dupe is found, function outputs false
    }
  }
  return true; //if no dupes found in all boxes, passes true
};

//totalling it all: const isValid
const isValid = (list) => {
  if (checkRows(list) && checkCols(list) && checkBoxes(list)) {
    return true;
  }
  return false;
};

//2.DONE/algo generates "hint" numbers on board
//algorithm to create a winning sudoku randomly
// let puzzle = makepuzzle();
// let solution = solvepuzzle(puzzle);

//3. JANKY minvp // reveal more numbers on button click
//works backward to delete items from the array * might be better
     // would have to create a function that deals with deletions for solution
     // where const delsolution(num) to indicate the number of filled in boxes
     // a inverted list for the deletions where all numbers in delsol = "" in invlist
     // ^maybe not... find a way to save the indices and make a list of indices
     // rng math.floor(math.random()indicelist.length) through indice list and add the indice
//or add items to the list that !== item from solution
// first apply numcheck to replace a non-empty item with ""
// rng1 = rng0-8 rng2 = rng0-8 list[rng1].splice(rng2,1,"")
const indexOfEmpty = (list) => {
  let array = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (list[i][j] === "") {
        array.push([i,j]);
      }
    }
  } return array;
}

//4.HELP/set it so that hints are permanent (cannot be deleted from input field)
//min leftover are 17 (hard mode)
//a slider to set number of "hints"
//hints automatically put number into box
//perhaps have 2 arrays? completed and one incomplete (player array)
//and if list[i][j] !== complete_list[i][j] add updatelist(i,j,complete_list[i][j])
//maybe just get a library that has sudokus already in it
//maybe a number skipping function?

//5./ Prettier
//6./ make arrow keys move between inputs
//7./ solution generator with backtracking?
//8./ errors: solve -> submit -> change number to wrong number -> submit still outputs congrats

// const plusOne = (array) => {
  
// }


const Gameboard = () => {
  const [puzzle, setPuzzle] = useState(makepuzzle());
  const [hints, setHints] = useState(toTwoDim(puzzle));             //hints make it so that inputs are permanent 
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

  const updateHints = (i,j,num) => {
    let tempList = hints;
    tempList[i][j] = num;
    setHints([...tempList]);
  }
  //problem : near end have to click multiple times
  // a better smarter way? 
  // const hintReveal = (list, puzzle, solution) => {
  //   let rand1 = Math.floor(Math.random() * 9);
  //   let rand2 = Math.floor(Math.random() * 9);
  //   if (numCheck(list[rand1][rand2])) {
  //     hintReveal(list,puzzle,solution);
  //   } updateList(rand1, rand2, solution[rand1][rand2]);
  // };

  // const indexOfEmpty = (list) => {
  //   let array = [];
  //   let tempList = list;
  //   for (let i = 0; i < 9; i++) {
  //     tempList.map((col) => array.push(col.indexOf("")))
  //     for (let j = 0; j < 9; j++) {
  //       tempList[j].splice(0,1,1);
  //     }
  //   } return array;
  // }

//A better way for hintReveal
  const hintReveal = (list, solution) => {
    let indices = indexOfEmpty(list);
    let index = indices[Math.floor(Math.random()*indices.length)]; 
    // updateHints(index[0], index[1], solution[index[0]][index[1]]);
    updateList(index[0], index[1], solution[index[0]][index[1]]);
  }
 

  const buttonSubmit = (list) => {
    isComplete(list) && isValid(list) ? setDone(true) : alert("Try Again!");
  };

  //testing
  //effect for submit button
  useEffect(() => {
    // console.log(solution);
    // console.log(hintReveal2(list,puzzle,solution));
    // console.log(indexOfEmpty(list).length)
    console.log(puzzle);
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
      <button onClick={() => !isComplete(list) ? hintReveal(list,solution) : null}>hint</button>
    </>
  );
};

export default Gameboard;