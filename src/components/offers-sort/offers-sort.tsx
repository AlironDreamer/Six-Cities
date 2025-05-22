import SortOptions from '../sort-options/sort-options';
import {useState} from 'react';

const OffersSort = (): JSX.Element => {
  const [isSortOpened, setIsSortOpened] = useState(false);
  const handleSortStatus = () => {
    setIsSortOpened((prevState) => !prevState);
  };
  return (
    <form className="places__sorting" action="#" method="get" style={{width: 'fit-content'}} onMouseEnter={handleSortStatus} onMouseLeave={handleSortStatus}>
      <span className="places__sorting-caption" style={{marginRight: '5px'}}>Sort by</span>
      <SortOptions isSortOpened={isSortOpened} />
    </form>
  );
};

export default OffersSort;
