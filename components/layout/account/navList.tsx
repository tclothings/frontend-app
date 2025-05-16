import FilterList from '../search/filter';
import { accountNavMenu } from 'app/lib/constants';

export default function NavList() {
  return <FilterList list={accountNavMenu} title="Account" showLogout={true} />;
}

