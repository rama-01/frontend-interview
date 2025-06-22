import React, { useRef } from 'react'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            prevCounter: 0,
        }
    }
    static getDerivedStateFromProps(props, state) {
        debugger
        if (props.counter !== undefined && props.counter !== state.prevCounter) {
            return {
                counter: props.counter,
                prevCounter: props.counter,
            }
        }
        return null
    }
    handleClick = () => {
        this.setState({
            counter: this.state.counter + 1,
        })
    }
    render() {
        return (
            <div>
                <h1 onClick={this.handleClick}>Hello, world!{this.state.counter}</h1>
            </div>
        )
    }
}
