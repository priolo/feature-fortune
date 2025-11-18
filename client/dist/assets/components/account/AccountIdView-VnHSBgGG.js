import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import accountApi from "../../api/account-DvUun04q.js";
import AccountViewer from "./AccountViewer-CHbI7SBg.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
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
//# sourceMappingURL=AccountIdView-VnHSBgGG.js.map
