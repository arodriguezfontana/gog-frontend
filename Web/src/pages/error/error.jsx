import "./error.css";
const Error = () => {
  return (
    <div className="error-page-container">
      <div className='error-page'>
        <h2 className="n-500" >500</h2>
        <img src="src/assets/icons/error.svg" alt="" className="img" />
        <section className='error-page-content'>
          <img src="/src/assets/images/bear.webp" alt="bear" className="error-page-bear-image" />
          <div className="error-text-container">
            <p className="error-text">
                            Something went wrong on our end
                            We’re working to fix it :( Please visit
              <strong>
                <a href="https://support.gog.com/hc/en-us?product=gog"> report an error</a>
              </strong>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Error;
