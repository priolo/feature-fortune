import { j as jsxRuntimeExports } from '../../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import authSo from '../../../stores/auth/repo-DDYwtmFN.js';
import { useStore as yn } from '../../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import FeatureFilterSelector from './FeatureFilterSelector-FWrPiKiy.js';
import FeatureSortSelector from './FeatureSortSelector-DCsm8TVM.js';
import FeatureStatusSelector from './FeatureStatusSelector-CYouZzS4.js';
import featureDetailSo from '../../../stores/feature/detail-31j8h-86.js';
import { useNavigate, useSearchParams } from '../../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';
import Typography from '../../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import TextField from '../../../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import InputAdornment from '../../../../node_modules/@mui/material/esm/InputAdornment/InputAdornment-C9A0Q002.js';
import IconButton from '../../../../node_modules/@mui/material/esm/IconButton/IconButton-VKzCU0qt.js';
import CloseIcon from '../../../../node_modules/@mui/icons-material/esm/Close-ByUqLdPj.js';
import Search from '../../../../node_modules/@mui/icons-material/esm/Search-BieyMsba.js';
import Button from '../../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Add from '../../../../node_modules/@mui/icons-material/esm/Add-wuZCSiqb.js';

const FeatureListHeader = () => {
  yn(authSo);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleNewFeatureClick = () => {
    featureDetailSo.clearEdit();
    navigate("/app/feature/new");
  };
  const handleFilterChange = (filter) => {
    if (filter == null) {
      delete params.filter;
      setSearchParams(params);
      return;
    }
    setSearchParams({ ...params, filter });
  };
  const handleSortChange = (sort) => {
    if (sort == null) {
      delete params.sort;
      setSearchParams(params);
      return;
    }
    setSearchParams({ ...params, sort });
  };
  const handleStatusChange = (status) => {
    if (status == null) {
      delete params.status;
      setSearchParams(params);
      return;
    }
    setSearchParams({ ...params, status });
  };
  const handleSearchChange = (search2) => {
    if (search2 == null || search2.trim() == "") {
      delete params.search;
      setSearchParams(params);
      return;
    }
    setSearchParams({ ...params, search: search2 });
  };
  const logged = !!authSo.state.user;
  const params = Object.fromEntries(searchParams.entries());
  const filterId = params.filter;
  const sortId = params.sort;
  const statusId = params.status;
  const search = params.search ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "h5", children: "FEATURES" }),
    logged && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextField,
        {
          sx: { flex: 1 },
          value: search,
          slotProps: {
            input: {
              startAdornment: /* @__PURE__ */ jsxRuntimeExports.jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { fontSize: "small" }) }),
              endAdornment: /* @__PURE__ */ jsxRuntimeExports.jsx(InputAdornment, { position: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IconButton,
                {
                  size: "small",
                  onClick: () => handleSearchChange(null),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
                }
              ) })
            }
          },
          onChange: (e) => handleSearchChange(e.target.value),
          placeholder: "Search Features..."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeatureSortSelector,
        {
          sortId,
          onChange: handleSortChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeatureFilterSelector,
        {
          filterId,
          onChange: handleFilterChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeatureStatusSelector,
        {
          statusId,
          onChange: handleStatusChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Add, {}),
          onClick: handleNewFeatureClick,
          children: "NEW"
        }
      )
    ] })
  ] });
};

export { FeatureListHeader as default };
//# sourceMappingURL=ListHeader-DPkemf-p.js.map
