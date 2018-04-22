import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Grow, Paper, MenuList, MenuItem } from 'material-ui';
import { searchDoQuery } from '../../../store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';


const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;

    justify-content: flex-start;
    align-items: flex-start;
    div:not(:first-child) {
        margin-top: 32px;
        max-width: 214px;
        position: absolute;
        width: inherit;
    }

    @media only screen and (max-width: 600px) {
       div:not(:first-child) {
        max-width: calc(100% - 32px);
        margin-left: 16px;
       } 
    }
`;

class Search extends Component {

    componentWillUpdate(_, nextState){
        this.isOpened = ((nextState.isFocused && nextState.query) || nextState.isOpened) || (nextState.query && nextState.isOpened)
        if (this.isOpened) {
            document.addEventListener('keydown', this.handleEscapePressed);
            document.addEventListener('click', this.handleOutsideClick);
        }
    }

    componentDidUpdate() {
        if (!this.isOpened) {
            document.removeEventListener('keydown', this.handleEscapePressed);
            document.removeEventListener('click', this.handleOutsideClick);
        }
    }

    handleOutsideClick = (e) => {
        const domSearch = ReactDOM.findDOMNode(this.refs.search)
        if (domSearch.contains(e.target)) {
            return;
        }
        this.input.blur();
        this.setState({
            isOpened: false
        });
    }

    handleEscapePressed = (e) => {
        if (e.key === 'Escape') {
            this.input.blur();
            this.setState({
                isOpened: false
            });
        }
    }

    isOpened = false

    input = React.createRef()

    state = {
        query: null,
        isFocused: false,
        isOpened: false
    }

    formatResults = () => {
        return this.props.results ? this.props.results.map((result) => {
            return (
                <MenuItem key={result.username}>{result.username}</MenuItem>
            );
        }) : null;
    }
    
    render() {
        return (
            <StyledDiv ref="search">
                <Input value={this.state.query} inputRef={ref => {
                    this.input = ref;
                }} onChange={(e) => this.setState({query: e.target.value})} {...this.props} onFocus={() => this.setState({isFocused: true})} onBlur={() => this.setState({isFocused: false})}/>
                <Grow in={this.isOpened}>
                    <Paper>
                        <MenuList>
                            {this.formatResults()}
                        </MenuList>
                    </Paper>
                </Grow>
            </StyledDiv>
        );
    }
}

const mapStateToProps = state => ({
    results: state.search.results
});

const mapDispatchToProps = dispatch => ({
    doQuery: (query) => dispatch(searchDoQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);