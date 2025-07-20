import "./notFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className='not-found'>
        <img src="/src/assets/images/404.webp" alt="404 not found" className="not-found-image" />
        <section className='not-found-content'>
          <img src="/src/assets/images/bear.webp" alt="bear" className="not-found-bear-image" />
          <p>
            The page you‘re <br />
            trying to reach does not
            exist :( Check the address or
            <strong>
              <a href="https://support.gog.com/hc/en-us?product=gog"> report an error</a>
            </strong>
          </p>
        </section>
      </div>
    </div>

  );
};

export default NotFound;
