class CalcController {

    constructor() {
        this._locale = 'pt-BR'

        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;

        this.initialize()
    }

    initialize() {
        this.setDisplayTimeAndDate();
        setInterval(() => {
            this.setDisplayTimeAndDate();
        }, 1000);
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