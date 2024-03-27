import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

type BreadCrumbsProps = {
  plantName?: string;
};

const BreadCrumbs = ({ plantName }: BreadCrumbsProps) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '1rem' }}>
        <Link
          underline="hover"
          color="primary"
          component={NavLink}
          to="/garden"
        >
          Garden
        </Link>
        <Typography color="text.primary">
          {`${plantName?.charAt(0).toUpperCase()}${plantName?.slice(1)}`}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
