import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <main className="page__main page__main--not-found">
      <section className="not-found">
        <h1 className="not-found__title">Oops. Page not found :(</h1>
        <Link to="/" className="not-found__btn">Back to main page</Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
