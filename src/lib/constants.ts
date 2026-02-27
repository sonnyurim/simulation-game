import type {
  Department,
  DepartmentSkill,
  Ending,
  EndingType,
  ResourceKey,
} from "@/types/survival";

export const GAME_CONFIG = {
  TOTAL_TURNS: 30,
  INITIAL_RESOURCE: 70,
  MAX_RESOURCE: 100,
  MIN_RESOURCE: 0,
  EMERGENCY_SUPPLY_AMOUNT: 30,
  MAX_EMERGENCY_USES: 3,
  NICKNAME_MIN: 2,
  NICKNAME_MAX: 10,
  FREE_MAJOR_POSITIVE_MULTIPLIER: 0.6,
  DIFFICULTY_SCALE_START: 1.0,
  DIFFICULTY_SCALE_END: 1.8,
  PHASE_EARLY_END: 10,
  PHASE_MID_END: 20,
  RECENT_TAG_LIMIT: 2,
  PERFECT_RESCUE_THRESHOLD: 65,
  NARROW_ESCAPE_THRESHOLD: 40,
  // Per-turn base recovery from fortified shelter
  SHELTER_HEALTH_REGEN: 1,
  SHELTER_FOOD_REGEN: 1,
} as const;

export const DEPARTMENTS: readonly Department[] = [
  {
    id: "electrical",
    name: "전기전자공학과",
    icon: "⚡",
    bonusResource: "health",
    description: "전력망 복구로 안전구역을 확보하고 전기 트랩을 설치한다",
  },
  {
    id: "mechanical",
    name: "기계공학과",
    icon: "⚙️",
    bonusResource: "health",
    description: "용접·절단 장비로 철벽 바리케이드와 즉석 무기를 제작한다",
  },
  {
    id: "smart_ee",
    name: "스마트전기전자공학과",
    icon: "📡",
    bonusResource: "mental",
    description: "IoT 센서망으로 캠퍼스 전체 위험구역을 실시간 감시한다",
  },
  {
    id: "smart_mech",
    name: "스마트기계공학과",
    icon: "🦾",
    bonusResource: "food",
    description: "CNC·3D프린터로 식량 획득 도구와 생존 장비를 대량 제작한다",
  },
  {
    id: "smart_sw",
    name: "스마트소프트웨어학과",
    icon: "💻",
    bonusResource: "mental",
    description: "AI 알고리즘으로 좀비 이동 패턴을 분석하고 탈출 경로를 계산한다",
  },
  {
    id: "free_major",
    name: "자유전공학과",
    icon: "🎲",
    bonusResource: "health",
    description: "어떤 선택도 가능하지만, 모든 이득이 60%만 적용되는 하드모드",
  },
] as const;

export const DEPARTMENT_SKILLS: readonly DepartmentSkill[] = [
  {
    // Intro: "회로 설계 과제의 마지막 납땜을 마치던 순간"
    departmentId: "electrical",
    name: "과제용 회로를 함정으로",
    icon: "⚡",
    description: "오늘 하던 회로 설계를 그대로 전기 함정으로 바꿨다. 납땜 도구가 아직 손에 있었다",
    maxUses: 3,
    effect: { health: 30, survivors: 10, food: -15, mental: -10 },
    resultText:
      "과제 도면을 뒤집어 복도 세 군데에 전기 덫을 설치했다. 교수님이 보셨다면 뭐라 하셨을까. 첫 번째 덫이 터지는 소리를 들었을 때, 아무도 말하지 않았다.",
  },
  {
    // Intro: "용접 마스크를 올리며 ... 본능적으로 손에 쥐어진 건 용접봉이었다"
    departmentId: "mechanical",
    name: "용접봉 하나로",
    icon: "🔩",
    description: "손에 쥐고 있던 용접봉으로 실습실 고철을 이어 붙인다. 이게 오늘 할 일이 됐다",
    maxUses: 3,
    effect: { health: 25, survivors: 15, food: -20, mental: -15 },
    resultText:
      "작업복도 벗지 못한 채 3시간을 버텼다. 방벽은 완성됐다. 벽 너머에서 긁히는 소리가 들렸지만, 아무것도 들어오지 못했다. 용접봉은 아직 뜨거웠다.",
  },
  {
    // Intro: "카메라 16번 — 학생식당 입구 — 에서 연결이 끊겼다"
    departmentId: "smart_ee",
    name: "카메라 16번의 역이용",
    icon: "📡",
    description: "끊겼던 카메라 16번 신호를 되살려 좀비 무리를 학식 쪽으로 유인한다",
    maxUses: 3,
    effect: { health: 25, mental: 20, survivors: 10, food: -15 },
    resultText:
      "카메라 16번에서 신호가 다시 켜졌다. 좀비들이 학식 쪽으로 몰렸다. 그곳에 아직 사람이 남아 있었는지, 지금도 모른다.",
  },
  {
    // Intro: "3D 프린터를 돌리며 졸업 작품 마감을 준비하던 중"
    departmentId: "smart_mech",
    name: "졸업 작품은 나중에",
    icon: "🦾",
    description: "4년 동안 만들어 온 졸업 작품 소재를 방호 장비로 전용한다. 학점보다 목숨이 먼저",
    maxUses: 3,
    effect: { health: 30, mental: 15, food: -20, survivors: 5 },
    resultText:
      "졸업 작품 소재를 녹여 방호 마스크를 찍어냈다. 기계 소음이 좀비를 끌어들일까 봐 내내 긴장했다. 다들 마스크를 받아 들고 말이 없었다. 4년이 이렇게 쓰일 줄은 몰랐다.",
  },
  {
    // Intro: "AI 모델 최종 학습이 돌아가는 동안 ... 서버 로그에 비정상적인 트래픽 패턴"
    departmentId: "smart_sw",
    name: "마감 직전 AI, 목적지 변경",
    icon: "💻",
    description: "마감 직전이던 AI 모델의 목적을 생존 경로 계산으로 바꿨다. 졸업 학점은 포기했다",
    maxUses: 3,
    effect: { food: 25, health: 15, mental: 15, survivors: -8 },
    resultText:
      "모델이 경로를 뱉어냈다. 정찰팀이 지도대로 움직여 물자를 가져왔다. 돌아온 인원이 나간 인원보다 적었다. 알고리즘에는 없던 변수였다.",
  },
  {
    // Intro: "어느 학과에도 완전히 속하지 않는다는 건, 어디든 갈 수 있다는 뜻"
    departmentId: "free_major",
    name: "규칙 없음",
    icon: "🎲",
    description: "어떤 규칙에도 얽매이지 않는 사람만이 할 수 있는 방식으로 상황을 돌파한다",
    maxUses: 3,
    effect: {},
    isRandom: true,
    resultText:
      "말도 안 되는 방법이었는데 통했다. 다들 멍한 얼굴로 서로를 쳐다봤다. 어느 학과 출신이냐고 아무도 묻지 않았다.",
    resultTextFail:
      "역시 말이 안 됐다. 상황은 더 나빠졌다. 어느 학과에도 속하지 않는다는 게 이럴 때는 외로웠다.",
  },
] as const;

// Department-specific intro narrative (shown after department select, before game)
export const DEPARTMENT_INTROS: Record<string, readonly string[]> = {
  electrical: [
    "20XX년 4월. 연암공대 전기실습동 4층.",
    "회로 설계 과제의 마지막 납땜을 마치던 순간.",
    "건물 전체의 조명이 동시에 꺼졌다.",
    "비상등만 켜진 복도 끝에서 이상한 소리가 들렸다.",
    "납땜 인두를 집어 들고, 복도로 나갔다.",
  ],
  mechanical: [
    "20XX년 4월. 연암공대 기계실습동 3층.",
    "용접 마스크를 올리며 오늘의 작업을 마무리하려던 참이었다.",
    "아래층에서 쿵 하는 충격음과 함께 비명이 들렸다.",
    "창밖을 내다보니 캠퍼스 잔디밭에 사람들이 쓰러져 있었다.",
    "용접봉 하나 들고, 어디로 가야 할지 생각했다.",
  ],
  smart_ee: [
    "20XX년 4월. 연암공대 스마트관 2층 IoT 연구실.",
    "캠퍼스 전체 CCTV 시스템 점검 업무를 맡은 날이었다.",
    "모니터 화면들이 하나씩 이상한 장면을 보여주기 시작했다.",
    "카메라 16번 — 학생식당 입구 — 에서 연결이 끊겼다.",
    "카메라를 되살려야 했다. 그래야 상황을 파악할 수 있었다.",
  ],
  smart_mech: [
    "20XX년 4월. 연암공대 스마트제조관 1층 CNC 실습실.",
    "3D 프린터를 돌리며 졸업 작품 마감을 준비하던 중이었다.",
    "학교 단체 채팅방에 사진 하나가 올라왔다: '본관 앞 지금 이게 뭐야?'",
    "사진 속 학생은 피투성이였고, 뒤에서 무언가 달려오고 있었다.",
    "프린터는 멈추지 않았다. 뭔가 만들어야 할 것 같았다.",
  ],
  smart_sw: [
    "20XX년 4월. 연암공대 소프트웨어관 3층 프로젝트 랩.",
    "AI 모델 최종 학습이 돌아가는 동안 뉴스 피드를 보고 있었다.",
    "갑자기 교내 와이파이가 전부 다운됐다. 핸드폰도 먹통.",
    "서버 로그에 비정상적인 트래픽 패턴이 폭발적으로 찍히기 시작했다.",
    "노트북을 닫고, 상황을 파악해야 했다.",
  ],
  free_major: [
    "20XX년 4월. 연암공대 본관 1층 카페.",
    "자유전공이라 수업 스케줄이 느슨한 오후였다.",
    "어느 학과에도 완전히 속하지 않는다는 건, 어디든 갈 수 있다는 뜻이기도 했다.",
    "커피 한 잔을 들고 창가에 앉던 순간.",
    "유리 너머 캠퍼스를 가로질러 뛰는 학생들이 보였다.",
    "커피잔을 내려놓았다.",
  ],
};

export const RESOURCE_LABELS: Record<ResourceKey, string> = {
  health: "체력",
  food: "식량",
  survivors: "생존자",
  mental: "멘탈",
};

export const RESOURCE_ICONS: Record<ResourceKey, string> = {
  health: "🫁",
  food: "🍞",
  survivors: "👥",
  mental: "🧠",
};

export const ENDINGS: Record<EndingType, Ending> = {
  perfect_rescue: {
    type: "perfect_rescue",
    title: "완벽한 생존",
    description:
      "모든 자원을 충분히 유지한 채 구조대가 도착했다. 연암공대의 전설이 될 생존 기록이다.",
    styleSuffixes: {
      skill_max: "전공을 끝까지 믿었다. 결국 그게 맞았다.",
      skill_none: "아무 도움도 빌리지 않았다. 순전히 자신의 판단만으로.",
      food_low: "배가 고팠던 날들이 가장 길었다. 그래도 버텼다.",
      mental_low: "무너지지 않은 게 기적이었다. 하지만 무너지지 않았다.",
      survivors_low: "거의 혼자였다. 그래도 살아남았다.",
      health_low: "몸이 버텨줬다. 간신히, 하지만 분명히.",
    },
  },
  rescued: {
    type: "rescued",
    title: "구조 완료",
    description: "30일간의 사투 끝에 구조 헬기가 도착했다. 당신은 살아남았다.",
    styleSuffixes: {
      skill_max: "전공 덕분에 살아남았다. 그렇게 믿었다.",
      skill_none: "맨몸으로 30일을 버텼다. 교과서에는 없는 방법으로.",
      food_low: "배가 고팠던 기억이 가장 선명했다.",
      mental_low: "한계까지 밀어붙인 정신이 마지막에 버텨줬다.",
      survivors_low: "함께였지만, 혼자처럼 느껴지는 순간이 많았다.",
      health_low: "상처가 아물기도 전에 다음 날이 됐다.",
    },
  },
  narrow_escape: {
    type: "narrow_escape",
    title: "아슬아슬한 탈출",
    description: "모든 것이 한계에 달했을 때 구조대가 왔다. 조금만 늦었어도 끝이었다.",
    styleSuffixes: {
      skill_max: "전공이 아니었으면 이 순간까지 오지 못했을 거다.",
      skill_none: "스스로의 판단만 믿었다. 거의 맞았다.",
      food_low: "마지막 식량을 나눠 먹던 날이 생각났다.",
      mental_low: "이성이 아슬아슬하게 버텼다. 딱 오늘까지.",
      survivors_low: "혼자였지만, 혼자가 아니었다. 잠깐이나마.",
      health_low: "이 몸으로 여기까지 왔다는 게 아직도 믿기지 않는다.",
    },
  },
  infected: {
    type: "infected",
    title: "감염",
    description: "체력이 바닥났다... 당신의 눈이 서서히 붉게 변해간다.",
    styleSuffixes: {
      skill_max: "전공을 믿었는데. 이 상황까지 오지 않았어야 했는데.",
      skill_none: "혼자 버텨보려 했다. 조금만 더 도움을 구했다면.",
    },
  },
  starvation: {
    type: "starvation",
    title: "아사",
    description: "더 이상 먹을 것이 없다. 배고픔이 의식을 집어삼킨다.",
    styleSuffixes: {
      skill_max: "전공을 쏟아부었는데, 식량만큼은 해결이 안 됐다.",
      skill_none: "어딘가에 음식이 있었을 텐데. 끝내 찾지 못했다.",
    },
  },
  alone: {
    type: "alone",
    title: "고립",
    description: "마지막 생존자마저 곁을 떠났다. 혼자서는 버틸 수 없다.",
    styleSuffixes: {
      skill_max: "전공이 사람을 지키진 못했다.",
      skill_none: "뭔가 다른 방법이 있었을 텐데. 끝내 찾지 못했다.",
    },
  },
  breakdown: {
    type: "breakdown",
    title: "정신 붕괴",
    description: "공포가 이성을 삼켰다. 더 이상 판단할 수 없다.",
    styleSuffixes: {
      skill_max: "전공 지식이 공포를 막아주진 못했다.",
      skill_none: "혼자 감당하기엔 너무 많은 것들이었다.",
    },
  },
};
