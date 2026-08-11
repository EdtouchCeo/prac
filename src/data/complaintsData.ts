import { CategoryOption, ComplaintTemplate, PrivacyRuleTip } from '../types';

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'ALL',
    label: '전체 민원',
    shortLabel: '전체',
    iconName: 'LayoutGrid',
    description: '모든 학교 민원 대응 템플릿 검색 및 조회',
    badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
  },
  {
    id: 'GRADES',
    label: '성적·수행평가',
    shortLabel: '성적·평가',
    iconName: 'GraduationCap',
    description: '지필고사, 수행평가 점수 산정, 생기부 기록 이의신청',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    id: 'STUDENT_LIFE',
    label: '생활지도·상담',
    shortLabel: '생활지도',
    iconName: 'HeartHandshake',
    description: '용의복장, 스마트폰 사용, 소지품, 교우관계 및 상담',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    id: 'SCHOOL_VIOLENCE',
    label: '학교폭력·예방',
    shortLabel: '학교폭력',
    iconName: 'ShieldAlert',
    description: '학폭 사안 접수, 자체해결, 긴급분리 및 심의위 절차',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  },
  {
    id: 'TEACHER_RIGHTS',
    label: '교권보호·교육활동',
    shortLabel: '교권보호',
    iconName: 'UserCheck',
    description: '정당한 생활지도, 교권 침해 방지, 근무시간 외 민원 제한',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  },
  {
    id: 'ADMIN_ATTENDANCE',
    label: '출결·행정',
    shortLabel: '출결·행정',
    iconName: 'CalendarCheck',
    description: '교외체험학습, 미인정결석, 출석인정 증빙서류 안내',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  },
  {
    id: 'MEALS_FACILITIES',
    label: '급식·시설·안전',
    shortLabel: '급식·시설',
    iconName: 'Utensils',
    description: '알레르기 대체식, 시설물 관리, 등하굣길 안전 통학',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
  },
];

export const INITIAL_COMPLAINT_TEMPLATES: ComplaintTemplate[] = [
  {
    id: 'grade-01',
    title: '수행평가 점수 산정 및 감점 기준 이의제기 답변',
    category: 'GRADES',
    categoryLabel: '성적·수행평가',
    keywords: ['수행평가', '점수산정', '감점기준', '채점기준표', '이의신청', '학업성적관리위'],
    summary: '학부모의 수행평가 점수 및 감점 처리 이의제기에 대해 공정 채점기준표와 학업성적관리규정에 근거하여 정중히 안내하는 표준 답변입니다.',
    relatedLaws: [
      {
        title: '초·중등교육법 시행령',
        codeOrArticle: '제9조 및 제59조(학생의 평가)',
        summary: '학교의 장은 학생의 학업성취도 평가 기준을 학업성적관리위 심의를 거쳐 사전에 공개하고 엄정하게 시행해야 합니다.',
        keyPoints: [
          '평가계획 및 채점기준표(Rubric) 사전 안내 의무',
          '학업성적관리위원회를 통한 이의신청 심의 산하 체계'
        ]
      },
      {
        title: '시·도교육청 학업성적관리 시행지침',
        codeOrArticle: '평가 이의신청 및 정정 절차',
        summary: '평가 결과에 이의가 있는 경우 지정된 이의신청 기간 내에 서면으로 접수받아 교과협의회 및 성적관리위 심의를 거칩니다.',
        keyPoints: [
          '교과협의회 객관적 재검토',
          '개인별 평가 채점표 및 피드백 기록 확인'
        ]
      }
    ],
    privacyAlerts: [
      '학생 실명 대신 반드시 익명 또는 별명(예: A학생)을 사용하십시오.',
      '타 학생의 수행평가 점수나 상대적 비교 수치는 공개할 수 없습니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함/호칭',
        placeholder: '예: 김철수 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'studentAlias',
        label: '학생 별명/익명 표기',
        placeholder: '예: A학생 (실명 작성 금지)',
        defaultValue: 'A학생'
      },
      {
        key: 'subjectName',
        label: '해당 교과목명',
        placeholder: '예: 2학년 1학기 국어',
        defaultValue: '해당 과목'
      },
      {
        key: 'assessmentTitle',
        label: '수행평가 영역/영역명',
        placeholder: '예: 독서 논술 포트폴리오 평가',
        defaultValue: '수행평가 영역'
      },
      {
        key: 'reviewDate',
        label: '교과협의회/검토 일자',
        placeholder: '예: 2026년 4월 15일',
        defaultValue: '2026년 O월 O일'
      },
      {
        key: 'teacherContact',
        label: '담당 부서 및 상담 가능 시간',
        placeholder: '예: 교무실 / 평일 15:30~16:30',
        defaultValue: '교무실 (02-XXX-XXXX)'
      }
    ],
    templateText: `안녕하십니까, [parentName].
항상 학교 교육활동에 많은 관심과 성원을 보내주셔서 깊이 감사드립니다.

보내주신 [studentAlias]의 [subjectName] 교과 [assessmentTitle] 수행평가 점수 산정 및 채점 기준에 관한 문의 사항을 신중하게 확인하였습니다.

본교의 모든 수행평가는 교육부 및 시·도교육청의 [학업성적관리 시행지침]과 본교 [학업성적관리규정]에 따라 학기 초 사전 공개된 평가 기준표(Rubric)에 기초하여 엄격하고 객관적으로 진행되고 있습니다.

[parentName]께서 문의해 주신 [assessmentTitle] 항목에 대해, 담당 교과 교사진은 [reviewDate]에 교과협의회를 개최하여 [studentAlias]의 수행평가 제출물과 사전 고지된 채점 기준 요소(내용의 완성도, 논리성, 제출 기한 등)를 다각도로 재검토하였습니다.

검토 결과, 본 평가 항목은 모든 학생에게 동일하게 적용된 세부 채점기준표에 의거하여 정당하게 평가되었음을 안내드립니다. 관련 채점 항목별 구체적인 피드백 및 학생의 작성 결과물 확인을 원하실 경우, 학교 방문 상담 신청을 통해 담당 교사와 객관적 기준을 직접 확인하실 수 있습니다.

학교는 앞으로도 모든 평가 과정에서 공정성과 객관성을 최우선으로 준수하여 학생들이 성찰하고 성장할 수 있도록 최선을 다하겠습니다.

추가적인 문의나 방문 상담 신청은 [teacherContact]으로 연락해 주시면 성심껏 안내해 드리겠습니다.

감사합니다.

[담당 교사 및 학교 드림]`,
    recommendedTone: '공정하고 정중하며 원칙적인 어조'
  },
  {
    id: 'grade-02',
    title: '지필고사 출제 및 채점 이의신청 공식 답변',
    category: 'GRADES',
    categoryLabel: '성적·수행평가',
    keywords: ['지필고사', '중간고사', '기말고사', '출제오류', '정답이의', '복수정답', '학업성적관리위원회'],
    summary: '지필고사 문항 출제 오류 또는 정답 이의신청에 대해 교과협의회 심의 결과 및 정답 확정 절차를 설명하는 표준 답변입니다.',
    relatedLaws: [
      {
        title: '학교 학업성적관리규정',
        codeOrArticle: '제15조(지필평가 문제 출제 및 정정)',
        summary: '지필고사 이의제기 기간에 접수된 문항에 대해서는 동일 교과 교사 전원이 참석하는 교과협의회 심의를 통해 정정 여부를 결정합니다.',
        keyPoints: [
          '이의신청 기간 내 서면 접수 원칙',
          '교과협의회 재심의 및 학업성적관리위 최종 확정'
        ]
      }
    ],
    privacyAlerts: [
      '이의신청을 제기한 학생 및 학부모 신원은 타인에게 공개하지 않습니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'studentAlias',
        label: '학생 별명',
        placeholder: '예: B학생',
        defaultValue: 'B학생'
      },
      {
        key: 'examTitle',
        label: '시험명 및 교과',
        placeholder: '예: 1학기 중간고사 수학 I',
        defaultValue: '1학기 정기고사'
      },
      {
        key: 'questionNum',
        label: '이의제기 문항 번호',
        placeholder: '예: 객관식 14번 문항',
        defaultValue: 'O번 문항'
      },
      {
        key: 'decisionResult',
        label: '심의 결정 내용',
        placeholder: '예: 원안 정답 유지를 결정함 / 정답 정정 인정',
        defaultValue: '원안 정답 유지 결정'
      },
      {
        key: 'committeeDate',
        label: '교과협의회 개최일',
        placeholder: '예: 2026년 5월 8일',
        defaultValue: '2026년 O월 O일'
      }
    ],
    templateText: `안녕하십니까, [parentName].
본교 교육활동에 관심과 협조를 보내주셔서 감사드립니다.

[examTitle] [questionNum]에 대해 제출해주신 이의신청 건에 관하여 교과협의회 검토 결과를 안내드립니다.

본교는 지필고사 출제 및 채점의 객관성을 확보하기 위해 이의신청 접수 후 [committeeDate] 해당 과목 교사 전원이 참여하는 교과협의회를 긴급 소지하였습니다.

관련 시중 서적, 학술적 검토 자료, 교육과정 출제 범위 등을 종합적으로 재검토한 결과, [questionNum]은 다음과 같이 심의 의결되었습니다.

[심의 결과 요약]
- 대상 문항: [examTitle] [questionNum]
- 심의 결과: [decisionResult]
- 세부 사유: 해당 문항은 교육과정 성취기준에 부합하며, 제시된 성취 기준과 조건에 비추어 타당한 학술적 근거에 기반하여 출제되었음을 재확인하였습니다.

학생들의 노력이 공정하게 평가받을 수 있도록 본교는 성적 관리 절차를 철저히 이행하고 있습니다. 심의에 대한 세부 성취기준 설명이 필요하신 경우 언제든 교무실로 문의해 주시기 바랍니다.

감사합니다.`,
    recommendedTone: '명확하고 법적/절차적 정당성을 갖춘 어조'
  },
  {
    id: 'life-01',
    title: '스마트폰 소지 제한 및 생활지도 조치 이의제기 답변',
    category: 'STUDENT_LIFE',
    categoryLabel: '생활지도·상담',
    keywords: ['스마트폰', '소지제한', '생활지도', '학교생활규정', '수업권보호', '학습권'],
    summary: '수업 중 스마트폰 사용 제한 및 분리 보관 조치에 대해 학교생활규정 및 정당한 학생생활지도 고시에 근거하여 답변하는 템플릿입니다.',
    relatedLaws: [
      {
        title: '교원의 학생생활지도에 관한 고시',
        codeOrArticle: '제12조(특수소지품의 분리 보관)',
        summary: '교원은 수업권을 보장하고 타 학생의 학습권을 침해하는 휴대 전화 등 휴대전자기기를 분리 보관할 수 있습니다.',
        keyPoints: [
          '수업 중 휴대전화 사용 제한권 명시',
          '주의 및 경고 후 분리 보관 절차의 정당성'
        ]
      },
      {
        title: '초·중등교육법',
        codeOrArticle: '제20조의2(학교의 장 및 교원의 학생생활지도)',
        summary: '교원은 학생의 인권을 존중하되, 학칙으로 정하는 바에 따라 학생을 지도할 수 있습니다.',
        keyPoints: [
          '교원의 정당한 생활지도 권한'
        ]
      }
    ],
    privacyAlerts: [
      '학생의 지도 과정 중 발생한 구체적 상황을 서술할 때 비하적인 표현을 피하고 사실에 기반하여 기재합니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'studentAlias',
        label: '학생 별명',
        placeholder: '예: C학생',
        defaultValue: 'C학생'
      },
      {
        key: 'guidanceDate',
        label: '생활지도 실시 일자',
        placeholder: '예: 2026년 3월 24일',
        defaultValue: '2026년 O월 O일'
      },
      {
        key: 'schoolRuleName',
        label: '관련 학칙 규정명',
        placeholder: '예: OO중학교 학교생활규정 제18조',
        defaultValue: '본교 학교생활규정'
      },
      {
        key: 'returnTime',
        label: '반납/수령 예정 시각',
        placeholder: '예: 종례 후 보호자 수령 또는 학생 귀가 시 반납',
        defaultValue: '일과 종료 후 반납'
      }
    ],
    templateText: `안녕하십니까, [parentName].
[studentAlias]의 학교 생활과 학습 환경 조성을 위해 보내주신 말씀 감사드립니다.

[guidanceDate]에 실시된 [studentAlias]의 교내 스마트폰 분리 보관 조치와 관련하여 안내 말씀 드립니다.

교육부 고시 [교원의 학생생활지도에 관한 고시] 제12조 및 [schoolRuleName]에 따라, 교사는 수업 집중도 향상과 전체 학생의 학습권 및 수업권을 보호하기 위해 수업 중 휴대전자기기 사용을 제한하고 필요한 경우 분리 보관할 수 있습니다.

당일 조치는 [studentAlias]에게 사전에 주의 및 안내 후 이루어진 정당한 생활지도 절차였으며, 학생의 물품은 안전하게 보관되었습니다.

[studentAlias]이 건강한 디지털 기기 사용 습관을 기르고 학업에 전념할 수 있도록 가정에서도 함께 지도해 주시기를 부탁드립니다. 분리 보관된 물품은 [returnTime] 규정에 따라 전달될 예정입니다.

추가적인 지도 방안이나 상담이 필요하시면 언제든지 연락 주시기 바랍니다.

감사합니다.`,
    recommendedTone: '따뜻하면서도 정당한 교육 권한을 지키는 어조'
  },
  {
    id: 'violence-01',
    title: '학교폭력 신고 접수 및 학교 자체 해결 조건 안내',
    category: 'SCHOOL_VIOLENCE',
    categoryLabel: '학교폭력·예방',
    keywords: ['학교폭력', '학폭접수', '학교자체해결', '전담기구', '피해학생', '가해학생'],
    summary: '학교폭력 사안 신고 접수 사실을 알리고, 법률에 명시된 학교장 자체해결 요건과 전담기구 조사 절차를 안내하는 템플릿입니다.',
    relatedLaws: [
      {
        title: '학교폭력예방 및 대책에 관한 법률',
        codeOrArticle: '제13조의2(학교의 장의 자체해결)',
        summary: '피해학생 및 보호자가 심의위원회 개최를 원하지 않고, 2주 이상 신체·정신적 치료를 요하는 진단서를 발급받지 않은 경우 학교장 자체해결이 가능합니다.',
        keyPoints: [
          '4가지 요건: 2주 미만 치료, 재산상 피해 없거나 즉시 복구, 지속적이지 않음, 보복행위 아님',
          '피해학생 및 보호자의 서면 동의 필요'
        ]
      }
    ],
    privacyAlerts: [
      '★ 엄격 주의: 상대방 학생의 실명, 학번, 인적사항은 절대 상대측 보호자에게 언급할 수 없습니다. (A학생, B학생 등으로 표기)',
      '학교폭력 관련 사안 기록은 개인정보보호법에 따라 비밀 유지 의무가 적용됩니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 보호자님',
        defaultValue: '보호자님'
      },
      {
        key: 'studentAlias',
        label: '자녀 별명 표기',
        placeholder: '예: D학생',
        defaultValue: 'D학생'
      },
      {
        key: 'incidentDate',
        label: '사안 신고/인지 일자',
        placeholder: '예: 2026년 4월 10일',
        defaultValue: '2026년 O월 O일'
      },
      {
        key: 'investigationPeriod',
        label: '전담기구 사안조사 기간',
        placeholder: '예: 2026년 4월 11일 ~ 4월 17일',
        defaultValue: '신고 접수일로부터 7일 이내'
      },
      {
        key: 'counselorContact',
        label: '학폭 전담 교사/부서 연락처',
        placeholder: '예: 생활안전부 02-XXX-XXXX',
        defaultValue: '학생생활안전부'
      }
    ],
    templateText: `안녕하십니까, [parentName].
[studentAlias] 보호자님께 [incidentDate] 접수된 학교폭력 사안 처리 절차에 대해 안내드립니다.

학교는 접수된 사안에 대해 [학교폭력예방 및 대책에 관한 법률]에 따라 중립적이고 신중한 자세로 사안 조사를 진행하고 있습니다.

[진행 절차 안내]
1. 사안 조사 ([investigationPeriod]): 전담기구 교사가 관련 학생들의 객관적 진술 및 정황을 조사합니다.
2. 피해학생 긴급보호 및 가·피해학생 분리 조치: 필요시 학생의 안정과 보호를 최우선으로 시행합니다.
3. 학교 전담기구 심의: 조사가 완료되면 전담기구에서 법적 4가지 요건(2주 미만 치료, 재산 피해 복구 등)을 심의합니다.
4. 학교장 자체해결 또는 교육지원청 심의위원회 이관: 법적 요건을 충족하고 피해학생 및 보호자께서 서면으로 동의하시는 경우 학교장 자체해결로 추진할 수 있으며, 동의하지 않으실 경우 교육지원청 학교폭력심의위원회로 이관됩니다.

관련 법령상 상대 학생의 개인정보 및 신원은 공개할 수 없음을 양해해 주시기 바랍니다. 학교는 [studentAlias]이 안전하고 평온하게 학교생활을 이어갈 수 있도록 최선을 다하겠습니다.

궁금하신 점은 [counselorContact]으로 문의해 주시기 바랍니다.

감사합니다.`,
    recommendedTone: '신중하고 객관적이며 법적 절차를 엄수하는 어조'
  },
  {
    id: 'rights-01',
    title: '교사 유선/방문 민원 시 상호존중 및 근무시간 외 연락 제한 안내',
    category: 'TEACHER_RIGHTS',
    categoryLabel: '교권보호·교육활동',
    keywords: ['교권보호', '민원응대', '근무시간외', '유선상담', '방문예약', '교원안심번호'],
    summary: '야간/주말 민원 전화나 폭언에 대해 정당한 교육활동 보호 지침 및 공식 민원 창구 이용 절차를 안내하는 템플릿입니다.',
    relatedLaws: [
      {
        title: '교원의 지위 향상 및 교육활동 보호를 위한 특별법',
        codeOrArticle: '제14조 및 제15조(교육활동 침해행위에 대한 조치)',
        summary: '교원의 정당한 교육활동을 침해하는 폭언, 음해, 무리한 지속적 민원은 교권 침해 행위에 해당할 수 있습니다.',
        keyPoints: [
          '공식 민원 창구(학교 대표전화, 방문예약 시스템) 활용 권장',
          '근무시간 외 사적 연락 제한 및 교원안심번호 사용 권리'
        ]
      },
      {
        title: '교육부 교원 민원응대 매뉴얼',
        codeOrArticle: '민원인 응대 수칙',
        summary: '녹음 고지 후 상담 진행, 폭언 및 비인격적 언행 발생 시 즉시 중단 가능합니다.',
        keyPoints: ['상담 사전 예약제 시행', '녹음 가능 유선 시스템 구축']
      }
    ],
    privacyAlerts: [
      '교사의 개인 휴대전화 번호는 제공되지 않으며, 교원안심번호 또는 학교 대표전화를 이용합니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'availableHours',
        label: '교사 공식 상담 가능 시간',
        placeholder: '예: 평일 15:30 ~ 16:30 (수업 및 지도 시간 제외)',
        defaultValue: '평일 15:30 ~ 16:30'
      },
      {
        key: 'officialChannel',
        label: '공식 민원 창구',
        placeholder: '예: 학교 대표전화 (02-XXX-XXXX) 및 학교 방문예약 시스템',
        defaultValue: '학교 대표전화 및 방문예약'
      }
    ],
    templateText: `안녕하십니까, [parentName].
늘 학교 교육을 신뢰해 주셔서 감사드립니다.

교사의 수업 준비, 학생 생활지도, 그리고 개인 사생활 보호를 위해 교원 민원응대 지침에 따른 상담 방법을 안내해 드립니다.

교사는 학생들의 수업 시간 및 생활지도 시간 중에는 긴급한 사안을 제외하고 유선 상담이 어려울 수 있습니다. 또한, 근무 시간 외(야간, 주말)에는 정당한 휴식권 보장을 위해 개인 연락처를 통한 민원 상담이 제한됨을 양해해 주시기 바랍니다.

[공식 상담 및 민원 절차]
- 공식 상담 가능 시간: [availableHours]
- 상담 신청 채구: [officialChannel]을 통한 사전 방문 예약 및 유선 상담 예약
- 상담 시 유의사항: 서로를 존중하는 언어를 사용해 주시기를 부탁드리며, 관련 규정에 따라 상담 내용은 녹음될 수 있습니다.

교사와 학부모님이 서로 존중하는 건강한 소통 문화 속에서 우리 학생들이 더욱 바르게 성장할 수 있습니다. 

감사합니다.`,
    recommendedTone: '상호 존중을 바탕으로 한 명확하고 절제된 어조'
  },
  {
    id: 'rights-02',
    title: '정당한 생활지도에 대한 이의에 관한 법령 기반 답변',
    category: 'TEACHER_RIGHTS',
    categoryLabel: '교권보호·교육활동',
    keywords: ['생활지도', '정당한지도', '아동학대', '초중등교육법', '교권보호', '지도권'],
    summary: '교사의 정당한 훈육 및 학습 태도 지적에 관한 학부모의 항의 시 법령상 교원의 생활지도 권한 및 절차적 정당성을 설명하는 답변입니다.',
    relatedLaws: [
      {
        title: '초·중등교육법',
        codeOrArticle: '제20조의2(교원의 학생생활지도)',
        summary: '교원은 학생의 인권을 존중하는 범위 내에서 학칙으로 정하는 바에 따라 교육활동 및 학생생활지도를 할 수 있으며, 정당한 생활지도는 아동학대로 보지 아니합니다.',
        keyPoints: [
          '정당한 학생생활지도의 법적 보호',
          '수업 방해 행위에 대한 즉시 제지 권한'
        ]
      }
    ],
    privacyAlerts: [
      '학생에 대한 지도 내역 및 상황을 객관적 사실에 의해서만 작성합니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'studentAlias',
        label: '학생 별명',
        placeholder: '예: E학생',
        defaultValue: 'E학생'
      },
      {
        key: 'guidanceFact',
        label: '생활지도 발생 상황 요약',
        placeholder: '예: 수업 시간 지속적 대화 및 다른 학생 학습 방해에 대한 구두 주의',
        defaultValue: '수업 중 학습 태도 개선 구두 지도'
      },
      {
        key: 'guidanceDate',
        label: '지도 일자',
        placeholder: '예: 2026년 3월 18일 3교시',
        defaultValue: '2026년 O월 O일'
      }
    ],
    templateText: `안녕하십니까, [parentName].
[studentAlias]의 학교 생활에 대한 소중한 의견을 전달해 주셔서 감사드립니다.

[guidanceDate] 진행된 [guidanceFact] 조치에 관해 학부모님께서 염려하시는 부분에 대해 설명드립니다.

[초·중등교육법] 제20조의2 및 관련 법령에 따르면 교사는 모든 학생의 안전한 학습 환경과 수업권을 보장하기 위해 필요시 즉각적인 생활지도를 실시할 권한과 의무가 있습니다.

당일 지도는 [studentAlias]을 비하하거나 차별하려는 의도가 아니며, 교실 내 다른 학생들의 학습권을 보호하고 [studentAlias]이 올바른 교실 규칙을 준수하도록 유도하기 위한 정당한 교육적 지도였습니다.

학교와 교사는 학생 개인의 인권을 최대한 존중하면서도 교실 공동체의 질서를 지키기 위해 노력하고 있습니다. [studentAlias]이 이번 기회를 통해 한 단계 성장할 수 있도록 가정에서도 함께 격려해 주시기를 부탁드립니다.

감사합니다.`,
    recommendedTone: '교육적 취지를 강조하며 원칙을 지키는 어조'
  },
  {
    id: 'attendance-01',
    title: '교외체험학습 신청 기간 초과 및 질병결석 제출 서류 안내',
    category: 'ADMIN_ATTENDANCE',
    categoryLabel: '출결·행정',
    keywords: ['교외체험학습', '체험학습일수', '질병결석', '미인정결석', '출석인정', '진단서'],
    summary: '연간 허용된 교외체험학습 일수를 초과하거나 질병결석 증빙서류 미제출 시 출석 인정 처리 기준을 안내하는 템플릿입니다.',
    relatedLaws: [
      {
        title: '학교생활기록부 작성 및 관리지침',
        codeOrArticle: '별표 8(출결상황 관리)',
        summary: '학교장이 허가한 교외체험학습 일수 이내만 출석인정 처리하며, 질병 결석은 3일 이상 시 의사 진단서 또는 소견서가 필요합니다.',
        keyPoints: [
          '연간 최대 인정 일수 초과 시 미인정 결석 처리',
          '사전 신청서 및 사후 보고서 제출 기한 엄수'
        ]
      }
    ],
    privacyAlerts: [
      '학생의 질병 관련 진단서 내용 등 민감 의료 정보는 외부 유출이 없도록 전담 교사만 확인 후 안전하게 관리합니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'studentAlias',
        label: '학생 별명',
        placeholder: '예: F학생',
        defaultValue: 'F학생'
      },
      {
        key: 'maxAllowedDays',
        label: '본교 연간 허용 체험학습 일수',
        placeholder: '예: 연간 20일 이내',
        defaultValue: '연간 20일'
      },
      {
        key: 'usedDays',
        label: '현재까지 사용 일수',
        placeholder: '예: 18일 사용 완료',
        defaultValue: 'OO일'
      },
      {
        key: 'requiredDocs',
        label: '필요 증빙 서류',
        placeholder: '예: 의사 진단서, 처방전, 또는 입통원 확인서',
        defaultValue: '의사 소견서 또는 진단서'
      }
    ],
    templateText: `안녕하십니까, [parentName].
[studentAlias]의 출결 처리 및 교외체험학습 신청과 관련하여 안내 말씀드립니다.

본교 학업성적관리규정 및 출결 관리 지침에 따라, 교외체험학습은 [maxAllowedDays] 범위 내에서 사전 신청서 제출 및 승인을 거쳐 출석으로 인정됩니다.

현재 [studentAlias]의 교외체험학습 사용 일수는 총 [usedDays]로 확인되었습니다. 허용 일수를 초과하는 기간에 대해서는 규정상 출석 인정이 어려우며 '미인정 결석'으로 처리될 수 있음을 미리 안내해 드립니다.

또한 질병으로 인한 결석의 경우, 3일 이상 연속 결석 시에는 결석계와 함께 [requiredDocs]를 제출해 주셔야 출석 인정(질병결석) 처리가 가능합니다.

학생의 올바른 출결 관리는 생활기록부 기록의 공정성을 위해 꼭 필요한 절차이오니, 관련 서류를 기한 내 제출해 주시기를 부탁드립니다.

궁금하신 점은 담임교사에게 문의해 주시면 친절히 안내해 드리겠습니다.

감사합니다.`,
    recommendedTone: '친절하고 안내 중심적인 어조'
  },
  {
    id: 'meals-01',
    title: '학교 급식 식품 알레르기 관리 및 대체식 제공 요청 답변',
    category: 'MEALS_FACILITIES',
    categoryLabel: '급식·시설·안전',
    keywords: ['학교급식', '알레르기', '대체식', '식품알레르기', '급식안전', '영양교사'],
    summary: '특정 식품 알레르기가 있는 학생의 학부모가 대체식 제공이나 별도 관리를 요청할 때 학교의 급식 관리 체계를 안내하는 답변입니다.',
    relatedLaws: [
      {
        title: '학교급식법 시행규칙',
        codeOrArticle: '제5조(영양관리기준 및 식단 작성)',
        summary: '학교급식 공급 시 알레르기 유발 식품 표시제(19가지 항목)를 식단표에 표기하고 사전 안내해야 합니다.',
        keyPoints: [
          '월간 식단표 내 알레르기 유발물질 번호 표기',
          '개인별 질환 조사를 통한 안전 관리'
        ]
      }
    ],
    privacyAlerts: [
      '학생의 특이 체질 및 알레르기 정보는 급식 지도 목적 외에는 활용되지 않습니다.'
    ],
    fieldPlaceholders: [
      {
        key: 'parentName',
        label: '민원인 성함',
        placeholder: '예: 학부모님',
        defaultValue: '학부모님'
      },
      {
        key: 'studentAlias',
        label: '학생 별명',
        placeholder: '예: G학생',
        defaultValue: 'G학생'
      },
      {
        key: 'allergyItem',
        label: '알레르기 유발 식품항목',
        placeholder: '예: 계란, 우유, 땅콩',
        defaultValue: '특정 알레르기 유발 성분'
      },
      {
        key: 'schoolMeasure',
        label: '학교 대응 관리 조치',
        placeholder: '예: 매월 식단표 사전 제거 안내 및 배식 시 자율 섭취 지도',
        defaultValue: '식단표 사전 공지 및 영양교사 배식 지도'
      }
    ],
    templateText: `안녕하십니까, [parentName].
[studentAlias]의 건강하고 안전한 학교 급식 이용을 위한 의견 제안에 감사드립니다.

본교는 [학교급식법]에 따라 학생들의 식품 알레르기 사고를 예방하기 위해 19가지 주요 알레르기 유발물질 정보 표시제를 실시하고 있습니다.

문의해주신 [studentAlias]의 [allergyItem] 알레르기 유발 식재료와 관련하여 본교는 다음과 같이 관리 조치를 시행하고 있습니다.

[학교 급식 관리 안내]
1. 월간 가정통신문 및 학교 홈페이지 식단표에 [allergyItem] 관련 유발 번호 명시
2. 식당 입구 식단 게시판에 일일 알레르기 정보 시각화 안내
3. [schoolMeasure]

대체식의 완전한 조리는 교내 조리실 환경 및 대량 급식 특성상 제한적일 수 있으나, [studentAlias]이 안전하게 급식을 이용할 수 있도록 담임교사 및 영양교사가 배식 지도를 더욱 세심히 실시하겠습니다.

의사의 정밀 진단서나 추가 요청 사항이 있으실 경우 언제든 학교 영양식생활실로 연락해 주시기 바랍니다.

감사합니다.`,
    recommendedTone: '배려 깊고 안심을 주는 친절한 어조'
  }
];

export const PRIVACY_RULE_TIPS: PrivacyRuleTip[] = [
  {
    id: 'tip-01',
    title: '학생 개인정보 최소화 (실명 사용 금지)',
    category: '개인정보 보호',
    content: '학교 민원 답변 문서나 작성 시스템에 학생의 실제 이름이나 주민등록번호, 학번을 그대로 입력하지 마십시오.',
    doText: "'A학생', '해당 학생', '김O수 학생'과 같이 익명 또는 별명 표기 사용",
    dontText: "'홍길동(2학년 3반 15번, 주민번호 100101-3******)' 등 완전한 인적사항 표기"
  },
  {
    id: 'tip-02',
    title: '제3자(타 학생) 개인정보 비공개 원칙',
    category: '정보보호',
    content: '학교폭력 또는 학생 간 갈등 민원 답변 시, 가해/피해 상대방 학생의 인적사항이나 가정환경 정보는 절대 제3자에게 유출할 수 없습니다.',
    doText: "'상대 학생', '관련 학생 B'로 표기하고 구체적 인적사항 비공개 안내",
    dontText: "상대방 학생의 이름, 부모 직업, 타 학생의 징계 내역을 민원인에게 누설"
  },
  {
    id: 'tip-03',
    title: '로컬 전용 저장 및 데이터 보안',
    category: '시스템 보안',
    content: '본 시스템에 입력한 민원 초안 및 가변 정보는 교사의 PC 브라우저(LocalStorage)에만 안전하게 보관되며 외부 서버로 전송되지 않습니다.',
    doText: "작성 완료 후 PC 화면을 비울 때 브라우저 닫기 또는 개인정보 초기화 버튼 누르기",
    dontText: "공용 PC에서 민원 답변 초안을 화면에 열어둔 채 자리를 비우기"
  },
  {
    id: 'tip-04',
    title: '유선 및 서면 답변 기록 관리',
    category: '민원 행정',
    content: '민원 답변 내용을 이메일이나 서면으로 발송하거나 클립보드로 복사하여 활용할 때, 송신 대상자(민원인 본인)가 맞는지 다시 한 번 확인하십시오.',
    doText: "발송 전 수신자 이름, 이메일 주소, 전화번호 2회 재확인",
    dontText: "동명이인 학부모에게 잘못된 민원 답변서 전달"
  }
];
