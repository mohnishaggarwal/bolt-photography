import ProviderLoginButton from './ProviderLoginButton';

export default function AuthenticationBlock() {
  return (
    <div className="w-2/3 rounded shadow-2xl bg-accent-100 py-2 max-w-[500px] min-w-[400px]">
      <div className="flex justify-between items-center m-4 mx-6">
        <h2 className="text-lg font-semibold">Existing or New Members</h2>
        <button>
          <p className="text-gray-400 hover:text-gray-300">Guest Access</p>
        </button>
      </div>
      <hr className="border-1 w-full border-accent-200 my-2" />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center p-4 w-full mx-2">
          <ProviderLoginButton providerName="Google" />
          <ProviderLoginButton providerName="Facebook" />
          <ProviderLoginButton providerName="Github" />
        </div>
      </div>
    </div>
  );
}
