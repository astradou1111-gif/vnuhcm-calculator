import { useMemo } from 'react';
import { KHU_VUC, DOI_TUONG } from '../constants/common';
import { usePersistentCalculatorState } from './usePersistentCalculatorState';
import { checkUitLanguageBonus, roundUit } from '../constants/uit';

const INITIAL_VALUES = {
  thpt: ['', '', ''],
  thptQuickTotal: '',
  dgnl: '',
  hocBa: Array(9).fill(''),
  hocBaQuickTotal: '',
  hasLanguage: false,
  languageType: 'IELTS',
  languageScore: '',
  languageScore2: '',
  hasHsg: false,
  hsgRank: 'NONE',
  hasTinHoc: false,
  hasSpecialSchool: false,
  kv: 'KV3',
  dt: 'NONE',
};

const parseNumber = (value) => {
  const number = parseFloat(value);
  return Number.isNaN(number) ? 0 : number;
};

export const useUitCalculator = () => {
  const { values, generatedSetters, hasSavedData, clearSavedForm, exportData, importData } =
    usePersistentCalculatorState('vnuhcm-calculator:uit', INITIAL_VALUES);

  const {
    thpt,
    thptQuickTotal,
    dgnl,
    hocBa,
    hocBaQuickTotal,
    hasLanguage,
    languageType,
    languageScore,
    languageScore2,
    hasHsg,
    hsgRank,
    hasTinHoc,
    hasSpecialSchool,
    kv,
    dt,
  } = values;

  const results = useMemo(() => {
    // 1. Điểm thi ĐGNL quy về thang 100
    const rawDgnl = parseNumber(dgnl);
    const dgnl100 = roundUit((rawDgnl / 1200) * 100);

    // 2. Điểm thi THPT quy về thang 100
    const thptTotal = thptQuickTotal !== ''
      ? Math.min(30, parseNumber(thptQuickTotal))
      : thpt.reduce((total, value) => total + parseNumber(value), 0);
    const thpt100 = roundUit((thptTotal / 30) * 100);

    // 3. Điểm Học bạ quy về thang 100
    // Học bạ là điểm trung bình 3 năm THPT của 3 môn theo tổ hợp xét tuyển
    const hocBaSubjectAverages = [0, 1, 2].map((subjectIndex) => {
      const startIndex = subjectIndex * 3;
      const yr1 = parseNumber(hocBa[startIndex]);
      const yr2 = parseNumber(hocBa[startIndex + 1]);
      const yr3 = parseNumber(hocBa[startIndex + 2]);
      return (yr1 + yr2 + yr3) / 3;
    });

    const hocBaTotal = hocBaQuickTotal !== ''
      ? Math.min(30, parseNumber(hocBaQuickTotal))
      : hocBaSubjectAverages.reduce((total, value) => total + value, 0);
    const hocBa100 = roundUit((hocBaTotal / 30) * 100);

    // 4. Tính điểm học lực (ĐHL)
    // Hs1 = 47.5%, Hs2 = 47.5%, Hs3 = 5%
    const dhl = roundUit(thpt100 * 0.475 + dgnl100 * 0.475 + hocBa100 * 0.05);

    // 5. Tính Điểm cộng (Capping 10 điểm)
    let bonusLanguage = 0;
    if (hasLanguage) {
      bonusLanguage = checkUitLanguageBonus(languageType, languageScore, languageScore2);
    }

    let bonusHsg = 0;
    if (hasHsg && hsgRank === 'HSG_QG_TINH') {
      bonusHsg = 10;
    }

    let bonusTinHoc = 0;
    if (hasTinHoc) {
      bonusTinHoc = 5;
    }

    let bonusSpecialSchool = 0;
    if (hasSpecialSchool) {
      bonusSpecialSchool = 5;
    }

    const dcGoc = bonusLanguage + bonusHsg + bonusTinHoc + bonusSpecialSchool;
    const dcThucNhan = Math.min(10, dcGoc);

    // 6. Tính Điểm ưu tiên (KV và ĐT)
    const khuvuc = KHU_VUC.find((item) => item.id === kv);
    const doituong = DOI_TUONG.find((item) => item.id === dt);
    const priority30 = (khuvuc ? khuvuc.points : 0) + (doituong ? doituong.points : 0);
    const priority100 = roundUit((priority30 / 3) * 10);

    // Điểm ưu tiên thực nhận giảm dần khi tổng điểm tạm thời >= 75
    const temporaryTotal = dhl + dcThucNhan;
    let priorityAccepted = priority100;
    if (temporaryTotal >= 75) {
      priorityAccepted = roundUit(((100 - temporaryTotal) / 25) * priority100);
      if (priorityAccepted < 0) priorityAccepted = 0;
    }

    // 7. Tổng điểm xét tuyển (Capped tại 100)
    const total = roundUit(Math.min(100, dhl + dcThucNhan + priorityAccepted));

    return {
      dgnl100,
      thptTotal,
      thpt100,
      hocBaSubjectAverages: hocBaSubjectAverages.map(roundUit),
      hocBaTotal,
      hocBa100,
      dhl,
      bonusLanguage,
      bonusHsg,
      bonusTinHoc,
      bonusSpecialSchool,
      dcGoc,
      dcThucNhan,
      priority100,
      priorityAccepted,
      total,
    };
  }, [
    thpt,
    thptQuickTotal,
    dgnl,
    hocBa,
    hocBaQuickTotal,
    hasLanguage,
    languageType,
    languageScore,
    languageScore2,
    hasHsg,
    hsgRank,
    hasTinHoc,
    hasSpecialSchool,
    kv,
    dt,
  ]);

  return {
    state: {
      ...values,
      ...generatedSetters,
      hasSavedData,
      clearSavedForm,
      exportData,
      importData,
    },
    results,
  };
};


