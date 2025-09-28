import { Button } from 'antd';
import { CiFilter } from 'react-icons/ci';

const FilterButton = ({ onClick }) => {
    return (
        <Button
            color="primary"
            variant="outlined"
            onClick={onClick}
            className="flex items-center gap-1"
        >
            <CiFilter className="size-4" />
            Bộ lọc
        </Button>
    );
};

export default FilterButton;
