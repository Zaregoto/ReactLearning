import React, { Component } from 'react';



class ControlPanel extends Component{
    constructor(props) {
        super(props);
        this.initValue = [0,10,20];
        const initSum = this.initValue.reduce((a,b) => a+b, 0);
        this.state = {
            sum: initSum
        };
        this.onCounterUpdate = this.onCounterUpdate.bind(this);

    }

    onCounterUpdate(newValue, previousValue) {
        const valueChange = newValue - previousValue;
        this.setState({sum: this.state.sum + valueChange});
    }

    render() {
        return (
            <div>
                <Counter onUpdate={this.onCounterUpdate} caption="First" initValue={this.initValue[0]}/>
                <Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValue[1]}/>
                <Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValue[2]}/>
                <hr/>
                <div>Total Count: {this.state.sum}</div>
            </div>
        )
    }
}



class Counter extends Component{

    constructor(props) {

        Counter.defaultProps = {
            initValue: 0,
            onUpdate: f => f
        };

        super(props);
        this.state = {
          count: props.initValue || 0
        };

        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    }

    onClickIncrementButton() {
        //this.setState({count: this.state.count + 1});
        this.updateCount(true);
    }

    onClickDecrementButton() {
        //this.setState({count: this.state.count - 1});
        this.updateCount(false);
    }

    updateCount(isIncrement) {
        const previousValue = this.state.count;
        const newValue = isIncrement ? previousValue + 1 : previousValue -1;
        this.setState ({count: newValue});
        this.props.onUpdate(newValue, previousValue)
    }

    render() {
        const {caption} = this.props;
        return (
            <div>
                <button onClick={this.onClickIncrementButton}>+</button>
                <button onClick={this.onClickDecrementButton}>-</button>
                <span>{caption} count :{this.state.count}</span>
            </div>
        )
    }
}

export default ControlPanel;