import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import accountApi from "../../api/account-BmJ7MWCd.js";
import AccountViewer from "./AccountViewer-BXau98DW.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
const AccountIdView = ({
  accountId
}) => {
  const [account, setAccount] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!accountId) {
      setAccount(null);
      return;
    }
    if ((account == null ? void 0 : account.id) === accountId) return;
    const load = async () => {
      const account2 = await accountApi.get(accountId);
      setAccount(account2);
    };
    load();
  }, [accountId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AccountViewer, { account });
};
export {
  AccountIdView as default
};
//# sourceMappingURL=AccountIdView-CkQIUX11.js.map
