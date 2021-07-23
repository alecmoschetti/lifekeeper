import React from 'react';

export const FilterTodos = ({filterType, setFilterType}) => {
    return (
        <div>
            <label htmlFor="filter_select">Filter:</label>
            <select name="filter_select" id="filter_select" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority_high_low">Priority ↓</option>
                <option value="priority_low_high">Priority ↑</option>
                <option value="due_date_upcoming">Due ↓</option>
                <option value="due_date_distant">Due ↑</option>
            </select>
        </div>
    )

    };
