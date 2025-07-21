import { Link } from 'react-router-dom';
import './BreadcrumbsStyle.css';
import { capitalizar } from '@/Theme/GlobalTheme';

export const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <Link to="/catalogo" className="breadcrumb-link">
            Inicio
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            <span className="breadcrumb-separator"></span>
            {index === items.length - 1 ? (
              <span className="breadcrumb-current" aria-current="page">
                {capitalizar(item.nombre)}
              </span>
            ) : (
              <Link to={item.url} className="breadcrumb-link">
                {capitalizar(item.nombre)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
