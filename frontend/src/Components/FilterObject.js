import React from 'react'

export const FilterObject = (props) => (
    <form onSubmit={(e) => { props.onSubmitFilter(e) }}>
        <div className="form-group">
            <label>Department: </label>
            <select
                required
                className="form-control"
                value={props.departmentFilter}
                onChange={(e) => { props.FilterDepartmentData(e) }}>
                {
                    props.departments.map(function (department) {
                        return <option
                            key={department}
                            value={department}>{department}
                        </option>;
                    })
                }
            </select>
        </div>
        <div className="form-group">
            <input type="submit" value="Filter" className="btn btn-primary" />
        </div>
    </form>
)

