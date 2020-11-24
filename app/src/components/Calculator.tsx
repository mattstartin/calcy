import React from 'react';
import Calculate from '../helpers/calculate';

export interface CalculatorState { 
    value: string, answer: string | null, valid: boolean
}

export default class Calculator extends React.Component<{},CalculatorState> {
    
    constructor(props: any) {
        super(props);
        this.state = {value: '', answer: null,valid:true};

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
                {this.state.answer && (<textarea id="calculatorOutput" readOnly value={this.state.answer}></textarea>)}
            </>
        )
    }
    handleClick(event: any) {
        if (this.state.valid)
            this.setState({answer: Calculate.doCalculate(this.state.value)})
    }
    handleChange(event: any) {
        this.setState({value: event.target.value, valid: Calculate.isValid(event.target.value) });
      }
}