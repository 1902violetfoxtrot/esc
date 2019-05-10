/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './UserHome';
export { default as FilesUploader } from './FilesUploader';
export { default as Instagram } from './Instagram';
export { default as TripInfoForm } from './TripInfoForm';
export { Login, Signup } from './AuthForm';
