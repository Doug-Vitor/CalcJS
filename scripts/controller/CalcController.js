class CalcController {

    constructor() {
        this._locale = 'pt-BR'

        this._operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayTimeAndDate();
        setInterval(() => {
            this.setDisplayTimeAndDate();
        }, 1000);
    }

    getLastOperation() {
        return this._operation[this._operation.length-1];
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    isOperator(value) {
        return ['+', '-', '*', '%', '/'].indexOf(value) > -1;
    }

    setLastOperation(value) {
        this._operation[this._operation.length-1] = value;
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else if (isNaN(value)) {
                this._operation.push(value)
            }
            else {

            }
        } else {
            this.setLastOperation(parseInt(value));
        }
    }

    execOperation(buttonValue) { 
        console.log(buttonValue)   
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
            case 'subtraçao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicaçao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                break;
            case 'ponto':
                this.addOperation('.');
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
            this.addEventListenerAll(button, "click drag", event => {
                this.execOperation(button.className.baseVal.replace("btn-", ""))
            })

            this.addEventListenerAll(button, "mouseover mousedown mouseup", event => {
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