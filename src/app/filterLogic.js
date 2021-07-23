export function sortingTodos(type, arr1, arr2) {
    switch(true) {
        case (type === "A-Z"): 
            arr1 = arr1.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
            arr2 = arr2.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
            break;
        case (type === "Z-A"): 
            arr1 = arr1.sort((a, b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0));
            arr2 = arr2.sort((a, b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0));
            break;
        case (type === "newest"): 
            arr1 = arr1.sort((a, b) => b.date.localeCompare(a.date));
            arr2 = arr2.sort((a, b) => b.date.localeCompare(a.date));
            break;
        case (type === "oldest"): 
            arr1 = arr1.sort((a, b) => a.date.localeCompare(b.date));
            arr2 = arr2.sort((a, b) => a.date.localeCompare(b.date));
            break;
        case (type === "priority_high_low"): 
            arr1 = arr1.sort((a, b) => (b.priority > a.priority) ? 1 : ((a.priority > b.priority) ? -1 : 0));
            arr2 = arr2.sort((a, b) => (b.priority > a.priority) ? 1 : ((a.priority > b.priority) ? -1 : 0));
            break;
        case (type === "priority_low_high"): 
            arr1 = arr1.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
            arr2 = arr2.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
            break;
        case (type === "due_date_upcoming"): 
            arr1 = arr1.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            arr2 = arr2.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            break;
        case (type === "due_date_distant"): 
            arr1 = arr1.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            arr2 = arr2.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        default: 
            console.log(type);
            return;
    }

    if (arr1.some(todo => todo.starred === true) || arr2.some(todo => todo.starred === true)) {
       arr1 = arr1.sort((a, b) => a.starred === true ? -1 : b.starred === true ? 1 : 0);
       arr2 = arr2.sort((a, b) => a.starred === true ? -1 : b.starred === true ? 1 : 0);
    }
}