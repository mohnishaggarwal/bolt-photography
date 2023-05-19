import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import classNames from 'classnames';

function IconMap(menuItemName: string) {
  switch (menuItemName) {
    case 'Library':
      return <HomeIcon color="info" />;
    case 'Favorites':
      return <FavoriteBorderIcon color="info" />;
    case 'Recently Added':
      return <AccessTimeIcon color="info" />;
    case 'Hidden':
      return <VisibilityOffIcon color="info" />;
    case 'Trash':
      return <DeleteOutlineIcon color="info" />;
  }
}

export default function SidebarItem({
  name,
  selected,
  changeSelection,
}: {
  name: string;
  selected: boolean;
  changeSelection: (menuItem: string) => void;
}) {
  return (
    <div
      className={classNames(
        'w-full py-2 flex items-center justify-center hover:bg-accent-300',
        { 'bg-accent-300': selected },
        { 'cursor-pointer': !selected }
      )}
      onClick={() => changeSelection(name)}
    >
      <div className="w-3/5 flex items-center">
        {IconMap(name)}
        <p className="text-md ml-4">{name}</p>
      </div>
    </div>
  );
}
