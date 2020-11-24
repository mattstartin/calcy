import React from 'react';
import Calculate from '../helpers/calculate';

export interface CalculatorState { 
    value: string, answer: string | null, valid: boolean, history: string[]
}

export default class Calculator extends React.Component<{},CalculatorState> {
    
    constructor(props: any) {
        super(props);
        this.state = {value: '', answer: null,valid:true, history:[]};

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderAnswer = this.renderAnswer.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
    }
      
    render() {
        return (
            <>
                <div id="header">Calcy</div>
                <label id="label">
                    Enter Calculation:
                    <input id="calculatorInput" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input id="calculatorButton" type="button" value="Go" disabled={!this.state.valid} onClick={this.handleClick} />
                <br />
                {this.renderAnswer()}
                <br />
                {this.renderHistory()}
            </>
        )
    }
    handleClick(event: any) {
        const { valid, value, history } = this.state
        if (valid) {
            let answer = Calculate.doCalculate(value)
            history.push(value+"="+answer)
            this.setState({answer: answer, history: history } )
        }
    }
    handleChange(event: any) {
        this.setState({value: event.target.value, valid: Calculate.isValid(event.target.value) });
    }
    renderAnswer() {
        return (
            this.state.answer && (
                <label id="answerLabel">
                    Answer:
                    <textarea id="calculatorOutput" readOnly value={this.state.answer}></textarea>
                </label>
            )
        )
    }
    renderHistory() {
        const { history } = this.state

        return ( history.length > 0 && 
            <label id="historyLabel">
                History:
                <ul id="calculatorHistory">
                    {history.slice(-50).map(function(item, idx){
                        let content = (idx+1) + ": " + item
                        return (<li id={`history_${idx}`} key={idx}>{content}</li>)
                        
                    })}
                </ul>
            </label>
          );

    }

}