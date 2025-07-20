import "./infoCardSkeleton.css";

const InfoCardSkeleton = () => {
  return (
    <article className="info-card-skeleton">
      <div className="info-image-skeleton"></div>
      <div className="info-card-skeleton-content">
        <div className='info-card-content-skeleton'>
          <div className="info-card-title-skeleton"></div>
          <div className="info-tags-skeleton"></div>
          <div className="info-price-skeleton"></div>
        </div>
      </div>
    </article>
  );
};

export default InfoCardSkeleton;
