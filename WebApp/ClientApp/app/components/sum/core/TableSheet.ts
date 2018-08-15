export class TableSheet {

    // Input
    input: Array<any>;
    private structure: any;

    // Local
    private isCtrlDown: boolean;
    private selectedField: any;
    private selectedDate: any;
    private selectedSum: any;
    private selectedLevel: any;
    private selectedCol: any;

    constructor(structure: any) {
        this.input = [];
        this.structure = structure;
        this.isCtrlDown = false;

        this.selectedDate = 0;
        this.selectedSum = null;
        this.selectedLevel = 0;
        this.selectedCol = 0;
        this.selectedField = this.structure.levels[this.selectedLevel].fields[this.selectedCol];
    }

    public OnKeyUp(event: any): void {
        // Ctrl button
        if (event.keyCode === 17) {
            this.isCtrlDown = false;
        }
    }

    public OnKeyDown(event: any): void {

        // Ctrl button
        if (event.keyCode === 17) {
            this.isCtrlDown = true;
        }

        // Enter button
        if (event.keyCode === 13 && this.selectedField.type === 'button') {
            if (this.selectedField.action != null) {
                this.selectedField.action(this);
                console.log("Action ran.");
            }
        }

        // Ctrl + Arrow buttons
        if (this.isCtrlDown === true) {
            if (event.code === 'ArrowUp') {
                if (this.selectedSum == null && this.selectedLevel == 0) { // On head
                    if (this.selectedDate - 1 >= 0 && this.input[this.selectedDate - 1].Data.length > 0) { // Go to sum
                        this.selectedSum = this.input[this.selectedDate - 1].Data.length - 1;
                        this.selectedDate -= 1;
                        this.selectedCol = 0; // reset to beginning
                        this.selectedLevel = 1;
                    } else { // Go to head
                        if ((this.selectedDate - 1) >= 0) {
                            (this.selectedLevel = 0);
                            this.selectedDate -= 1;
                        }
                    }
                } else if (this.selectedSum != null && this.selectedLevel == 1) { // On sum
                    if ((this.selectedSum - 1) >= 0) { // Go to sum
                        this.selectedSum -= 1;
                    } else { // Go to head
                        this.selectedLevel = 0;
                        this.selectedCol = 0; // reset to beginning
                        this.selectedSum = null;
                    }
                }
            } else if (event.code === 'ArrowRight') {
                if ((this.selectedCol + 1) < this.structure.levels[this.selectedLevel].fields.length)
                    this.selectedCol++;
            } else if (event.code === 'ArrowDown') {
                if (this.selectedSum == null && this.selectedLevel == 0) { // On head
                    if (this.input[this.selectedDate].Data.length > 0) { // Go to sum
                        this.selectedLevel = 1;
                        this.selectedCol = 0; // reset to beginning
                        this.selectedSum = 0;
                    } else { // Go to head
                        if ((this.selectedDate + 1) < this.input.length) {
                            (this.selectedLevel = 0);
                            this.selectedDate += 1;
                        }
                    }
                } else if (this.selectedSum != null && this.selectedLevel == 1) { // On head
                    if ((this.selectedSum + 1) < this.input[this.selectedDate].Data.length) { // Go to sum
                        this.selectedSum += 1;
                    } else { // Go to head
                        if ((this.selectedDate + 1) < this.input.length) {
                            this.selectedLevel = 0;
                            this.selectedCol = 0; // reset to beginning
                            this.selectedDate += 1;
                            this.selectedSum = null;
                        }

                    }
                }
            } else if (event.code === 'ArrowLeft') {
                if ((this.selectedCol - 1) >= 0)
                    this.selectedCol--;
            }

            this.selectedField = this.structure.levels[this.selectedLevel].fields[this.selectedCol];
        }
    }
}