package main

import (
	"syscall/js"
)

type Log [81]int8
type Field [9][9]int8
type PossibilitySet uint16
type Possibilities [9][9]PossibilitySet

func (p PossibilitySet) Has(val int8) bool {
	return p&(1<<(val-1)) != 0
}

func (p *PossibilitySet) Set(val int8) {
	*p |= 1 << (val - 1)
}

func (p *PossibilitySet) Clear(val int8) {
	*p &^= 1 << (val - 1)
}

var (
	// Pre-computed square boundaries
	squareStartX = [9]int{0, 0, 0, 3, 3, 3, 6, 6, 6}
	squareStartY = [9]int{0, 0, 0, 3, 3, 3, 6, 6, 6}
	squareEndX   = [9]int{3, 3, 3, 6, 6, 6, 9, 9, 9}
	squareEndY   = [9]int{3, 3, 3, 6, 6, 6, 9, 9, 9}
)

func checkRow(field *Field, x int, y int, val int8) bool {
	for iy := 0; iy < 9; iy++ {
		if y == iy {
			continue
		}
		if field[x][iy] == val {
			return false
		}
	}
	return true
}

func checkColumn(field *Field, x int, y int, val int8) bool {
	for ix := 0; ix < 9; ix++ {
		if x == ix {
			continue
		}
		if field[ix][y] == val {
			return false
		}
	}
	return true
}

func checkCell(field *Field, x int, y int, val int8) bool {
	startX := squareStartX[x]
	startY := squareStartY[y]
	endX := squareEndX[x]
	endY := squareEndY[y]

	for ix := startX; ix < endX; ix++ {
		for iy := startY; iy < endY; iy++ {
			if y == iy && x == ix {
				continue
			}
			if field[ix][iy] == val {
				return false
			}
		}
	}
	return true
}

func createPossibilities(field *Field) *Possibilities {
	var possibilities Possibilities

	for x := 0; x < 9; x++ {
		for y := 0; y < 9; y++ {
			if field[x][y] != 0 {
				continue
			}

			possibilities[x][y] = 0x1FF
			for key := 0; key < 9; key++ {
				val := int8(key + 1)
				possible := checkRow(field, x, y, val) && checkColumn(field, x, y, val) && checkCell(field, x, y, val)
				if !possible {
					possibilities[x][y].Clear(val)
				}
			}
		}
	}

	return &possibilities
}

func resetPossibilities(possibilities *Possibilities, setLog *Log) {
	for i := range setLog {
		if setLog[i] == -1 {
			continue
		}

		x := i / 9
		y := i - x*9

		key := setLog[i]
		possibilities[x][y].Set(key + 1)
		setLog[i] = -1
	}
}

func setBlock(field *Field, possibilities *Possibilities, setLog *Log, col int, row int, val int8) {
	field[col][row] = val

	key := val - 1
	for ix := 0; ix < 9; ix++ {
		if possibilities[ix][row].Has(val) {
			setLog[ix*9+row] = key
		}
		possibilities[ix][row].Clear(val)
	}
	for iy := 0; iy < 9; iy++ {
		if possibilities[col][iy].Has(val) {
			setLog[col*9+iy] = key
		}
		possibilities[col][iy].Clear(val)
	}

	startX := squareStartX[col]
	startY := squareStartY[row]
	endX := squareEndX[col]
	endY := squareEndY[row]

	for ix := startX; ix < endX; ix++ {
		for iy := startY; iy < endY; iy++ {
			if possibilities[ix][iy].Has(val) {
				setLog[ix*9+iy] = key
			}
			possibilities[ix][iy].Clear(val)
		}
	}
}

func backTrack(field *Field, possibilities *Possibilities, col int, row int) bool {
	// Increase the current step until we hit a cell that hasn't been solved yet
	pos := col*9 + row
	for pos < 81 && field[pos/9][pos%9] != 0 {
		pos++
	}
	if pos >= 81 {
		return true
	}
	col, row = pos/9, pos%9

	// Log to remember what set we did the current loop, eats more memory, but accounts for 30x faster performance over calling `createPossibilities`
	var setLog Log
	for i := range setLog {
		setLog[i] = -1
	}
	// Loop through all possible values for the current cell
	for val := int8(1); val <= 9; val++ {
		if !possibilities[col][row].Has(val) {
			continue
		}
		// Try to set the current val as a move
		setBlock(field, possibilities, &setLog, col, row, val)

		// Step next
		if backTrack(field, possibilities, col, row) {
			return true
		} else {
			field[col][row] = 0
			resetPossibilities(possibilities, &setLog)
		}
	}

	// Exhausted options in current recursion
	return false
}

func solveSudoku(this js.Value, args []js.Value) interface{} {
	// Expect a Int8Array of length 81
	input := args[0]
	if input.Length() != 81 {
		return js.ValueOf(false)
	}

	var field Field
	// Copy from TypedArray to our field
	for i := 0; i < 81; i++ {
		x := i / 9
		y := i % 9
		field[x][y] = int8(input.Index(i).Int())
	}

	// Solve
	possibilities := createPossibilities(&field)
	if !backTrack(&field, possibilities, 0, 0) {
		return js.ValueOf(false)
	}

	// Create result TypedArray
	result := js.Global().Get("Int8Array").New(81)
	for i := 0; i < 81; i++ {
		x := i / 9
		y := i % 9
		result.SetIndex(i, field[x][y])
	}

	return result
}

func registerCallbacks() {
	js.Global().Set("solveSudoku", js.FuncOf(solveSudoku))
}

func main() {
	c := make(chan struct{}, 0)
	registerCallbacks()
	<-c
}
