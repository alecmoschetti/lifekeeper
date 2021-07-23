import {isSameDay, parseISO, formatDistanceToNow} from 'date-fns';

const determineDueDateIsToday = (date) => isSameDay(parseISO(date), new Date()) ? 'today' : null ;
export const formatDueDate = (date) => determineDueDateIsToday(date) ? determineDueDateIsToday(date) : formatDistanceToNow(new Date(parseISO(date)), {addSuffix: true});