import React from 'react';
import Calculate from '../helpers/calculate';
import '../styles/themes.css'

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
                <div id="header" className="header">Calcy</div>
                <div className="content">
                    <label id="label">Calculation </label>
                    <input id="calculatorInput" type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                    <input id="calculatorButton" type="button" value="Go" disabled={!this.state.valid} onClick={this.handleClick} />
                    <br />
                    {this.renderAnswer()}
                    <br />
                    {this.renderHistory()}
                </div>
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

    handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter') 
            this.handleClick(event)
    }
  
    renderAnswer() {
        return (
            this.state.answer && (
                <label id="answerLabel">
                    Answer
                    <input id="calculatorOutput" readOnly value={this.state.answer}></input>
                </label>
            )
        )
    }
    renderHistory() {
        const { history } = this.state

        return ( history.length > 0 && 
            <label id="historyLabel">
                History
                <ul id="calculatorHistory" style={{transform:"rotate(180deg)"}}>
                    {history.slice(-50).map(function(item, idx){
                        let content = (idx+1) + ": " + item
                        return (<li id={`history_${idx}`} key={idx} style={{transform:"rotate(-180deg)"}}>{content}</li>)
                        
                    })}
                </ul>
            </label>
          );

    }

}