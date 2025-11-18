import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import accountApi from '../../api/account-DyUSFbE_.js';
import AccountViewer from './AccountViewer-B7j2fHqh.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';

const AccountIdView = ({
  accountId
}) => {
  const [account, setAccount] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!accountId) {
      setAccount(null);
      return;
    }
    if (account?.id === accountId) return;
    const load = async () => {
      const account2 = await accountApi.get(accountId);
      setAccount(account2);
    };
    load();
  }, [accountId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AccountViewer, { account });
};

export { AccountIdView as default };
//# sourceMappingURL=AccountIdView-CgQEbyTf.js.map
