import React from 'react'

export const Search = props => (
    <form onSubmit={(e) => { props.onSearchAction(e) }}>
        <div className="form-group">
            <input type="text"
                required
                className="form-control"
                value={props.name}
                onChange={(e) => { props.onSearchName(e) }}
            />
        </div>
        <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
        </div>
    </form>

)