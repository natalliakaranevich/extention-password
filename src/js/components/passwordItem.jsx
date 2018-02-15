import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { convertPassword } from '../helpers';

class PasswordItem extends Component {
    constructor() {
        super();

        this.state = {
            showPassword: false
        };
    }

    triggerPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        const { showPassword } = this.state;
        const { item, index, removeCredentials, offerSave, saveCredentials, cancel, addToBlackList, message } = this.props;

        return !message ? <ul className="item">
            <li>Url: <i>{item.url}</i></li>
            <li>Username: <i>{item.email}</i></li>
            <li>
                {!offerSave ? (
                        <div className="password">
                            <span>Password: </span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{!showPassword ? convertPassword(item.password) : item.password}</span>&nbsp;&nbsp;
                            <div onClick={() => this.triggerPassword()}
                                 className="see-password">
                                {!showPassword ? (
                                        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDkzMi4xNSA5MzIuMTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDkzMi4xNSA5MzIuMTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDY2LjA3NSwxNjEuNTI1Yy0yMDUuNiwwLTM4Mi44LDEyMS4yLTQ2NC4yLDI5Ni4xYy0yLjUsNS4zLTIuNSwxMS41LDAsMTYuOWM4MS40LDE3NC44OTksMjU4LjYwMSwyOTYuMSw0NjQuMiwyOTYuMSAgIHMzODIuOC0xMjEuMiw0NjQuMi0yOTYuMWMyLjUtNS4zLDIuNS0xMS41LDAtMTYuOUM4NDguODc1LDI4Mi43MjUsNjcxLjY3NSwxNjEuNTI1LDQ2Ni4wNzUsMTYxLjUyNXogTTQ2Ni4wNzUsNjc2LjIyNiAgIGMtMTE2LjEsMC0yMTAuMS05NC4xMDEtMjEwLjEtMjEwLjEwMWMwLTExNi4xLDk0LjEtMjEwLjEsMjEwLjEtMjEwLjFjMTE2LjEsMCwyMTAuMSw5NC4xLDIxMC4xLDIxMC4xICAgUzU4Mi4wNzUsNjc2LjIyNiw0NjYuMDc1LDY3Ni4yMjZ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8Y2lyY2xlIGN4PSI0NjYuMDc1IiBjeT0iNDY2LjAyNSIgcj0iMTM0LjUiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                                ) : (
                                        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTcuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM3OS41NjEgMzc5LjU2MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzc5LjU2MSAzNzkuNTYxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxwYXRoIGQ9Ik0zMjAuODM4LDEyMS45MjljLTcuMzIxLTUuNjc3LTE1LjYwNC0xMS42MS0yNC42NjQtMTcuMzYyTDM0MS40OTgsNTguNmM2LjIwNC02LjI5Miw2LjEzMy0xNi40MjMtMC4xNi0yMi42MjcgIGMtNi4yOTItNi4yMDQtMTYuNDIyLTYuMTM0LTIyLjYyNiwwLjE1OUwyNjcuMTIsODguNDU2Yy0yMy4yNTMtMTEuMDE4LTQ5LjU4Ny0xOC45NjMtNzcuMTkyLTE4Ljk2M2wtMC45OTEsMC4wMDMgIGMtNTIuMjYyLDAuMzY5LTk5Ljk4MSwyOS45MzItMTMwLjgxLDU0LjY2N0MyNy42MzIsMTQ4LjYzMS0wLjA3MywxODAuMzIsMCwxOTAuNjQ5YzAuMDgyLDExLjcwMiwyNi45ODEsNDIuMjM0LDU4LjczNyw2Ni42NzEgIGM2LjY0Niw1LjExNCwxNS4wNzMsMTEuMTQ1LDI0Ljg3NSwxNy4yNDlMMzcuODcsMzIwLjk2MmMtNi4yMDQsNi4yOTItNi4xMzMsMTYuNDIzLDAuMTYsMjIuNjI3ICBjMy4xMTcsMy4wNzQsNy4xNzUsNC42MDcsMTEuMjMzLDQuNjA3YzQuMTMyLDAsOC4yNjMtMS41OTEsMTEuMzk0LTQuNzY2bDUyLjIxLTUyLjk1MWMyMi42NjYsMTAuNTM1LDQ5LjEwMSwxOC42NTEsNzYuNzUyLDE4LjY1MSAgbDEuMDA3LTAuMDAzYzU1LjUyNS0wLjM5MiwxMDUuNzc2LTMzLjU2NiwxMzAuNzg4LTUzLjMwN2MzMS42MDMtMjQuOTQyLDU4LjIzMS01Ni4wMTEsNTguMTQ4LTY3Ljg0NSAgQzM3OS40ODQsMTc2Ljk4OCwzNTIuMDQzLDE0Ni4xMjYsMzIwLjgzOCwxMjEuOTI5eiBNMTExLjMxNCwxODkuODY0Yy0wLjMwNS00My4zMzYsMzQuNTc4LTc4LjcxNCw3Ny45MTMtNzkuMDE5ICBjMTUuOTc1LTAuMTEzLDMwLjg2LDQuNTY5LDQzLjMxNCwxMi42ODFsLTEwNy45MzgsMTA5LjQ3QzExNi4zMTgsMjIwLjY1NywxMTEuNDI3LDIwNS44MzksMTExLjMxNCwxODkuODY0eiBNMTkwLjMzNCwyNjcuNzc3ICBjLTE1Ljc4NCwwLjExMS0zMC41LTQuNDYyLTQyLjg2My0xMi4zOTZsMTA3Ljc3Ny0xMDkuMzA4YzguMTA3LDEyLjI1LDEyLjg4NywyNi45LDEyLjk5OSw0Mi42ODQgIEMyNjguNTUyLDIzMi4wOTQsMjMzLjY2OSwyNjcuNDcyLDE5MC4zMzQsMjY3Ljc3N3oiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="/>
                                )}
                            </div>
                        </div>
                ) : (
                        <span>Password: <i>{item.password}</i></span>
                )}
            </li>
            <br/>
            <li>
                {offerSave ? <div style={{ display: 'flex' }}>
                    <button onClick={() => saveCredentials(item)}>Yes</button>
                    <button onClick={() => cancel()} style={{ marginLeft: 10 }}>No</button>
                    <button onClick={() => addToBlackList(item.url)} style={{ marginLeft: 10 }}>
                        Never for this site
                    </button>
                </div> : <a title="Remove credentials" href="#" className="cross" onClick={(e) => removeCredentials(e, index)}>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIxMi45ODIgMjEyLjk4MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjEyLjk4MiAyMTIuOTgyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnIGlkPSJDbG9zZSI+Cgk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7IiBkPSJNMTMxLjgwNCwxMDYuNDkxbDc1LjkzNi03NS45MzZjNi45OS02Ljk5LDYuOTktMTguMzIzLDAtMjUuMzEyICAgYy02Ljk5LTYuOTktMTguMzIyLTYuOTktMjUuMzEyLDBsLTc1LjkzNyw3NS45MzdMMzAuNTU0LDUuMjQyYy02Ljk5LTYuOTktMTguMzIyLTYuOTktMjUuMzEyLDBjLTYuOTg5LDYuOTktNi45ODksMTguMzIzLDAsMjUuMzEyICAgbDc1LjkzNyw3NS45MzZMNS4yNDIsMTgyLjQyN2MtNi45ODksNi45OS02Ljk4OSwxOC4zMjMsMCwyNS4zMTJjNi45OSw2Ljk5LDE4LjMyMiw2Ljk5LDI1LjMxMiwwbDc1LjkzNy03NS45MzdsNzUuOTM3LDc1LjkzNyAgIGM2Ljk4OSw2Ljk5LDE4LjMyMiw2Ljk5LDI1LjMxMiwwYzYuOTktNi45OSw2Ljk5LTE4LjMyMiwwLTI1LjMxMkwxMzEuODA0LDEwNi40OTF6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="/>
                </a>}
            </li>

        </ul> : <p className="message success">{message}</p>;
    }
}

PasswordItem.propTypes = {
    removeCredentials: PropTypes.func,
    saveCredentials: PropTypes.func,
    cancel: PropTypes.func,
    addToBlackList: PropTypes.func,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    message: PropTypes.any,
    offerSave: PropTypes.bool
};

export default PasswordItem;
