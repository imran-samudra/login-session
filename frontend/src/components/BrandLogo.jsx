const BrandLogo = ({ compact = false, light = false }) => (
  <div className={`brand-logo ${compact ? 'brand-logo-compact' : ''} ${light ? 'brand-logo-light' : ''}`} aria-label="Ritelio">
    <svg className="brand-symbol" viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path className="brand-symbol-bg" d="M10 4h28a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6Z"/>
      <path className="brand-symbol-awning" d="M12 15h24l-2.6 7.1a4.2 4.2 0 0 1-7.4 1.1 4.2 4.2 0 0 1-7.4-1.1L12 15Z"/>
      <path className="brand-symbol-chart" d="M15 34.5l5-5 4 3 8.5-8.5"/>
      <path className="brand-symbol-arrow" d="M28.5 24H33v4.5"/>
    </svg>
    {!compact && <span className="brand-word">Ritel<span>io</span></span>}
  </div>
);
export default BrandLogo;
