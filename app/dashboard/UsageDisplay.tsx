import StorageIcon from '@mui/icons-material/Storage';
import Meter from './Meter';

export default function UsageDisplay() {
  return (
    <div className="flex flex-col">
      <div className="w-full py-2 flex items-center justify-center">
        <div className="w-3/5 flex items-center">
          <StorageIcon color="info" />
          <p className="text-md ml-4">Usage</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center text-white">
        <Meter fillAmount={'50'} />
      </div>
    </div>
  );
}
