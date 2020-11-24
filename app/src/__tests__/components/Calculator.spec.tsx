
import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import Calculator, { CalculatorState } from '../../components/Calculator';
import Adapter from 'enzyme-adapter-react-16';
import Calculate from '../../helpers/calculate';

Enzyme.configure({ adapter: new Adapter() })

describe('<Calculator />',() => {

    beforeEach(() =>{              
    });

    describe('State', () => {
        test('Initial State is correct', () => {
            let component = shallow(<Calculator />)
            let state: CalculatorState = component.state() as CalculatorState
            expect(state.value).toEqual('')
            expect(state.answer).toEqual(null)
            expect(state.valid).toBeTruthy()
            expect(state.history).toEqual([])
        })
    })

    describe('Display', () => {
        test('Calculator has header', () => {
     
            let component = mount(<Calculator />)
 
            let header = component.find('#header')
            expect(header).toHaveLength(1)
            expect(header.props().children).toEqual('Calcy')
    
        }); 
        test('Calculator has instruction label', () => {
     
            let component = mount(<Calculator />)
 
            let input = component.find('#calculatorInput')
            expect(input).toHaveLength(1)
            expect(input.prop('type')).toEqual('text')    
            expect(input.prop('value')).toEqual('')  
        }); 
        test('Go button can be disabled', () => {
     
            let component = mount(<Calculator />)
            component.setState({valid: false})
 
            let button = component.find('#calculatorButton')     
            expect(button.prop('disabled')).toBeTruthy()   

        }); 
        test('Result area not shown by default', () => {
     
            let component = mount(<Calculator />)
 
            let output = component.find('#calculatorOutput')
            expect(output).toHaveLength(0)
        }); 
        test('Result area shown when answer is in state', () => {
     
            let component = mount(<Calculator />)
            component.setState({answer: "33"})
 
            let output = component.find('#calculatorOutput')
            expect(output).toHaveLength(1) 
            expect(output.prop('value')).toEqual('33')
            expect(output.prop('readOnly')).toBeTruthy()
        }); 
        test('History area not shown by default', () => {
     
            let component = mount(<Calculator />)
 
            let output = component.find('#calculatorHistory')
            expect(output).toHaveLength(0)
        }); 
        test('History area shown when history is in state', () => {
     
            let component = mount(<Calculator />)
            component.setState({history: ["1+1=2","2*2=4"]})
 
            let output = component.find('#calculatorHistory')
            expect(output).toHaveLength(1) 
            expect(output.props().children).toHaveLength(2)

            let historyItem = component.find('#history_0')
            expect(historyItem).toHaveLength(1)
            expect(historyItem.prop('children')).toEqual("1: 1+1=2")

            historyItem = component.find('#history_1')
            expect(historyItem).toHaveLength(1)
            expect(historyItem.prop('children')).toEqual("2: 2*2=4")
        }); 
        test('History limited to 50 items', () => {
     
            let component = mount(<Calculator />)
            
            let history: string[] = []
            Array.from({length: 75},(_,idx) => history.push(idx.toString()))
            component.setState({history: history})
 
            let output = component.find('#calculatorHistory')
            expect(output).toHaveLength(1) 
            expect(output.props().children).toHaveLength(50)
        }); 
        test('History shows most recent 50 items', () => {
     
            let component = mount(<Calculator />)
            
            let history: string[] = []
            Array.from({length: 75},(_,idx) => history.push(idx.toString()))
            component.setState({history: history})
 
            let output = component.find('#calculatorHistory')

            expect(output.childAt(0).props().id).toEqual('history_0')
            expect(output.childAt(0).props().children).toEqual('1: 25')
            expect(output.childAt(49).props().id).toEqual('history_49')
            expect(output.childAt(49).props().children).toEqual('50: 74')
        }); 

    })

    describe('handleChange', () => {
        test('Changing text value sets values in state', () => {
            let component = mount(<Calculator />)

            let input = component.find('#calculatorInput')
            let changeHandler:any = input.props().onChange

            changeHandler({target: { value: "99*2" }})

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.value).toEqual('99*2')
        })
        test('Changing text value sets validity from helper', () => {
            Calculate.isValid = jest.fn().mockReturnValue(false)
            let component = mount(<Calculator />)

            let input = component.find('#calculatorInput')
            let changeHandler:any = input.props().onChange

            changeHandler({target: { value: "45+45" }})

            expect(Calculate.isValid).toHaveBeenCalledTimes(1)
            expect(Calculate.isValid).toHaveBeenCalledWith("45+45")

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.valid).toBeFalsy()
        })
    })

    describe('handleClick', () => {
        beforeEach(() => {
            Calculate.doCalculate = jest.fn().mockReturnValue("45")
        })
        test('Clicking button performs calculation', () => {

            let component = mount(<Calculator />)
            component.setState({value: "1+9", valid: true})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            expect(Calculate.doCalculate).toHaveBeenCalledTimes(1)
            expect(Calculate.doCalculate).toHaveBeenCalledWith("1+9")
        })
        test('Clicking button sets values in state', () => {
            let component = mount(<Calculator />)
            component.setState({value: "1+9", valid: true})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.answer).toEqual('45')
            expect(state.history).toEqual(['1+9=45'])
        })
        test('Further Calculations are added to history', () => {

            let component = mount(<Calculator />)
            component.setState({value: "1+9", valid: true, history:["1+1=2","2+2=4"]})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.answer).toEqual('45')
            expect(state.history).toEqual(["1+1=2","2+2=4","1+9=45"])
        })
        test('No calculations performed if not valid', () => {

            let component = mount(<Calculator />)
            component.setState({value: "1+9", valid: false, answer: "previous answer"})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            expect(Calculate.doCalculate).toHaveBeenCalledTimes(0)

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.answer).toEqual('previous answer')
        })

        test('Result is added to history', () => {

            Calculate.doCalculate = jest.fn().mockReturnValue("123.45")

            let component = mount(<Calculator />)
            component.setState({value: "10-5", valid: true})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.history).toHaveLength(1)
            expect(state.history[0]).toEqual("10-5=123.45")
        })
    })
})