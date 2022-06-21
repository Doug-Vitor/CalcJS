class CalcController {

    constructor() {
        this._locale = 'pt-BR'

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    pasteFromClipboard() {
        document.addEventListener('paste', event => {
            let content = event.clipboardData.getData('Text');
            this.displayCalc = parseFloat(content);
        })
    }

    copyToClipboard() {
        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();
    }

    initialize() {
        this.setDisplayTimeAndDate();
        setInterval(() => {
            this.setDisplayTimeAndDate();
        }, 1000);

        this.updateDisplay();
        this.pasteFromClipboard();
    }

    initKeyboard() {
        document.addEventListener('keyup', event => {
            switch (event.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(event.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(event.key));
                    break;

                case 'c':
                    if (event.ctrlKey) this.copyToClipboard();
                break;
            }
        })
    }

    getLastOperation() {
        return this._operation[this._operation.length-1];
    }

    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.updateDisplay()
    }

    clearEntry() {
        this._operation.pop();
        this.updateDisplay()
    }

    isOperator(value) {
        return ['+', '-', '*', '%', '/'].indexOf(value) > -1;
    }

    setLastOperation(value) {
        this._operation[this._operation.length-1] = value;
    }

    pushOperator(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    calc() {
        let last = '';
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];

            if (last) this._operation.push(last);
        }

        this.updateDisplay();
    }

    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length-1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) lastItem = isOperator ? this._lastOperator : this._lastNumber;

        return lastItem;
    }

    updateDisplay() {
        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else {
                this.pushOperator(value);
                this.updateDisplay();
            }
        }
        else {
            if (this.isOperator(value)) {
                this.pushOperator(value);
            } else {
                this.setLastOperation(this.getLastOperation().toString() + value.toString());
                this.updateDisplay();
            }
        }
    }

    addDot() {
        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === "string" && lastOperation.includes('.')) return

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperator('0.')
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.updateDisplay();
    }

    execOperation(buttonValue) {
        switch (buttonValue) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(buttonValue));
                break;
        }
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false)
        })
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach(button => {
            this.addEventListenerAll(button, "click drag", () => {
                this.execOperation(button.className.baseVal.replace("btn-", ""))
            })

            this.addEventListenerAll(button, "mouseover mousedown mouseup", () => {
                button.style.cursor = "pointer";
            })
        })
    }
    
    setDisplayTimeAndDate() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._timeEl.innerHTML = value;
    }

    get displayTime() {
        return this._dateEl.innerHTML;
    }

    set displayTime(value) {
        this._dateEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._displayCalc = value;
    }
}