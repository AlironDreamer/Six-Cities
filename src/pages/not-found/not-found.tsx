import {Link} from 'react-router-dom';

const NotFound = (): JSX.Element => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <svg style={{marginTop: '50px'}} width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.2 18.47 10.16 4c.74-1.35 2.94-1.35 3.68 0l7.96 14.46c.64 1.17-.34 2.53-1.84 2.53H4.04c-1.5 0-2.48-1.36-1.84-2.53ZM12 9v4M12 17.02V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <h1>Ошибка 404. Страница не существует.</h1>
    <Link to="/" style={{textDecoration: 'underline'}}>Вернуться на главную</Link>
  </div>
);

export default NotFound;
