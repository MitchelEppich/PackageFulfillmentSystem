import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  itemBases: {},
  itemValues: {},
  expandItems: [],
  missedItems: {},
  strainArchive: {
    CKS: {
      AFM: "54",
      AFR: "95",
      AHA: "40",
      BBR: "96",
      BCF: "01",
      BIF: "02",
      BKF: "03",
      CBA: "41",
      CBD: "80",
      CBT: "81",
      CCA: "42",
      CHF: "04",
      CRF: "05",
      DAF: "43",
      DPF: "06",
      DWA: "44",
      DLF: "44",
      EMA: "45",
      FMM: "17",
      GCF: "07",
      HPF: "08",
      HXR: "97",
      JHA: "46",
      LBA: "47",
      NLA: "48",
      NYA: "49",
      OSR: "98",
      PKF: "09",
      REA: "50",
      SDF: "10",
      SGA: "51",
      SHF: "11",
      SJF: "12",
      SSF: "13",
      TWA: "52",
      WBF: "14",
      WCF: "15",
      WWA: "53",
      WWF: "16",
      GTF: "17"
    },
    SWG: {
      AOF: "01",
      BDA: "40",
      BDF: "02",
      BGA: "41",
      CDF: "03",
      CHA: "42",
      CMF: "04",
      CPF: "05",
      GSF: "06",
      JFF: "07",
      JHF: "08",
      KMF: "09",
      LVF: "10",
      MKF: "11",
      NLA: "43",
      PKA: "44",
      PPF: "12",
      PXA: "45",
      SCF: "13",
      STA: "46"
    },
    SNM: {
      AGF: "01",
      AKF: "02",
      BDA: "40",
      BYF: "03",
      BBF: "04",
      BGF: "05",
      CBA: "80",
      CBK: "81",
      CBS: "82",
      CHF: "06",
      CCF: "07",
      HGA: "41",
      JFA: "42",
      LAF: "08",
      NBA: "43",
      NLF: "09",
      OKF: "10",
      OKA: "44",
      PKA: "45",
      SCA: "46",
      STF: "11",
      WWF: "12",
      WWA: "47"
    },
    BVR: {
      BBA: "40",
      CKF: "01",
      CJF: "02",
      CHF: "03",
      CCF: "04",
      DCF: "05",
      FIA: "41",
      GGF: "06",
      GDA: "42",
      GWF: "07",
      HBF: "08",
      MWA: "43",
      PEA: "44",
      POF: "09",
      RCF: "10",
      SWA: "45",
      SGF: "11",
      SDF: "12",
      TDA: "46",
      TWA: "47"
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MULTI_ITEM_BASE:
      return updateObject(state, {
        itemBases: action.itemBases,
        itemValues: action.itemValues
      });
    case actionTypes.SET_ITEM_VALUE:
      return updateObject(state, { itemValues: action.itemValues });
    case actionTypes.MODIFY_VALUES:
      return updateObject(state, {
        itemValues: action.input.itemValues,
        itemBases: action.input.itemBases
      });
    case actionTypes.CLEAR_ITEM:
      return updateObject(state, {
        itemValues: {},
        itemBases: {},
        expandItems: [],
        missedItems: {}
      });
    case actionTypes.REMOVE_ITEM_MISSED:
      let _new = state.missedItems;
      delete _new[action.item];
      return updateObject(state, { missedItems: _new });
    case actionTypes.EXPAND_ITEM:
      return updateObject(state, { expandItems: action.input });
    case actionTypes.VERIFY_ITEM_LIST:
      return updateObject(state, { missedItems: action.input });
    default:
      return state;
  }
};
