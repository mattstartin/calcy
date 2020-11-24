
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
 
            let button = component.find('#calculatorOutput')
            expect(button).toHaveLength(0)
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
        test('Clicking button performs calculation', () => {
            Calculate.doCalculate = jest.fn().mockReturnValue("45")

            let component = mount(<Calculator />)
            component.setState({value: "1+9", valid: true})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            expect(Calculate.doCalculate).toHaveBeenCalledTimes(1)
            expect(Calculate.doCalculate).toHaveBeenCalledWith("1+9")

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.answer).toEqual('45')
        })
        test('No calculations performed if not valid', () => {
            Calculate.doCalculate = jest.fn().mockReturnValue("45")

            let component = mount(<Calculator />)
            component.setState({value: "1+9", valid: false, answer: "previous answer"})

            let button = component.find('#calculatorButton')
            let buttonClick:any = button.props().onClick
            buttonClick()

            expect(Calculate.doCalculate).toHaveBeenCalledTimes(0)

            let state: CalculatorState = component.state() as CalculatorState
            expect(state.answer).toEqual('previous answer')
        })
    })
})