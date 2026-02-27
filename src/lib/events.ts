import type { GameEvent } from "@/types/survival";

export const EVENTS: readonly GameEvent[] = [
  // ========== STARTER EVENTS (턴 1 고정 — 학과별 인트로 직결) ==========
  {
    // 인트로: "납땜 인두를 집어 들고, 복도로 나갔다."
    id: "start_electrical",
    phase: "early",
    tag: "explore",
    location: "전기실습동 4층 복도",
    title: "복도 끝의 소리",
    starterDepartmentId: "electrical",
    description:
      "납땜 인두를 들고 복도로 나섰다. 비상등이 깜박이는 복도 끝에서 두 명의 좀비가 당신을 발견했다. 전기실 배선함이 옆에 있다.",
    choices: [
      {
        id: "start_electrical_a",
        text: "배선함을 열어 복도 전체에 전기를 흘린다",
        effect: { health: -8, mental: -10, survivors: 5 },
        departmentBonus: { departmentId: "electrical", extraEffect: { health: 10 } },
        resultText:
          "과부하 전류가 복도를 훑었다. 좀비 둘 다 쓰러졌다. 납땜 인두가 아직 손에 있었다. 멀리서 누군가 살아있다는 소리가 들렸다.",
      },
      {
        id: "start_electrical_b",
        text: "계단 쪽으로 도망쳐 아래층 생존자를 찾는다",
        effect: { health: -5, mental: -8, food: -5 },
        resultText:
          "3층으로 내려오니 학생 두 명이 창고에 숨어 있었다. 함께 움직이기로 했다.",
      },
      {
        id: "start_electrical_c",
        text: "실습실 문을 잠그고 상황을 파악한다",
        effect: { mental: 8, food: -5, health: -3 },
        resultText:
          "잠긴 문 너머로 긁히는 소리가 났다. 숨을 죽이며 창밖으로 캠퍼스를 내려다봤다. 생각보다 훨씬 많았다.",
      },
    ],
  },
  {
    // 인트로: "용접봉 하나 들고, 어디로 가야 할지 생각했다."
    id: "start_mechanical",
    phase: "early",
    tag: "social",
    location: "기계실습동 1층 로비",
    title: "로비의 생존자들",
    starterDepartmentId: "mechanical",
    description:
      "계단을 내려오니 1층 로비에 학생 세 명이 갇혀 있었다. 비상구 앞에 좀비 두 마리. 용접봉이 손에 있다.",
    choices: [
      {
        id: "start_mechanical_a",
        text: "용접봉으로 좀비를 제압하고 학생들을 구한다",
        effect: { health: -15, survivors: 15, mental: -8 },
        departmentBonus: { departmentId: "mechanical", extraEffect: { health: 8 } },
        resultText:
          "작업복 소매가 찢겼다. 학생 셋을 데리고 빠져나왔다.",
      },
      {
        id: "start_mechanical_b",
        text: "소음 없이 혼자 비상구로 빠져나간다",
        effect: { health: -5, mental: -20, food: -3 },
        resultText:
          "혼자 탈출했다. 문이 닫히는 소리와 함께 뒤에서 비명이 들렸다. 계속 귓가에 남았다.",
      },
      {
        id: "start_mechanical_c",
        text: "용접기로 비상구 근처 문을 용접해 막고 함께 버틴다",
        effect: { food: -10, health: -5, mental: 10 },
        resultText:
          "용접 소음이 좀비를 끌었지만 막아냈다. 넷이서 버텼다. '너 기계과지?' 누군가 물었다. 끄덕였다.",
      },
    ],
  },
  {
    // 인트로: "카메라를 되살려야 했다. 그래야 상황을 파악할 수 있었다."
    id: "start_smart_ee",
    phase: "early",
    tag: "defense",
    location: "스마트관 2층 IoT 연구실",
    title: "끊긴 카메라 16번",
    starterDepartmentId: "smart_ee",
    description:
      "연구실로 돌아와 IoT 장비를 확인했다. 카메라 16번 신호를 되살리면 학식 쪽 상황을 볼 수 있다. 배선이 끊겨 있다.",
    choices: [
      {
        id: "start_smart_ee_a",
        text: "배선을 직접 이어 카메라 16번을 복구한다",
        effect: { mental: 15, health: -8, food: -5 },
        departmentBonus: { departmentId: "smart_ee", extraEffect: { mental: 10, survivors: 5 } },
        resultText:
          "화면이 켜졌다. 학식 앞엔 좀비 떼. 그리고 건물 2층 창문에서 손을 흔드는 사람이 보였다. 살아 있었다.",
      },
      {
        id: "start_smart_ee_b",
        text: "카메라 대신 IoT 센서로 건물 전체 움직임을 감지한다",
        effect: { mental: 10, food: -10, health: -3 },
        resultText:
          "센서 맵에 빨간 점이 가득 찍혔다. 얼마나 많은지 직접 봤으면 더 무서웠을 것이다. 알아서 다행이기도 했다.",
      },
      {
        id: "start_smart_ee_c",
        text: "장비를 챙겨 다른 생존자를 찾아 연구실을 나선다",
        effect: { health: -8, mental: -10, survivors: 8 },
        resultText:
          "복도에서 혼자 숨어있던 학생을 만났다. '혼자였어요.' 이제 둘이었다.",
      },
    ],
  },
  {
    // 인트로: "프린터는 멈추지 않았다. 뭔가 만들어야 할 것 같았다."
    id: "start_smart_mech",
    phase: "early",
    tag: "craft",
    location: "스마트제조관 1층 CNC 실습실",
    title: "멈추지 않는 프린터",
    starterDepartmentId: "smart_mech",
    description:
      "프린터가 돌아가는 동안 복도 발소리가 점점 가까워졌다. 지금 당장 뭔가를 만들 수 있다. 시간이 없다.",
    choices: [
      {
        id: "start_smart_mech_a",
        text: "즉석 방호 마스크 틀을 출력한다 — 기계 소음을 감수한다",
        effect: { health: 15, food: -10, mental: -12 },
        departmentBonus: { departmentId: "smart_mech", extraEffect: { food: 8, health: 5 } },
        resultText:
          "프린터 소음에 좀비 두 마리가 문 앞까지 왔다. 막아내며 마스크를 완성했다. 틈틈이 식량도 챙겼다. 졸업 작품보다 더 중요한 걸 만든 것 같았다.",
      },
      {
        id: "start_smart_mech_b",
        text: "프린터를 끄고 CNC 소재를 챙겨 탈출한다",
        effect: { food: -5, mental: -8, health: -5, survivors: 5 },
        resultText:
          "복도에 나오니 경비원이 있었다. '여기 혼자였냐?' 그가 물었다. 그 말이 묘하게 위로가 됐다.",
      },
      {
        id: "start_smart_mech_c",
        text: "실습실 문을 CNC 금속판으로 보강하고 버틴다",
        effect: { mental: 10, health: -5, food: -5 },
        resultText:
          "문이 버텼다. 발소리가 멀어졌다. 프린터도 멈췄다. 이제 진짜 생존을 시작해야 했다.",
      },
    ],
  },
  {
    // 인트로: "노트북을 닫고, 상황을 파악해야 했다."
    id: "start_smart_sw",
    phase: "early",
    tag: "explore",
    location: "소프트웨어관 3층 계단참",
    title: "계단에서 마주친 사람들",
    starterDepartmentId: "smart_sw",
    description:
      "노트북을 닫고 계단으로 나갔다. 3층 계단참에 패닉 상태의 학생 둘이 있었다. 와이파이도 핸드폰도 안 된다. 어떻게 상황을 파악할 것인가.",
    choices: [
      {
        id: "start_smart_sw_a",
        text: "서버실에 가서 교내 방송으로 생존자를 집결시킨다",
        effect: { survivors: 15, food: -10, health: -8 },
        departmentBonus: { departmentId: "smart_sw", extraEffect: { mental: 10 } },
        resultText:
          "방송이 나갔다. '소프트웨어관 3층으로 모이세요.' 10분 뒤, 예상보다 많은 사람이 왔다. 너무 많을 수도 있었다.",
      },
      {
        id: "start_smart_sw_b",
        text: "학습 중인 AI 모델로 최적 탈출 경로를 계산한다",
        effect: { mental: 15, food: -8, health: -5 },
        resultText:
          "모델이 경로 하나를 내뱉었다. 맞는지 틀린지 확인할 방법은 없었다. 믿는 수밖에 없었다.",
      },
      {
        id: "start_smart_sw_c",
        text: "두 학생을 설득해 함께 캠퍼스 상황을 정찰한다",
        effect: { survivors: 8, health: -10, mental: -8 },
        resultText:
          "셋이서 1층까지 내려갔다가 올라왔다. 1층은 이미 안 됐다. 올라오는 길에 혼자 버티던 학생을 하나 더 만났다.",
      },
    ],
  },
  {
    // 인트로: "커피잔을 내려놓았다."
    id: "start_free_major",
    phase: "early",
    tag: "social",
    location: "본관 1층 카페",
    title: "카페 안의 네 사람",
    starterDepartmentId: "free_major",
    description:
      "커피잔을 내려놓았다. 카페 안에 아직 네 명이 얼어붙어 있었다. 밖에서 유리 깨지는 소리가 났다. 어느 학과도 아닌 당신이 먼저 움직였다.",
    choices: [
      {
        id: "start_free_major_a",
        text: "'따라오세요' — 무작정 이끌고 카페 뒷문으로 나간다",
        effect: { survivors: 15, food: -10, mental: 5 },
        resultText:
          "넷 중 셋이 따라왔다. 한 명은 자리를 떠나지 않았다. 기다릴 수 없었다. 뒤를 돌아보지 않았다.",
      },
      {
        id: "start_free_major_b",
        text: "카페 카운터 뒤에 숨어 상황이 지나가길 기다린다",
        effect: { food: 8, mental: -15, health: -5 },
        resultText:
          "30분 뒤 조용해졌다. 카운터 뒤에서 나왔을 때 카페엔 나 혼자였다. 어디서부터 시작해야 할지 몰랐다.",
      },
      {
        id: "start_free_major_c",
        text: "카페 물건으로 문을 막고 함께 버틸 방법을 찾는다",
        effect: { mental: 10, health: -5, food: -8 },
        resultText:
          "테이블과 의자로 문을 막았다. 넷이 같이 했다. 어느 학과냐고 물었더니 다 달랐다. 그게 오히려 다행이었다.",
      },
    ],
  },

  // ========== EARLY PHASE ==========
  {
    id: "e01",
    phase: "early",
    tag: "scavenge",
    location: "학생식당",
    title: "식당 탐색",
    description:
      "학생식당에 아직 음식이 남아 있을지도 모른다. 하지만 안쪽에서 신음 소리가 들린다.",
    choices: [
      {
        id: "e01_a",
        text: "조심히 들어가서 식량을 확보한다",
        effect: { food: 15, health: -12, mental: -5 },
        resultText: "통조림과 라면을 확보했지만 좀비에게 긁혀 부상을 입었다.",
      },
      {
        id: "e01_b",
        text: "입구의 자판기만 털어본다",
        effect: { food: 5, mental: 5, survivors: -3 },
        resultText: "과자와 음료를 꺼냈다. 소음에 놀란 동료 하나가 도망쳤다.",
      },
      {
        id: "e01_c",
        text: "CNC 가공한 갈고리로 원거리에서 끌어낸다",
        effect: { food: 10, health: -8, mental: -8 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { food: 10 },
        },
        resultText:
          "갈고리 제작에 시간이 걸렸고 소음도 컸지만, 식량을 확보했다.",
      },
    ],
  },
  {
    id: "e02",
    phase: "early",
    tag: "defense",
    location: "실습동",
    title: "CCTV 네트워크 복구",
    description:
      "서버룸으로 들어서자 꺼진 모니터들이 줄지어 있었다. 전력을 복구하면 CCTV 8대를 살릴 수 있다.",
    choices: [
      {
        id: "e02_a",
        text: "서버룸에 진입해 직접 전원을 연결한다",
        effect: { mental: 12, health: -12, food: -5 },
        resultText:
          "전원 복구에 성공했다. CCTV 8대가 켜졌지만 좀비와 마주쳐 크게 다쳤다.",
      },
      {
        id: "e02_b",
        text: "IoT 센서로 원격 감시 시스템을 구축한다",
        effect: { mental: 8, food: -10, survivors: -3 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { mental: 12 },
        },
        resultText:
          "부품 수집에 시간이 걸려 식량 탐색을 놓쳤다. 감시 시스템은 완성했지만.",
      },
      {
        id: "e02_c",
        text: "사람을 보초로 세우고 CCTV는 포기한다",
        effect: { health: -5, survivors: 5, mental: -5 },
        resultText: "보초 덕에 생존자를 더 모았지만, 피로감이 쌓인다.",
      },
    ],
  },
  {
    id: "e03",
    phase: "early",
    tag: "medical",
    location: "실습동",
    title: "부상자 발생",
    description:
      "한 생존자가 유리에 깊이 베였다. 간호학을 아는 누군가가 직접 처치하겠다고 나섰지만, 의약품이 없다.",
    choices: [
      {
        id: "e03_a",
        text: "함께 보건실까지 위험을 무릅쓰고 간다",
        effect: { health: 15, food: -10, mental: -8 },
        resultText: "능숙한 손길로 처치가 끝났다. 보건실까지 가는 길이 지옥이었지만.",
      },
      {
        id: "e03_b",
        text: "용접 도구로 간이 수술 기구를 만들어 넘긴다",
        effect: { health: 5, survivors: -5, food: -8 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { health: 12 },
        },
        resultText: "도구 제작 소음에 좀비가 몰려왔다. 그래도 처치는 끝까지 마쳤다.",
      },
      {
        id: "e03_c",
        text: "압박 붕대로만 응급처치한다",
        effect: { health: 3, mental: -8, survivors: 3 },
        resultText: "출혈은 멈췄다. '이 정도면 버틸 수 있어.' 아무도 믿기지 않았지만 믿고 싶었다.",
      },
    ],
  },
  {
    id: "e04",
    phase: "early",
    tag: "social",
    location: "기숙사",
    title: "기숙사의 생존자들",
    description:
      "기숙사에서 숨어 있던 학생 무리를 발견했다. '우리가 받아줄 수 있는 사람이 몇 명인지 생각해야 해.' 냉정한 목소리가 귓가에 걸렸다.",
    choices: [
      {
        id: "e04_a",
        text: "그 말을 무시하고 전원 합류시킨다",
        effect: { survivors: 15, food: -10, mental: 5 },
        resultText: "5명이 합류했다. 누군가의 표정이 굳었다. 힘은 세졌지만 식량이 급감한다.",
      },
      {
        id: "e04_b",
        text: "냉정한 판단에 맡긴다",
        effect: { survivors: 5, mental: -12, health: 5 },
        resultText: "3명을 골랐다. 거절당한 이들의 울음소리가 복도에 울렸다. 그쪽을 보지 않았다.",
      },
      {
        id: "e04_c",
        text: "식량만 나눠주고 각자의 길을 권한다",
        effect: { food: -10, mental: -5, survivors: -5 },
        resultText:
          "말없이 식량 봉지를 건넸다. 밤새 나머지도 훔쳐 갔다. '내가 틀렸나.' 혼잣말이 새어나왔다.",
      },
    ],
  },
  {
    id: "e05",
    phase: "early",
    tag: "craft",
    location: "실습동",
    title: "라즈베리파이 경보 시스템",
    description:
      "실습동 창고 구석에 라즈베리파이와 센서 모듈이 쌓여 있었다. 침입 경보 시스템을 만들 수 있을 것 같다.",
    choices: [
      {
        id: "e05_a",
        text: "모션 센서 + 부저 경보 시스템을 조립한다",
        effect: { mental: 10, health: -8, survivors: -3 },
        resultText:
          "경보가 작동한다! 하지만 조립 중 다치고 한 명이 겁먹어 떠났다.",
      },
      {
        id: "e05_b",
        text: "ML 기반 영상 인식 시스템을 개발한다",
        effect: { mental: 5, food: -12, health: -5 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { food: 12, mental: 5 },
        },
        resultText:
          "개발에 이틀이 걸렸다. 하지만 시스템이 최적 식량 수거 경로도 계산해줬다. 기술이 생존을 지탱했다.",
      },
      {
        id: "e05_c",
        text: "부품을 챙겨두고 당장의 방어에 집중한다",
        effect: { health: 5, food: -5, mental: -5 },
        resultText: "부품은 확보했다. 방어는 됐지만 장기적 불안이 남는다.",
      },
    ],
  },
  {
    id: "e06",
    phase: "early",
    tag: "morale",
    location: "체육관",
    title: "야간 경계",
    description:
      "해가 졌다. 어둠 속에서 좀비들의 울부짖음이 사방에서 들린다. 오랜 경비 경험을 가진 누군가가 초소를 세우자고 제안한다.",
    choices: [
      {
        id: "e06_a",
        text: "그 제안을 무시하고 모닥불을 피운다",
        effect: { mental: 15, food: -10, health: -5 },
        resultText: "불빛이 마음을 데웠다. 어디선가 한숨 소리가 들렸다. 예상대로 좀비가 몰려와 식량을 지키느라 고생했다.",
      },
      {
        id: "e06_b",
        text: "교대 보초 일정을 따른다",
        effect: { health: -10, mental: 5, survivors: 5 },
        resultText: "지시는 군더더기가 없었다. 지쳤지만 밤을 무사히 넘겼고, 새벽에 새 생존자가 문을 두드렸다.",
      },
      {
        id: "e06_c",
        text: "다들 지쳤다며 각자 방에서 잠든다",
        effect: { health: -5, mental: -15, survivors: -10 },
        resultText:
          "혼자 자리를 지키다 잠든 사람이 있었다. 밤사이 좀비가 침입했다. 4명이 감염됐다. 아침에 아무 말도 없었다.",
      },
    ],
  },
  {
    id: "e07",
    phase: "early",
    tag: "explore",
    location: "도서관",
    title: "교내 Wi-Fi 복구",
    description:
      "도서관으로 오는 길에 AP 장비가 아직 살아 있는 걸 봤다. 인트라넷을 복구하면 건물 간 통신이 열린다.",
    choices: [
      {
        id: "e07_a",
        text: "AP를 리부팅하고 로컬 메신저를 띄운다",
        effect: { mental: 10, health: -8, survivors: -3 },
        resultText:
          "메신저가 복구됐다. 도서관까지 가는 길에 한 명을 잃었다.",
      },
      {
        id: "e07_b",
        text: "부품을 납땜해 무선 중계기를 직접 조립한다",
        effect: { mental: 5, food: -10, health: -5 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 15 },
        },
        resultText:
          "중계기 제작에 시간이 걸려 식량 확보를 놓쳤지만 통신망이 완성됐다.",
      },
      {
        id: "e07_c",
        text: "통신보다 식량 확보에 인력을 쓴다",
        effect: { food: 10, mental: -8, survivors: -3 },
        resultText:
          "식량을 모았지만, 고립된 건물 생존자와 연락이 안 돼 이탈자가 생겼다.",
      },
    ],
  },
  {
    id: "e08",
    phase: "early",
    tag: "defense",
    location: "본관 로비",
    title: "출입 통제 시스템",
    description:
      "누군가 실수로 문을 열어두면 그게 끝이다. 본관 출입문 전자 잠금장치에 전원만 연결하면 원격으로 잠글 수 있다.",
    choices: [
      {
        id: "e08_a",
        text: "UPS 배터리를 연결해 잠금장치를 활성화한다",
        effect: { mental: 10, health: -8, food: -5 },
        resultText:
          "출입문 잠금 성공. 배터리 운반 중 다쳤다.",
      },
      {
        id: "e08_b",
        text: "3D프린터로 강화 잠금장치를 맞춤 제작한다",
        effect: { mental: 5, survivors: -5, food: -8 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { mental: 12 },
        },
        resultText:
          "프린터 소음에 좀비가 몰려와 한 명이 다쳤다. 잠금장치는 견고하다.",
      },
      {
        id: "e08_c",
        text: "가구와 자재로 물리적 바리케이드를 쌓는다",
        effect: { health: -5, survivors: 3, mental: -5 },
        resultText:
          "바리케이드를 쌓았다. 전자식보다 약하지만 함께 만들어 사기가 올랐다.",
      },
    ],
  },

  // --- New early events (e09-e17) ---
  {
    id: "e09",
    phase: "early",
    tag: "medical",
    location: "실습동",
    title: "화학실 소독약 발견",
    description:
      "화학실 약품 캐비닛 안에 소독약과 알코올이 보였다. 자물쇠만 풀면 된다.",
    choices: [
      {
        id: "e09_a",
        text: "자물쇠를 부수고 약품을 전부 가져온다",
        effect: { health: 15, mental: -5, food: -5 },
        resultText: "소독약을 대량 확보했다. 하지만 소음에 좀비가 몰려와 식량을 버리고 도망쳤다.",
      },
      {
        id: "e09_b",
        text: "회로를 분석해 전자 잠금을 해제한다",
        effect: { health: 10, food: -8, mental: 5 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { health: 10 },
        },
        resultText: "조용히 잠금을 해제했다. 시간이 걸려 식량 확보를 놓쳤지만 약품은 온전하다.",
      },
      {
        id: "e09_c",
        text: "캐비닛 유리를 깨서 필요한 것만 꺼낸다",
        effect: { health: 5, mental: -8, survivors: -3 },
        resultText: "유리 파편에 한 명이 크게 다쳤다. 소독약은 조금 확보했다.",
      },
    ],
  },
  {
    id: "e10",
    phase: "early",
    tag: "defense",
    location: "주차장",
    title: "캠퍼스 정문 바리케이드",
    description:
      "정문이 뚫리면 캠퍼스 전체가 끝이다. 주차장 차량들을 밀어서 정문을 막을 수 있다.",
    choices: [
      {
        id: "e10_a",
        text: "차량 5대를 밀어서 정문을 완전히 막는다",
        effect: { mental: 12, health: -15, food: -5 },
        resultText: "정문이 완전히 봉쇄됐다. 무거운 차를 미느라 여러 명이 크게 다쳤다.",
      },
      {
        id: "e10_b",
        text: "차량 2대만 세우고 빠르게 마무리한다",
        effect: { mental: 5, health: -5, survivors: -3 },
        resultText: "간이 바리케이드를 세웠다. 완벽하진 않지만 시간을 벌 수 있다.",
      },
      {
        id: "e10_c",
        text: "용접기로 차량을 서로 연결해 철벽을 만든다",
        effect: { mental: 10, health: -10, food: -8 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { mental: 8, health: 8 },
        },
        resultText: "견고한 철벽이 완성됐다. 작업에 시간과 체력을 많이 썼지만 든든하다.",
      },
    ],
  },
  {
    id: "e11",
    phase: "early",
    tag: "scavenge",
    location: "학생식당",
    title: "숨겨진 교직원 식당",
    description:
      "학생식당 뒤편에 교직원 전용 식당이 있다는 소문을 들었다. 잠긴 문 너머에 식량이 있을지도.",
    choices: [
      {
        id: "e11_a",
        text: "문을 부수고 들어간다",
        effect: { food: 18, health: -10, mental: -8 },
        resultText: "냉장고에 식재료가 가득했다! 하지만 소음에 좀비가 몰려와 혼란스러웠다.",
      },
      {
        id: "e11_b",
        text: "환기구를 통해 몰래 잠입한다",
        effect: { food: 12, health: -12, survivors: -3 },
        resultText: "좁은 환기구에서 한 명이 끼었다. 식량은 확보했지만 구출에 시간이 걸렸다.",
      },
      {
        id: "e11_c",
        text: "다음에 준비해서 오기로 한다",
        effect: { food: -5, mental: -5, health: 3 },
        resultText: "안전하게 돌아왔지만, 다른 생존자 그룹이 먼저 털어갈 수도 있다.",
      },
    ],
  },
  {
    id: "e12",
    phase: "early",
    tag: "morale",
    location: "기숙사",
    title: "야간 비명 소리",
    description:
      "한밤중, 기숙사 3층에서 비명이 울려 퍼졌다. 좀비인가, 생존자인가?",
    choices: [
      {
        id: "e12_a",
        text: "즉시 구조하러 올라간다",
        effect: { survivors: 8, health: -15, mental: -5 },
        resultText: "숨어있던 학생 2명을 구출했다. 하지만 좀비와 마주쳐 크게 다쳤다.",
      },
      {
        id: "e12_b",
        text: "내일 아침 밝을 때 확인한다",
        effect: { mental: -12, survivors: -5, health: 3 },
        resultText: "아침에 올라가니 이미 늦었다. 구할 수 있었을 텐데... 죄책감이 밀려온다.",
      },
      {
        id: "e12_c",
        text: "문을 두드리며 소리쳐 위치를 알린다",
        effect: { survivors: 3, mental: -8, food: -8 },
        resultText: "생존자는 내려왔지만, 소음에 좀비도 몰려와 식량 저장고를 잃었다.",
      },
    ],
  },
  {
    id: "e13",
    phase: "early",
    tag: "craft",
    location: "실습동",
    title: "공구실 무기 제작",
    description:
      "실습동 공구실 문이 열려 있었다. 파이프, 렌치, 각종 금속 자재가 그대로 있었다.",
    choices: [
      {
        id: "e13_a",
        text: "파이프와 못으로 간이 무기를 만든다",
        effect: { mental: 8, health: -5, food: -5 },
        resultText: "못 박힌 파이프 무기 여러 개를 만들었다. 간단하지만 효과적이다.",
      },
      {
        id: "e13_b",
        text: "선반과 밀링으로 정밀한 무기를 제작한다",
        effect: { mental: 5, health: -10, food: -10 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { mental: 12, health: 5 },
        },
        resultText: "고품질 무기를 만들었다. 시간과 체력이 많이 들었지만 전투력이 크게 올랐다.",
      },
      {
        id: "e13_c",
        text: "공구를 연마해 투척용 무기를 만든다",
        effect: { mental: 5, health: -8, food: -3 },
        resultText:
          "투척용 칼과 표창을 급조했다. 원거리 견제가 가능해졌지만 위력은 제한적이다.",
      },
    ],
  },
  {
    id: "e14",
    phase: "early",
    tag: "explore",
    location: "도서관",
    title: "생존 매뉴얼 발견",
    description:
      "도서관 서가에서 응급처치 매뉴얼과 군사 서적을 발견했다.",
    choices: [
      {
        id: "e14_a",
        text: "시간을 들여 매뉴얼을 정독한다",
        effect: { mental: 12, food: -8, health: 5 },
        resultText: "응급처치와 방어 전략을 익혔다. 식량 확보 시간을 놓쳤지만 지식이 힘이다.",
      },
      {
        id: "e14_b",
        text: "중요한 페이지만 찢어서 가져간다",
        effect: { mental: 5, health: -3, food: -3 },
        resultText: "핵심 내용만 챙겼다. 빠르게 돌아왔지만 충분하진 않다.",
      },
      {
        id: "e14_c",
        text: "책을 가져가서 바리케이드 재료로 쓴다",
        effect: { mental: -10, health: -3, food: -3 },
        resultText: "지식을 버렸다. 바리케이드는 조금 두꺼워졌지만 허탈하다.",
      },
    ],
  },
  {
    id: "e15",
    phase: "early",
    tag: "social",
    location: "교수 연구실",
    title: "부상당한 교수 구출",
    description:
      "연구실에 갇힌 교수를 발견했다. 다리를 다쳐 걸을 수 없는 상태다.",
    choices: [
      {
        id: "e15_a",
        text: "교수를 업고 안전한 곳으로 이동한다",
        effect: { survivors: 8, health: -12, mental: 8 },
        resultText: "교수를 구출했다. 교수의 지식이 큰 도움이 되지만, 이동 중 크게 지쳤다.",
      },
      {
        id: "e15_b",
        text: "식량과 약만 두고 나중에 다시 온다",
        effect: { food: -10, mental: -8, survivors: -3 },
        resultText: "식량을 남겨두었지만, 다음에 왔을 때 이미 교수는 없었다.",
      },
      {
        id: "e15_c",
        text: "연구실을 안전하게 봉쇄하고 그곳에 머물게 한다",
        effect: { survivors: 3, food: -5, mental: -3 },
        resultText: "연구실을 보강했다. 교수는 안전하지만 우리와 떨어져 있어 불안하다.",
      },
    ],
  },
  {
    id: "e16",
    phase: "early",
    tag: "craft",
    location: "옥상",
    title: "빗물 저수 시스템",
    description:
      "며칠째 비가 오고 있다. 옥상에서 빗물을 모아 식수를 확보할 수 있을 것 같다.",
    choices: [
      {
        id: "e16_a",
        text: "양동이와 천막으로 간이 저수조를 만든다",
        effect: { food: 10, health: -8, mental: 3 },
        resultText: "빗물을 모았다. 깨끗하진 않지만 끓여 마실 수 있다.",
      },
      {
        id: "e16_b",
        text: "센서와 펌프로 자동 저수 시스템을 설계한다",
        effect: { food: 5, health: -5, mental: 5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { food: 12, mental: 5 },
        },
        resultText: "자동화된 저수 시스템이 완성됐다. 지속적으로 물을 공급받을 수 있다.",
      },
      {
        id: "e16_c",
        text: "1층 처마에서 빗물을 받아 간이 여과한다",
        effect: { food: 5, health: -5, mental: -3 },
        resultText:
          "양이 적고 불순물도 있지만 옥상보다 안전하게 물을 확보했다.",
      },
    ],
  },
  {
    id: "e17",
    phase: "early",
    tag: "combat",
    location: "운동장",
    title: "좀비화된 친구",
    description:
      "운동장에서 좀비가 된 동기를 발견했다. 아직 교복을 입고 있다...",
    choices: [
      {
        id: "e17_a",
        text: "눈을 감고 보내준다",
        effect: { mental: -15, health: -5, survivors: 3 },
        resultText: "친구를 보냈다. 마음이 찢어지지만, 남은 사람들의 안전을 지켰다.",
      },
      {
        id: "e17_b",
        text: "피해서 돌아간다",
        effect: { mental: -5, health: -8, food: -5 },
        resultText: "돌아가는 길에 좀비 무리와 마주쳤다. 시간과 체력을 낭비했다.",
      },
      {
        id: "e17_c",
        text: "동기의 소지품을 회수하려 다가간다",
        effect: { mental: -12, health: -12, food: -5 },
        resultText:
          "소지품에 쓸만한 게 없었다. 감상에 빠진 사이 좀비에게 물릴 뻔했다.",
      },
    ],
  },

  // --- New early events (e18-e22) ---
  {
    id: "e18",
    phase: "early",
    tag: "combat",
    location: "정문",
    title: "정문 앞 좀비 정찰",
    description:
      "정문 밖에 좀비 무리가 배회하고 있다. 규모와 이동 패턴을 파악해야 방어 계획을 세울 수 있다.",
    choices: [
      {
        id: "e18_a",
        text: "드론 카메라 프로그램을 작성해 정찰한다",
        effect: { mental: 10, food: -8, health: -3 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 12, health: 5 },
        },
        resultText: "드론 영상으로 좀비 밀집 구역을 정확히 파악했다. 방어 전략을 세울 수 있다.",
      },
      {
        id: "e18_b",
        text: "직접 정문 근처까지 가서 관찰한다",
        effect: { mental: 5, health: -12, survivors: -3 },
        resultText: "가까이서 관찰하다 좀비에게 발각됐다. 도망치며 한 명이 뒤처졌다.",
      },
      {
        id: "e18_c",
        text: "옥상에서 망원경으로 관찰한다",
        effect: { mental: 3, food: -5, health: -5 },
        resultText: "대략적인 규모는 파악했다. 정확하진 않지만 안전했다.",
      },
    ],
  },
  {
    id: "e19",
    phase: "early",
    tag: "social",
    location: "체육관",
    title: "생존자 역할 분담",
    description:
      "생존자가 늘어나면서 혼란이 커지고 있다. 역할을 분담해야 효율적으로 움직일 수 있다.",
    choices: [
      {
        id: "e19_a",
        text: "각자의 전공과 특기를 파악해 배치한다",
        effect: { mental: 12, food: -8, survivors: 5 },
        resultText: "체계적으로 조직이 됐다. 식량 확보에 시간이 걸렸지만 장기적으로 유리하다.",
      },
      {
        id: "e19_b",
        text: "자원봉사로 희망자만 배치한다",
        effect: { mental: 5, health: -5, food: -5 },
        resultText: "일부만 역할을 맡았다. 나머지는 눈치만 보고 있어 비효율적이다.",
      },
      {
        id: "e19_c",
        text: "리더가 일방적으로 지시한다",
        effect: { mental: -8, survivors: -5, health: -3 },
        resultText: "불만이 터졌다. 강제 배치에 반발해 일부가 이탈했다.",
      },
    ],
  },
  {
    id: "e20",
    phase: "early",
    tag: "scavenge",
    location: "주차장",
    title: "차량 내 물자 수색",
    description:
      "식량이 빠르게 줄고 있었다. 주차장에 버려진 차량들 트렁크 안에 뭔가 남아있을 수도 있었다.",
    choices: [
      {
        id: "e20_a",
        text: "차량 잠금장치를 공구로 하나씩 연다",
        effect: { food: 10, health: -10, mental: -3 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { food: 8, health: 5 },
        },
        resultText: "공구로 깔끔하게 열었다. 비상 식량과 담요를 확보했다.",
      },
      {
        id: "e20_b",
        text: "창문을 깨고 빠르게 수색한다",
        effect: { food: 8, health: -8, mental: -8 },
        resultText: "유리 파편에 다쳤고 소음에 좀비가 몰려왔다. 조금만 챙기고 도망쳤다.",
      },
      {
        id: "e20_c",
        text: "열린 차량만 확인하고 돌아온다",
        effect: { food: 3, health: -3, mental: -3 },
        resultText: "열린 차에서 물 몇 병과 과자를 찾았다. 적지만 안전했다.",
      },
    ],
  },
  {
    id: "e21",
    phase: "early",
    tag: "medical",
    location: "기숙사",
    title: "수돗물 오염",
    description:
      "기숙사 수도에서 탁한 물이 나온다. 오염된 물을 마시면 위험하다.",
    choices: [
      {
        id: "e21_a",
        text: "정수 필터를 전기 회로로 조립한다",
        effect: { health: 10, food: -5, mental: 5 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { health: 8, food: 5 },
        },
        resultText: "간이 정수기를 만들었다. 깨끗한 물을 안정적으로 공급할 수 있게 됐다.",
      },
      {
        id: "e21_b",
        text: "물을 끓여서 마신다",
        effect: { health: 3, food: -8, mental: -3 },
        resultText: "연료를 소모해 물을 끓였다. 안전하지만 시간과 자원이 든다.",
      },
      {
        id: "e21_c",
        text: "그냥 마신다. 물이 없으면 더 위험하다",
        effect: { health: -12, food: 3, mental: -5 },
        resultText: "여러 명이 배탈이 났다. 급한 판단이 큰 대가를 가져왔다.",
      },
    ],
  },
  {
    id: "e22",
    phase: "early",
    tag: "defense",
    location: "운동장",
    title: "초기 경계 시스템",
    description:
      "운동장 쪽에서 좀비가 언제 들이닥칠지 알 수 없었다. 사방이 트여 사각지대가 너무 많다. 뭔가 경보 수단이 필요했다.",
    choices: [
      {
        id: "e22_a",
        text: "3D프린터로 센서 마운트를 제작해 경계 라인을 구축한다",
        effect: { mental: 10, health: -8, food: -5 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { mental: 10, health: 5 },
        },
        resultText: "정밀한 센서 마운트로 경계 시스템이 완성됐다. 접근하면 즉시 알 수 있다.",
      },
      {
        id: "e22_b",
        text: "빈 캔과 줄로 소리 나는 함정을 만든다",
        effect: { mental: 5, health: -5, food: -3 },
        resultText: "원시적이지만 효과적이다. 좀비가 걸리면 딸깍거리는 소리가 경고가 된다.",
      },
      {
        id: "e22_c",
        text: "경계는 나중에 하고 거점 강화에 집중한다",
        effect: { mental: -8, health: -5, food: -3 },
        resultText: "밤에 좀비가 바로 코앞까지 왔다. 경계 없이는 잠도 제대로 못 잔다.",
      },
    ],
  },

  // ========== MID PHASE (18-35) ==========
  {
    id: "m01",
    phase: "mid",
    tag: "combat",
    location: "주차장",
    title: "좀비 무리 접근",
    description:
      "주차장 방면에서 대규모 좀비 무리가 다가오고 있다. 빠른 대응이 필요하다.",
    choices: [
      {
        id: "m01_a",
        text: "전원이 나가 바리케이드를 사수한다",
        effect: { mental: 12, health: -15, survivors: -8 },
        resultText:
          "겨우 막아냈다. 사기는 올랐지만 부상자와 희생자가 크다.",
      },
      {
        id: "m01_b",
        text: "용접기로 철제 방벽을 급히 제작한다",
        effect: { mental: 8, food: -12, health: -8 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { mental: 8, health: 8 },
        },
        resultText: "철 방벽을 만들었지만 작업에 식량과 체력을 크게 소모했다.",
      },
      {
        id: "m01_c",
        text: "건물 안으로 후퇴하고 문을 잠근다",
        effect: { health: -5, food: -10, mental: -12 },
        resultText:
          "후퇴했지만 좀비가 출구를 완전히 포위했다. 식량 보급선이 끊기고 공포가 번졌다.",
      },
    ],
  },
  {
    id: "m02",
    phase: "mid",
    tag: "craft",
    location: "실습동",
    title: "드론 정찰 시스템",
    description:
      "실습동 창고를 뒤지다 교육용 드론 3대와 남은 배터리를 발견했다.",
    choices: [
      {
        id: "m02_a",
        text: "드론으로 캠퍼스 외곽을 정찰한다",
        effect: { mental: 12, food: -5, survivors: -3 },
        resultText:
          "좀비 밀집 구역을 파악했다. 정찰 중 한 대가 추락해 동료가 회수하다 다쳤다.",
      },
      {
        id: "m02_b",
        text: "자동 순찰 프로그램을 코딩해 드론에 탑재한다",
        effect: { mental: 5, food: -10, health: -8 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { food: 10, mental: 8 },
        },
        resultText:
          "코딩에 집중하느라 보급과 건강을 소홀히 했다. 그래도 자동 드론이 추가 식량 구역 두 곳을 찾아냈다.",
      },
      {
        id: "m02_c",
        text: "드론 부품을 해체해 다른 장비에 쓴다",
        effect: { health: 5, mental: -8, food: 3 },
        resultText: "모터와 배터리로 유용한 도구를 만들었다. 하지만 정찰 기회를 잃었다.",
      },
    ],
  },
  {
    id: "m03",
    phase: "mid",
    tag: "scavenge",
    location: "교수 연구실",
    title: "서버실 데이터 복구",
    description:
      "교수 연구실 서버에 캠퍼스 설계도가 있을 것 같았다. 지하 통로 정보도 있을 수 있다.",
    choices: [
      {
        id: "m03_a",
        text: "서버실에 잠입해 하드디스크를 확보한다",
        effect: { food: 10, health: -15, mental: 5 },
        resultText:
          "비상 창고 위치를 찾았다! 하지만 서버실에서 좀비와 마주쳐 크게 다쳤다.",
      },
      {
        id: "m03_b",
        text: "서버 전원 회로를 복구해 원격 접속한다",
        effect: { mental: 8, food: -8, survivors: -5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { mental: 10, food: 10 },
        },
        resultText:
          "회로 수리에 인력을 투입해 보급이 지연됐다. 접속은 성공했지만.",
      },
      {
        id: "m03_c",
        text: "위험을 피하고 주변만 탐색한다",
        effect: { food: 5, mental: -5, health: -3 },
        resultText: "조금 확보했다. 안전하지만 기대에 못 미친다.",
      },
    ],
  },
  {
    id: "m04",
    phase: "mid",
    tag: "social",
    location: "운동장",
    title: "생존자 갈등",
    description:
      "식량 분배를 두고 생존자들 사이에 갈등이 심해지고 있다.",
    choices: [
      {
        id: "m04_a",
        text: "식량을 균등 분배한다",
        effect: { food: -10, survivors: 10, mental: 8 },
        resultText:
          "모두 동의했다. 식량은 크게 줄었지만 신뢰가 올라갔다.",
      },
      {
        id: "m04_b",
        text: "실시간 재고 관리 앱을 만들어 투명하게 공개한다",
        effect: { mental: 5, food: -8, health: -8 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 12, survivors: 5 },
        },
        resultText:
          "앱 개발에 체력을 소모했다. 효과는 좋지만 피로가 쌓인다.",
      },
      {
        id: "m04_c",
        text: "능력에 따라 차등 분배한다",
        effect: { food: -5, survivors: -15, mental: -8 },
        resultText:
          "폭동이 일어났다. 불만 세력이 식량을 가지고 이탈해 상황이 더 악화됐다.",
      },
    ],
  },
  {
    id: "m05",
    phase: "mid",
    tag: "explore",
    location: "지하 창고",
    title: "지하 통로 발견",
    description:
      "지하 창고 끝에서 좁은 통로 입구를 발견했다. 어디로 이어지는지 알 수 없었지만, 건물 간 연결 통로일 수 있었다.",
    choices: [
      {
        id: "m05_a",
        text: "횃불을 들고 끝까지 탐험한다",
        effect: { food: 18, health: -18, mental: -10 },
        resultText:
          "대량의 비축 식량! 하지만 어둠 속에서 크게 다치고 공포에 시달린다.",
      },
      {
        id: "m05_b",
        text: "통로를 봉쇄해 좀비 침입을 막는다",
        effect: { mental: 8, health: -8, food: -3 },
        resultText:
          "침입 경로를 차단했다. 통로 저편의 자원은 포기해야 한다.",
      },
      {
        id: "m05_c",
        text: "통로 입구에 함정을 설치해 방어용으로 활용한다",
        effect: { mental: 5, health: -8, food: -5 },
        resultText:
          "통로에 함정을 설치했다. 탐험은 못 했지만 좀비가 이 경로로 오면 걸러낼 수 있다.",
      },
    ],
  },
  {
    id: "m06",
    phase: "mid",
    tag: "morale",
    location: "옥상",
    title: "무전 신호 수신",
    description:
      "옥상에서 희미한 무전 신호를 잡았다. '...구조대... 18일... 버텨라...'",
    choices: [
      {
        id: "m06_a",
        text: "모두에게 희망의 소식을 전한다",
        effect: { mental: 20, food: -8, health: -3 },
        resultText: "환호가 터졌다! 하지만 축제 분위기에 식량 낭비가 심했다.",
      },
      {
        id: "m06_b",
        text: "무전기 회로를 수리해 정확한 정보를 파악한다",
        effect: { mental: 8, health: -10, food: -5 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 12 },
        },
        resultText: "수리 중 감전 사고가 있었다. 정확한 구조 일정은 파악했지만.",
      },
      {
        id: "m06_c",
        text: "소수만 알리고 조용히 대비한다",
        effect: { mental: 5, survivors: -8, food: 5 },
        resultText: "식량을 아꼈다. 하지만 비밀이 들통나 불신이 퍼졌다.",
      },
    ],
  },
  {
    id: "m07",
    phase: "mid",
    tag: "craft",
    location: "실습동",
    title: "태양광 패널 설치",
    description:
      "실습동 옥상에 교육용 태양광 패널이 설치돼 있었다. 연결하면 안정적인 전력을 확보할 수 있다.",
    choices: [
      {
        id: "m07_a",
        text: "전원이 동원돼 패널을 설치한다",
        effect: { mental: 15, health: -15, food: -5 },
        resultText:
          "전력 확보! 하지만 옥상 작업 중 부상자가 속출했다.",
      },
      {
        id: "m07_b",
        text: "스마트 전력 분배 시스템을 함께 설계한다",
        effect: { mental: 8, health: -8, survivors: -5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { mental: 12 },
        },
        resultText:
          "효율은 극대화됐지만 설계에 인력을 빼앗겨 다른 곳에서 사고가 났다.",
      },
      {
        id: "m07_c",
        text: "패널 부품으로 휴대용 충전기를 만든다",
        effect: { health: 3, food: -3, mental: -8 },
        resultText:
          "충전기는 유용하지만, 전력 문제의 근본적 해결은 안 됐다.",
      },
    ],
  },
  {
    id: "m08",
    phase: "mid",
    tag: "defense",
    location: "본관 로비",
    title: "자동 방어 시스템 구상",
    description:
      "매번 사람이 직접 보초를 서기엔 체력 소모가 크다. 자동화할 방법이 필요하다.",
    choices: [
      {
        id: "m08_a",
        text: "스피커로 소음 유인 장치를 설치한다",
        effect: { mental: 10, food: -8, survivors: -5 },
        resultText:
          "유인 장치가 작동한다! 하지만 설치 중 소음에 끌려온 좀비에게 한 명을 잃었다.",
      },
      {
        id: "m08_b",
        text: "센서 감지 → 자동 잠금 → 알림 시스템을 코딩한다",
        effect: { mental: 5, health: -10, food: -8 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 15, survivors: 3 },
        },
        resultText:
          "완벽한 자동화! 하지만 코딩에 매달리느라 보급과 건강을 소홀히 했다.",
      },
      {
        id: "m08_c",
        text: "보초 인원을 줄이고 쉬는 시간을 늘린다",
        effect: { health: 8, mental: -5, survivors: -5 },
        resultText: "체력은 회복됐지만 경계가 느슨해져 기습에 취약해졌다.",
      },
    ],
  },

  // --- New mid events (m09-m18) ---
  {
    id: "m09",
    phase: "mid",
    tag: "explore",
    location: "운동장",
    title: "폭우와 침수",
    description:
      "밤새 쏟아진 폭우로 1층이 침수됐다. 식량 저장고가 물에 잠기고 있다.",
    choices: [
      {
        id: "m09_a",
        text: "물속에 뛰어들어 식량을 건진다",
        effect: { food: 12, health: -18, mental: -5 },
        resultText: "식량 절반을 건졌다. 하지만 오염된 물에 감염 위험이 높아졌다.",
      },
      {
        id: "m09_b",
        text: "배수 펌프 프로그램을 작성해 자동 배수한다",
        effect: { food: 8, health: -5, mental: 5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { food: 10, health: 5 },
        },
        resultText: "배수에 성공했다. 시간이 걸렸지만 체계적으로 처리했다.",
      },
      {
        id: "m09_c",
        text: "2층으로 거점을 이동한다",
        effect: { food: -15, mental: -8, health: -3 },
        resultText: "1층 식량을 포기하고 이동했다. 안전하지만 식량 손실이 크다.",
      },
    ],
  },
  {
    id: "m10",
    phase: "mid",
    tag: "social",
    location: "후문 앞",
    title: "다른 생존 그룹",
    description:
      "후문 쪽에서 이상 움직임이 감지됐다. 무장한 생존자 그룹이 나타났다. 교역을 원하지만 신뢰할 수 있을까?",
    choices: [
      {
        id: "m10_a",
        text: "식량을 교환하고 정보를 나눈다",
        effect: { food: -8, mental: 12, survivors: 5 },
        resultText: "협상 끝에 유용한 외부 정보를 얻었다. 식량은 줄었지만 든든해졌다.",
      },
      {
        id: "m10_b",
        text: "경계를 유지하며 거리를 둔다",
        effect: { mental: -5, health: -3, food: -3 },
        resultText: "석연찮아 보였다. 무사히 돌려보냈지만 동맹 기회를 놓쳤을지도.",
      },
      {
        id: "m10_c",
        text: "문을 열어주고 합류를 제안한다",
        effect: { survivors: 10, food: -10, mental: -8 },
        resultText:
          "합류했지만 식량 부담이 급증했다. 일부는 규율을 따르지 않아 마찰이 생겼다.",
      },
    ],
  },
  {
    id: "m11",
    phase: "mid",
    tag: "combat",
    location: "실습동",
    title: "실습동 화재",
    description:
      "실습동에서 화재가 발생했다! 귀중한 장비와 자재가 타고 있다.",
    choices: [
      {
        id: "m11_a",
        text: "전원이 소화 작업에 투입한다",
        effect: { mental: 8, health: -15, food: -5 },
        resultText: "불을 껐다. 장비 일부를 살렸지만 다수가 화상을 입었다.",
      },
      {
        id: "m11_b",
        text: "소화기 배관을 수리해 스프링클러를 가동한다",
        effect: { mental: 10, health: -8, food: -8 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { mental: 8, health: 8 },
        },
        resultText: "스프링클러가 작동했다. 배관 수리에 자원을 썼지만 효과적으로 진화했다.",
      },
      {
        id: "m11_c",
        text: "실습동을 포기하고 대피한다",
        effect: { mental: -15, health: 3, food: -5 },
        resultText: "장비와 자재를 모두 잃었다. 안전하지만 앞으로의 제작이 불가능해졌다.",
      },
    ],
  },
  {
    id: "m12",
    phase: "mid",
    tag: "scavenge",
    location: "학생식당",
    title: "식량 부패 위기",
    description:
      "전력이 불안정해지면서 냉장고의 식량이 상하기 시작했다. 빨리 조치하지 않으면 전부 버려야 한다.",
    choices: [
      {
        id: "m12_a",
        text: "소금에 절이고 건조시켜 보존 처리한다",
        effect: { food: 10, health: -8, mental: -3 },
        resultText: "절반은 살렸다. 작업에 체력을 소모했지만 장기 보존이 가능해졌다.",
      },
      {
        id: "m12_b",
        text: "상한 음식을 버리고 새로 탐색한다",
        effect: { food: -5, health: -10, mental: -5 },
        resultText: "탐색에 나갔지만 수확이 적었다. 식량 위기가 심각해지고 있다.",
      },
      {
        id: "m12_c",
        text: "상했어도 끓여서 먹는다",
        effect: { food: 5, health: -15, mental: -8 },
        resultText:
          "배탈이 났다. 여러 명이 식중독에 걸려 전투력이 크게 떨어졌다.",
      },
    ],
  },
  {
    id: "m13",
    phase: "mid",
    tag: "combat",
    location: "본관 로비",
    title: "좀비 변종 출현",
    description:
      "일반 좀비보다 빠르고 영리한 변종이 나타났다. 기존 바리케이드를 우회하고 있다!",
    choices: [
      {
        id: "m13_a",
        text: "변종 패턴을 분석하며 직접 대치한다",
        effect: { mental: 10, health: -18, survivors: -8 },
        resultText: "변종을 처치했지만 큰 희생이 따랐다. 약점을 파악한 것이 유일한 수확이다.",
      },
      {
        id: "m13_b",
        text: "센서 트랩으로 변종을 유인하고 가둔다",
        effect: { mental: 8, health: -8, food: -10 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { mental: 10, health: 8 },
        },
        resultText: "트랩에 성공했다. 자원은 많이 들었지만 안전하게 처리했다.",
      },
      {
        id: "m13_c",
        text: "거점을 옮겨 변종을 피한다",
        effect: { food: -12, mental: -10, survivors: -5 },
        resultText:
          "이동 중 혼란이 발생해 인원과 물자를 잃었다. 임시 거점도 불안하다.",
      },
    ],
  },
  {
    id: "m14",
    phase: "mid",
    tag: "medical",
    location: "기숙사",
    title: "의료 물자 고갈",
    description:
      "붕대, 소독약, 진통제가 바닥났다. 부상자들의 상태가 악화되고 있다.",
    choices: [
      {
        id: "m14_a",
        text: "보건실까지 위험한 보급 작전을 실행한다",
        effect: { health: 15, food: -8, survivors: -5 },
        resultText: "약품을 가져왔지만 보급 중 2명을 잃었다.",
      },
      {
        id: "m14_b",
        text: "약초와 알코올로 대체 의약품을 만든다",
        effect: { health: 8, food: -5, mental: -5 },
        resultText: "임시 약품을 만들었다. 효과는 약하지만 없는 것보다 낫다.",
      },
      {
        id: "m14_c",
        text: "중증 환자에게만 집중 투입한다",
        effect: { health: 5, mental: -12, survivors: -8 },
        resultText:
          "경증 환자를 방치하자 불만이 폭발했다. 일부가 이탈하고 분위기가 최악이다.",
      },
    ],
  },
  {
    id: "m15",
    phase: "mid",
    tag: "social",
    location: "체육관",
    title: "내부 파벌 형성",
    description:
      "강경파와 온건파로 나뉘어 갈등이 격화되고 있다. 리더십이 흔들린다.",
    choices: [
      {
        id: "m15_a",
        text: "투표로 방향을 결정한다",
        effect: { mental: 10, food: -5, survivors: -3 },
        resultText: "민주적으로 결정했다. 소수가 불만을 품었지만 대다수가 납득했다.",
      },
      {
        id: "m15_b",
        text: "양측 대표와 개별 면담으로 중재한다",
        effect: { mental: 5, food: -8, health: -5 },
        resultText: "시간을 들여 중재했다. 완전한 화합은 아니지만 당장의 분열은 막았다.",
      },
      {
        id: "m15_c",
        text: "강경하게 규율을 세운다",
        effect: { mental: -8, survivors: -10, food: -3 },
        resultText:
          "반발이 거세다. 강경파 일부가 물자를 들고 탈출했다.",
      },
    ],
  },
  {
    id: "m16",
    phase: "mid",
    tag: "craft",
    location: "옥상",
    title: "통신탑 재건",
    description:
      "옥상 안테나를 수리하면 외부와 통신할 수 있을지 모른다. 하지만 옥상은 위험하다.",
    choices: [
      {
        id: "m16_a",
        text: "인력을 동원해 안테나를 세운다",
        effect: { mental: 12, health: -12, survivors: -5 },
        resultText: "통신이 복구됐다! 하지만 옥상에서 좀비 기습을 받아 희생자가 나왔다.",
      },
      {
        id: "m16_b",
        text: "회로를 재설계해 저전력 통신기를 만든다",
        effect: { mental: 8, food: -8, health: -5 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 12, food: 5 },
        },
        resultText: "소형 통신기를 완성했다. 시간이 걸렸지만 안전하게 작업했다.",
      },
      {
        id: "m16_c",
        text: "통신 복구를 포기하고 방어에 집중한다",
        effect: { health: 5, mental: -10, food: -3 },
        resultText: "방어는 강화했지만, 외부 정보가 없어 불안이 커진다.",
      },
    ],
  },
  {
    id: "m17",
    phase: "mid",
    tag: "defense",
    location: "후문 앞",
    title: "야간 기습",
    description:
      "새벽 3시, 좀비 무리가 후문 바리케이드를 넘어오고 있다! 보초가 급히 알렸다.",
    choices: [
      {
        id: "m17_a",
        text: "전원 기상해 방어전을 펼친다",
        effect: { mental: 10, health: -15, survivors: -8 },
        resultText: "가까스로 막았다. 하지만 수면 부족과 부상으로 모두 지쳐있다.",
      },
      {
        id: "m17_b",
        text: "함정과 소음 장치로 유인한다",
        effect: { mental: 8, food: -10, health: -5 },
        resultText: "유인에 성공해 피해를 줄였다. 장치 제작에 자원을 소모했다.",
      },
      {
        id: "m17_c",
        text: "내부로 후퇴하고 출입구를 봉쇄한다",
        effect: { health: -3, mental: -12, food: -8 },
        resultText:
          "후퇴하며 후문 보급로를 잃었다. 공포에 질린 생존자들의 멘탈이 무너지고 있다.",
      },
    ],
  },
  {
    id: "m18",
    phase: "mid",
    tag: "explore",
    location: "지하 창고",
    title: "비밀 무기고 발견",
    description:
      "막다른 창고 끝 벽을 두드렸을 때 안쪽이 비어있는 소리가 났다. 벽 뒤에 숨겨진 공간이 있었다. 옛 민방위 무기고 같았다.",
    choices: [
      {
        id: "m18_a",
        text: "벽을 부수고 무기고에 진입한다",
        effect: { mental: 15, health: -12, food: -5 },
        resultText: "소총과 탄약을 발견했다! 소음에 좀비가 몰려왔지만 무장하니 자신감이 생겼다.",
      },
      {
        id: "m18_b",
        text: "조심스럽게 구멍을 내 확인만 한다",
        effect: { mental: 8, health: -5, food: -3 },
        resultText: "무기가 있는 건 확인했다. 당장은 꺼내지 못하지만 위치를 파악했다.",
      },
      {
        id: "m18_c",
        text: "무기고 정보를 다른 생존자 그룹에 알려 동맹을 제안한다",
        effect: { mental: 5, survivors: 8, food: -8 },
        resultText:
          "정보를 대가로 동맹을 맺었다. 인력이 늘고 식량을 교환했지만 무기는 나눠야 한다.",
      },
    ],
  },

  // ========== LATE PHASE (36-52) ==========
  {
    id: "l01",
    phase: "late",
    tag: "combat",
    location: "후문 앞",
    title: "최후의 방어선",
    description:
      "바리케이드가 무너지기 직전이다. 좀비들이 밀려오고 있다!",
    choices: [
      {
        id: "l01_a",
        text: "전원이 힘을 합쳐 방어한다",
        effect: { mental: 15, health: -20, survivors: -10 },
        resultText:
          "사수했다! 하지만 희생이 처참하다.",
      },
      {
        id: "l01_b",
        text: "폭음 장비로 좀비를 교란하고 방어선을 보강한다",
        effect: { mental: 12, health: -8, food: -12 },
        resultText:
          "교란에 성공했지만 장비 전력에 식량 보관 냉장고 전원이 나갔다.",
      },
      {
        id: "l01_c",
        text: "중장비와 용접기로 바리케이드를 보강한다",
        effect: { mental: 8, health: -12, survivors: -8 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { mental: 10, health: 10 },
        },
        resultText: "철벽을 구축했지만 작업 중 큰 희생이 있었다.",
      },
    ],
  },
  {
    id: "l02",
    phase: "late",
    tag: "medical",
    location: "기숙사",
    title: "전염병 우려",
    description:
      "생존자 중 일부에게 고열 증상이 나타났다. 좀비 바이러스인가, 단순 감기인가?",
    choices: [
      {
        id: "l02_a",
        text: "즉시 격리하고 관찰한다",
        effect: { health: 5, survivors: -12, mental: -10 },
        resultText:
          "감기였다. 하지만 격리 과정에서 공포가 퍼져 여러 명이 탈출했다.",
      },
      {
        id: "l02_b",
        text: "남은 약품을 전부 투입해 빠르게 치료한다",
        effect: { health: 15, food: -18, mental: -5 },
        resultText:
          "빠르게 나았지만 약품과 식량이 바닥났다.",
      },
      {
        id: "l02_c",
        text: "온도 센서로 자동 체온 모니터링 장치를 만든다",
        effect: { health: 8, food: -10, survivors: -5 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { health: 12, mental: 5 },
        },
        resultText:
          "장치를 만드느라 인력과 자원을 소모했다. 감염 조기 발견은 가능해졌다.",
      },
    ],
  },
  {
    id: "l03",
    phase: "late",
    tag: "scavenge",
    location: "주차장",
    title: "최후의 보급",
    description:
      "캠퍼스 밖 편의점까지 왕복 보급 작전. 극도로 위험하지만 식량이 절실하다.",
    choices: [
      {
        id: "l03_a",
        text: "소수 정예로 직접 출격한다",
        effect: { food: 22, health: -20, survivors: -10 },
        resultText: "식량을 대량 확보했지만, 3명을 잃고 다수가 중상.",
      },
      {
        id: "l03_b",
        text: "원격 조종 운반 로봇을 급조해 보낸다",
        effect: { food: 8, health: -8, mental: -8 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { food: 15 },
        },
        resultText:
          "로봇 제작에 시간이 걸렸고 소량만 운반했다. 기대보다 적지만 안전했다.",
      },
      {
        id: "l03_c",
        text: "캠퍼스 내 구석구석을 다시 수색한다",
        effect: { food: 8, mental: -8, survivors: -3 },
        resultText: "빈틈에서 조금 찾았다. 절망감은 커지지만 위험은 적었다.",
      },
    ],
  },
  {
    id: "l04",
    phase: "late",
    tag: "defense",
    location: "본관 로비",
    title: "내부의 적",
    description:
      "새벽 순찰 중 창고 자물쇠가 뜯긴 걸 발견했다. 밤사이 누군가 물자를 빼돌렸다. 그룹 안에 배신자가 있다.",
    choices: [
      {
        id: "l04_a",
        text: "전체 회의를 열어 공정하게 재판한다",
        effect: { mental: 10, survivors: -8, food: -8 },
        resultText: "범인을 추방했다. 정의는 세웠지만 식량 피해가 크고 분열이 남았다.",
      },
      {
        id: "l04_b",
        text: "CCTV와 센서 로그로 동선을 추적한다",
        effect: { mental: 5, health: -8, food: -5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { mental: 12, food: 10 },
        },
        resultText:
          "분석에 매달리느라 방어가 소홀해졌다. 범인은 찾았지만 그 동안 좀비 기습이 있었다.",
      },
      {
        id: "l04_c",
        text: "보안을 강화하고 넘어간다",
        effect: { food: -15, mental: -10, survivors: -5 },
        resultText:
          "배신자가 대담해져 더 많은 물자를 빼돌렸다. 방관한 대가가 혹독하다.",
      },
    ],
  },
  {
    id: "l05",
    phase: "late",
    tag: "craft",
    location: "옥상",
    title: "구조 통신 시스템",
    description:
      "18일째가 다가온다. 헬기가 온다고 해도 우리 위치를 알아야 내려온다. 신호를 보내야 한다.",
    choices: [
      {
        id: "l05_a",
        text: "옥상에 거대한 SOS 표식을 만든다",
        effect: { mental: 12, health: -15, food: -5 },
        resultText:
          "표식 완성! 옥상 작업 중 낙상 사고로 크게 다쳤다.",
      },
      {
        id: "l05_b",
        text: "안테나 회로를 개조해 GPS 좌표를 송신한다",
        effect: { mental: 8, health: -8, food: -10 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 15, health: 5 },
        },
        resultText:
          "회로 작업에 몰두해 보급을 놓쳤다. GPS 송신에는 성공했다.",
      },
      {
        id: "l05_c",
        text: "불꽃 신호탄을 쏜다",
        effect: { mental: 10, survivors: -8, health: -5 },
        resultText:
          "신호탄이 좀비도 끌어들였다. 위치는 알렸지만 습격당했다.",
      },
    ],
  },
  {
    id: "l06",
    phase: "late",
    tag: "morale",
    location: "체육관",
    title: "마지막 밤",
    description:
      "내일이면 구조대가 온다. '이 밤만 버티자.' 누군가 말했다. 의료 키트를 점검하는 손이 있었고, 말없이 출입구 앞에 선 사람이 있었다. 역대 최대 규모의 좀비 무리가 접근 중이다.",
    choices: [
      {
        id: "l06_a",
        text: "전원이 함께 최후의 결전을 준비한다",
        effect: { mental: 20, health: -20, survivors: -10 },
        resultText: "선두에 선 사람이 있었다. 부상자를 처치하는 손이 있었다. 마지막까지 자리를 지킨 사람이 있었다. 대가는 컸지만 밤을 넘겼다.",
      },
      {
        id: "l06_b",
        text: "모든 자동화 시스템을 총동원하는 프로그램을 실행한다",
        effect: { mental: 10, food: -12, health: -8 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 12, health: 8 },
        },
        resultText:
          "전 시스템 가동에 전력과 자원이 소진됐다. '덕분에 살았다.' 누군가 말했다. 방어는 됐지만 내일 먹을 게 없다.",
      },
      {
        id: "l06_c",
        text: "가장 견고한 방에 모여서 버틴다",
        effect: { health: 5, mental: -15, survivors: -8 },
        resultText: "체력은 아꼈지만 공포에 시달렸다. 밖에서 비명이 들렸다. 누군가 손을 꽉 쥐었다.",
      },
    ],
  },
  {
    id: "l07",
    phase: "late",
    tag: "explore",
    location: "지하 창고",
    title: "비상 발전기 발견",
    description:
      "지하 창고 깊숙한 곳에서 디젤 비상 발전기를 발견했다. 연료도 조금 남아 있었다.",
    choices: [
      {
        id: "l07_a",
        text: "발전기를 가동해 전력을 최대로 올린다",
        effect: { mental: 15, health: -10, food: -12 },
        resultText:
          "전력 100%! 하지만 발전기 소음에 좀비가 몰려와 식량 저장고를 잃었다.",
      },
      {
        id: "l07_b",
        text: "연료를 아끼고 구조대 신호용으로 보관한다",
        effect: { mental: 5, food: -3, health: -3 },
        resultText:
          "마지막 순간에 쓸 연료를 확보했다. 당장은 아무것도 변하지 않았다.",
      },
      {
        id: "l07_c",
        text: "연료로 화염 트랩을 만든다",
        effect: { mental: 10, health: -12, survivors: -5 },
        resultText:
          "화염 트랩이 좀비를 저지했지만 화재가 번져 화상자가 발생했다.",
      },
    ],
  },
  {
    id: "l08",
    phase: "late",
    tag: "social",
    location: "기숙사",
    title: "탈출 계획 분열",
    description:
      "일부 생존자가 구조대를 기다리지 않고 직접 탈출하겠다고 주장한다.",
    choices: [
      {
        id: "l08_a",
        text: "데이터를 보여주며 설득한다",
        effect: { mental: 12, survivors: 5, food: -8 },
        resultText:
          "설득에 성공했다. 모두 남기로 했지만 회의에 시간을 써 보급을 놓쳤다.",
      },
      {
        id: "l08_b",
        text: "원하는 사람은 떠나게 한다",
        effect: { food: -3, survivors: -18, mental: -12 },
        resultText:
          "10명이 떠났다. 남은 사람들도 동요해 추가 이탈이 이어지고 식량도 빼앗겼다.",
      },
      {
        id: "l08_c",
        text: "폐차를 개조해 장갑 차량을 만들어 대비한다",
        effect: { mental: 8, food: -10, survivors: -5 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { mental: 10, survivors: 8 },
        },
        resultText:
          "장갑차 제작에 자원을 쏟았다. 탈출 수단이 생기자 모두 안심했다.",
      },
    ],
  },

  // --- New mid events (m19-m23) ---
  {
    id: "m19",
    phase: "mid",
    tag: "morale",
    location: "도서관",
    title: "생존자의 일기",
    description:
      "도서관에서 이미 감염된 생존자의 일기를 발견했다. 마지막 페이지에 '포기하지 마. 반드시 살아남아.'라고 적혀 있다.",
    choices: [
      {
        id: "m19_a",
        text: "일기를 모두에게 읽어준다",
        effect: { mental: 15, food: -5, health: -3 },
        resultText: "눈물을 흘리는 사람도 있었다. 그의 의지가 우리에게 전해졌다.",
      },
      {
        id: "m19_b",
        text: "일기에 적힌 안전한 장소 정보를 활용한다",
        effect: { food: 8, mental: 5, health: -8 },
        resultText: "일기에 적힌 식량 은닉처를 찾았다. 실용적이지만 좀 씁쓸하다.",
      },
      {
        id: "m19_c",
        text: "일기를 덮고 앞만 본다",
        effect: { mental: -8, food: -3, health: 3 },
        resultText: "감정에 흔들리지 않았다. 하지만 마음 한쪽이 무겁다.",
      },
    ],
  },
  {
    id: "m20",
    phase: "mid",
    tag: "medical",
    location: "교수 연구실",
    title: "감염 초기 증상 연구",
    description:
      "교수 연구실에서 좀비 바이러스 초기 증상에 관한 연구 데이터를 발견했다. 논문을 펼치자마자 분위기가 굳었다. 이걸 알면 살 수 있다.",
    choices: [
      {
        id: "m20_a",
        text: "센서 기반 체온/맥박 감지 시스템을 만든다",
        effect: { health: 10, food: -8, mental: 5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { health: 10, mental: 8 },
        },
        resultText: "캘리브레이션을 마쳤다. 감염 조기 발견 장치가 완성됐다. 증상이 나타나기 전에 격리할 수 있다.",
      },
      {
        id: "m20_b",
        text: "데이터를 읽고 증상 체크리스트를 만든다",
        effect: { health: 5, mental: 5, food: -5 },
        resultText: "항목 하나하나를 확인했다. 완벽하진 않지만 이제 누구나 판별할 수 있다.",
      },
      {
        id: "m20_c",
        text: "좀비에게 접근해 바이러스 샘플을 직접 채취한다",
        effect: { mental: 5, health: -12, food: -5 },
        resultText:
          "위험하게 샘플을 확보했다. 감염 메커니즘의 단서를 얻었지만 채취 중 크게 다쳤다.",
      },
    ],
  },
  {
    id: "m21",
    phase: "mid",
    tag: "combat",
    location: "기숙사",
    title: "기숙사 좀비 침입",
    description:
      "새벽, 기숙사 1층 창문이 깨지며 좀비 5마리가 침입했다! 잠든 생존자들이 위험하다.",
    choices: [
      {
        id: "m21_a",
        text: "자동 잠금 프로그램을 실행해 층별로 격리한다",
        effect: { mental: 10, health: -8, food: -5 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 10, survivors: 5 },
        },
        resultText: "프로그램이 문을 자동으로 잠갔다. 좀비를 1층에 가뒀다. 피해를 최소화했다.",
      },
      {
        id: "m21_b",
        text: "무기를 들고 1층으로 내려가 처리한다",
        effect: { mental: 8, health: -15, survivors: -5 },
        resultText: "격투 끝에 제압했지만 밤중 혼란에 부상자가 속출했다.",
      },
      {
        id: "m21_c",
        text: "2층 이상으로 대피하고 1층을 포기한다",
        effect: { food: -12, mental: -8, health: -3 },
        resultText: "1층 식량 저장고를 잃었다. 안전하지만 식량 타격이 심각하다.",
      },
    ],
  },
  {
    id: "m22",
    phase: "mid",
    tag: "scavenge",
    location: "주차장",
    title: "트럭 내 보급품",
    description:
      "주차장에 방치된 배달 트럭을 발견했다. 짐칸이 잠겨있지만 안에 뭔가 있는 것 같다.",
    choices: [
      {
        id: "m22_a",
        text: "트럭 잠금장치를 용접 토치로 절단한다",
        effect: { food: 15, health: -10, mental: -3 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { food: 8, health: 5 },
        },
        resultText: "생수와 라면 박스가 가득! 절단 작업에 체력을 소모했지만 대박이다.",
      },
      {
        id: "m22_b",
        text: "트럭 밑으로 기어들어가 짐칸 바닥을 뚫는다",
        effect: { food: 8, health: -12, mental: -5 },
        resultText: "좁은 공간에서 힘든 작업이었다. 일부만 꺼냈지만 없는 것보다 낫다.",
      },
      {
        id: "m22_c",
        text: "트럭째로 거점까지 밀어온다",
        effect: { food: 10, health: -15, survivors: -3 },
        resultText: "트럭을 밀다가 소음에 좀비가 몰려왔다. 가까스로 도착했지만 한 명을 잃었다.",
      },
    ],
  },
  {
    id: "m23",
    phase: "mid",
    tag: "defense",
    location: "체육관",
    title: "체육관 요새화",
    description:
      "체육관이 가장 넓고 방어하기 좋다. 이곳을 최종 거점으로 요새화할 것인가?",
    choices: [
      {
        id: "m23_a",
        text: "3D프린터로 맞춤형 방어 구조물을 제작해 설치한다",
        effect: { mental: 12, health: -10, food: -8 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { mental: 10, health: 5 },
        },
        resultText: "정밀하게 설계된 방어 구조물이 완성됐다. 체육관이 난공불락이 됐다.",
      },
      {
        id: "m23_b",
        text: "체육 기구로 바리케이드를 쌓는다",
        effect: { mental: 8, health: -12, food: -5 },
        resultText: "역기와 매트로 임시 방벽을 만들었다. 완벽하진 않지만 쓸만하다.",
      },
      {
        id: "m23_c",
        text: "체육관 내부를 칸막이로 나눠 구역별 방어 체계를 세운다",
        effect: { mental: 5, health: -8, food: -5 },
        resultText:
          "커튼과 매트로 구역을 나눴다. 좁은 통로를 만들어 방어가 수월해졌지만 자원이 들었다.",
      },
    ],
  },

  // --- New late events (l09-l17) ---
  {
    id: "l09",
    phase: "late",
    tag: "morale",
    location: "옥상",
    title: "구조 헬기 좌표 확인",
    description:
      "무전에서 구조 헬기의 착륙 좌표가 전달됐다. 운동장이다. 하지만 운동장은 좀비가 가득하다.",
    choices: [
      {
        id: "l09_a",
        text: "지금부터 운동장을 소탕한다",
        effect: { mental: 15, health: -18, survivors: -10 },
        resultText: "운동장을 확보했다! 하지만 대가가 처참하다. 구조까지 버틸 수 있을까.",
      },
      {
        id: "l09_b",
        text: "D-day에 맞춰 총공격을 준비한다",
        effect: { mental: 10, food: -10, health: -5 },
        resultText: "준비는 착실히 됐다. 그날까지 식량이 버틸 수 있을지가 관건이다.",
      },
      {
        id: "l09_c",
        text: "좌표를 무시하고 독자 탈출을 시도한다",
        effect: { mental: -15, survivors: -12, health: -10 },
        resultText:
          "독자 탈출은 무모했다. 다수를 잃고 돌아왔다. 구조 신호만 기다리는 게 나았다.",
      },
    ],
  },
  {
    id: "l10",
    phase: "late",
    tag: "scavenge",
    location: "학생식당",
    title: "최후의 식량 위기",
    description:
      "식량이 이틀치도 남지 않았다. 구조대가 올 때까지 어떻게든 버텨야 한다.",
    choices: [
      {
        id: "l10_a",
        text: "위험을 무릅쓰고 캠퍼스 외곽을 탐색한다",
        effect: { food: 15, health: -18, survivors: -8 },
        resultText: "편의점에서 식량을 확보했다. 하지만 2명이 돌아오지 못했다.",
      },
      {
        id: "l10_b",
        text: "배급량을 극단적으로 줄인다",
        effect: { food: 5, mental: -15, health: -8 },
        resultText: "굶주림에 모두가 지쳐간다. 불만이 극에 달해 분열이 일어날 것 같다.",
      },
      {
        id: "l10_c",
        text: "캠퍼스 내 화단과 잔디를 뜯어먹는다",
        effect: { food: 3, health: -12, mental: -10 },
        resultText:
          "풀과 뿌리를 끓여 먹었다. 배탈이 나고 사기가 바닥이다.",
      },
    ],
  },
  {
    id: "l11",
    phase: "late",
    tag: "combat",
    location: "주차장",
    title: "대규모 좀비 웨이브",
    description:
      "수백 마리의 좀비가 캠퍼스를 향해 밀려오고 있다. 역대 최대 규모다.",
    choices: [
      {
        id: "l11_a",
        text: "모든 전투력을 집중해 정면 돌파한다",
        effect: { mental: 15, health: -20, survivors: -15 },
        resultText: "살아남았다. 하지만 거의 절반을 잃었다. 잔해 위에 선 승리다.",
      },
      {
        id: "l11_b",
        text: "차량과 로봇으로 유인해 분산시킨다",
        effect: { mental: 10, food: -12, health: -8 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { mental: 10, survivors: 8 },
        },
        resultText: "유인 작전이 성공해 피해를 최소화했다. 자원 소모가 컸지만 지켰다.",
      },
      {
        id: "l11_c",
        text: "건물 내부에 숨어서 지나가길 기다린다",
        effect: { health: -5, mental: -18, food: -10 },
        resultText:
          "좀비들이 바리케이드를 무너뜨렸다. 숨어있던 동안 외곽 시설을 모두 잃었다.",
      },
    ],
  },
  {
    id: "l12",
    phase: "late",
    tag: "medical",
    location: "기숙사",
    title: "감염 의심자 2차 발생",
    description:
      "한 생존자의 팔에 물린 자국이 발견됐다. 상처를 직접 확인한 사람이 말이 없었다. 감염까지 시간이 얼마 안 남았을 수 있다.",
    choices: [
      {
        id: "l12_a",
        text: "즉시 격리하고 관찰한다",
        effect: { health: 8, survivors: -10, mental: -8 },
        resultText: "격리 기준을 정했다. 좀비화가 진행됐고 안전을 지켰지만, 방 밖에서 한참을 서 있는 사람이 있었다.",
      },
      {
        id: "l12_b",
        text: "감염 부위를 절단한다",
        effect: { health: -5, survivors: -3, mental: -15 },
        resultText: "극단적 조치로 감염을 막았다. 생존자는 살았지만 모두의 멘탈이 무너졌다.",
      },
      {
        id: "l12_c",
        text: "감염자 곁에서 교대로 감시하며 함께 행동한다",
        effect: { health: -8, survivors: -5, mental: -5 },
        resultText:
          "교대로 감시하며 동행했다. 결국 격리해야 했지만 동료를 끝까지 존중한 것이 남은 사람들에게 위로가 됐다.",
      },
    ],
  },
  {
    id: "l13",
    phase: "late",
    tag: "explore",
    location: "지하 창고",
    title: "지하 탈출로 개척",
    description:
      "지하 통로가 캠퍼스 밖으로 이어지는 것 같다. 구조대가 못 오는 최악의 경우를 대비해, 자체 비상 탈출로를 확보해 두어야 한다.",
    choices: [
      {
        id: "l13_a",
        text: "전원이 탈출로 탐색에 나선다",
        effect: { mental: 10, health: -15, food: -8 },
        resultText: "출구를 찾았다! 하지만 좁고 위험한 통로에서 다수가 다쳤다.",
      },
      {
        id: "l13_b",
        text: "소형 로봇을 보내 통로를 매핑한다",
        effect: { mental: 8, food: -10, health: -3 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 12, health: 5 },
        },
        resultText: "로봇이 통로 지도를 완성했다. 안전한 탈출 경로를 확보했다.",
      },
      {
        id: "l13_c",
        text: "통로를 봉쇄하고 현재 거점을 사수한다",
        effect: { mental: -8, health: 5, food: -3 },
        resultText: "비상 탈출로를 포기했다. 거점은 안전하지만 막다른 골목이 됐다.",
      },
    ],
  },
  {
    id: "l14",
    phase: "late",
    tag: "defense",
    location: "본관 로비",
    title: "자원 약탈 시도",
    description:
      "밤중에 외부 생존자 그룹이 무기를 들고 본관에 침입했다. 식량을 내놓으라고 위협한다.",
    choices: [
      {
        id: "l14_a",
        text: "협상을 시도한다",
        effect: { food: -12, mental: -5, survivors: -3 },
        resultText: "식량 일부를 주고 물러나게 했다. 평화적이었지만 손실이 크다.",
      },
      {
        id: "l14_b",
        text: "무력으로 제압한다",
        effect: { mental: 8, health: -18, survivors: -8 },
        resultText: "격퇴에 성공했다. 하지만 아군 피해도 심각하다.",
      },
      {
        id: "l14_c",
        text: "빈 상자를 건네며 속인다",
        effect: { mental: 5, food: -3, survivors: -5 },
        resultText:
          "속임수가 들통나기 전에 떠났다. 하지만 보복이 있을 수 있다. 일부가 두려워 이탈했다.",
      },
    ],
  },
  {
    id: "l15",
    phase: "late",
    tag: "social",
    location: "체육관",
    title: "생존자 반란",
    description:
      "지친 생존자 일부가 리더십에 반기를 들었다. '너 때문에 사람이 죽었어!'라고 외친다.",
    choices: [
      {
        id: "l15_a",
        text: "솔직하게 사과하고 대화한다",
        effect: { mental: 8, food: -5, survivors: -3 },
        resultText: "진심이 통했다. 일부는 화해했지만, 떠나는 사람도 있었다.",
      },
      {
        id: "l15_b",
        text: "이유를 설명하고 앞으로의 계획을 제시한다",
        effect: { mental: 12, food: -8, health: -5 },
        resultText: "구조 계획을 설명하자 희망이 생겼다. 자원을 써서 시연까지 했지만 효과적이었다.",
      },
      {
        id: "l15_c",
        text: "반란을 강경 진압한다",
        effect: { mental: -15, survivors: -15, food: -5 },
        resultText:
          "강압적 진압에 대규모 이탈이 발생했다. 남은 인원으로는 방어도 힘들다.",
      },
    ],
  },
  {
    id: "l16",
    phase: "late",
    tag: "craft",
    location: "실습동",
    title: "최후의 발명",
    description:
      "남은 부품으로 마지막 발명품을 만들 수 있다. 하나만 골라야 한다.",
    choices: [
      {
        id: "l16_a",
        text: "전자기 펄스 장치를 만들어 좀비를 교란한다",
        effect: { mental: 12, health: -10, food: -10 },
        resultText: "EMP로 좀비 움직임이 둔해졌다. 하지만 우리 장비도 일부 고장났다.",
      },
      {
        id: "l16_b",
        text: "방어용 터렛을 자동화한다",
        effect: { mental: 10, health: -8, food: -12 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 12, health: 8 },
        },
        resultText: "자동 터렛이 가동됐다. 보초 없이도 방어가 가능해졌다.",
      },
      {
        id: "l16_c",
        text: "신호 증폭기를 만들어 구조대에 위치를 알린다",
        effect: { mental: 15, food: -8, survivors: -3 },
        resultText: "강력한 신호를 발사했다. 구조대가 정확히 올 수 있을 것이다.",
      },
    ],
  },
  {
    id: "l17",
    phase: "late",
    tag: "morale",
    location: "운동장",
    title: "D-1 최종 결전 준비",
    description:
      "내일이면 구조대가 온다. 하지만 밤새 운동장을 지켜야 한다. 마지막 밤이다.",
    choices: [
      {
        id: "l17_a",
        text: "모든 것을 걸고 운동장을 사수한다",
        effect: { mental: 20, health: -20, survivors: -10 },
        resultText: "밤새 싸웠다. 새벽이 밝아올 때, 살아남은 자들의 눈에 눈물이 흘렀다.",
      },
      {
        id: "l17_b",
        text: "교대로 방어하며 체력을 아낀다",
        effect: { mental: 10, health: -10, food: -10 },
        resultText: "효율적으로 방어했다. 지쳤지만 모두 살아서 아침을 맞았다.",
      },
      {
        id: "l17_c",
        text: "건물 안에서 조용히 버틴다",
        effect: { health: 3, mental: -18, survivors: -12 },
        resultText:
          "밖에서 비명이 들렸다. 아침에 나가보니 바리케이드가 무너지고 운동장이 좀비로 가득했다.",
      },
    ],
  },
  // --- New late events (l18-l22) ---
  {
    id: "l18",
    phase: "late",
    tag: "social",
    location: "교수 연구실",
    title: "최후의 약속",
    description:
      "살아남으면 뭘 할 건지 서로 이야기하자며 생존자들이 모였다. 사소한 대화가 의외로 큰 힘이 된다.",
    choices: [
      {
        id: "l18_a",
        text: "시간을 들여 진지하게 대화한다",
        effect: { mental: 15, food: -10, health: -3 },
        resultText: "눈물과 웃음이 교차했다. 서로의 이유를 알게 되니 포기할 수 없다.",
      },
      {
        id: "l18_b",
        text: "짧게 이야기하고 방어 준비로 돌아간다",
        effect: { mental: 5, health: -5, food: -3 },
        resultText: "짧은 대화였지만 마음이 가벼워졌다. 곧바로 각자 위치로 돌아갔다.",
      },
      {
        id: "l18_c",
        text: "각자 유서를 쓰고 한곳에 모아 보관한다",
        effect: { mental: -5, health: 3, survivors: 3 },
        resultText:
          "유서를 쓰는 동안 기묘한 평온이 찾아왔다. 죽음을 직시하니 오히려 살겠다는 의지가 더 강해졌다.",
      },
    ],
  },
  {
    id: "l19",
    phase: "late",
    tag: "combat",
    location: "운동장",
    title: "변종 좀비 대군",
    description:
      "빠르고 영리한 변종 좀비 수십 마리가 운동장에 집결했다. 일반 바리케이드로는 막을 수 없다.",
    choices: [
      {
        id: "l19_a",
        text: "전기 울타리를 급조해 감전시킨다",
        effect: { mental: 12, health: -12, food: -10 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 10, health: 8 },
        },
        resultText: "전기 울타리가 변종을 저지했다. 전력 소모가 심하지만 효과적이었다.",
      },
      {
        id: "l19_b",
        text: "건물 안에서 좁은 통로로 유인해 각개격파한다",
        effect: { mental: 8, health: -18, survivors: -8 },
        resultText: "좁은 통로에서 하나씩 처리했다. 하지만 근접전에서 큰 희생이 따랐다.",
      },
      {
        id: "l19_c",
        text: "연막탄을 터트리고 후퇴한다",
        effect: { health: -5, mental: -12, food: -12 },
        resultText: "운동장을 내줬다. 구조 헬기 착륙 지점을 잃었다. 대안을 찾아야 한다.",
      },
    ],
  },
  {
    id: "l20",
    phase: "late",
    tag: "scavenge",
    location: "도서관",
    title: "도서관 비밀 금고",
    description:
      "이 학교 어딘가에 교직원용 비상 물자가 있을 것이었다. 도서관 지하 서고를 뒤지다 잠긴 금고를 발견했다.",
    choices: [
      {
        id: "l20_a",
        text: "금고 전자 잠금을 해킹한다",
        effect: { food: 15, health: -8, mental: 5 },
        departmentBonus: {
          departmentId: "smart_ee",
          extraEffect: { food: 10, mental: 5 },
        },
        resultText: "비상 식량과 의약품이 가득했다! 이 시점에서 이런 행운이라니.",
      },
      {
        id: "l20_b",
        text: "공구로 금고를 물리적으로 연다",
        effect: { food: 10, health: -15, mental: -5 },
        resultText: "소음에 좀비가 몰려와 혼란스러웠다. 물자는 일부만 챙겼다.",
      },
      {
        id: "l20_c",
        text: "교무처 서류함에서 금고 비밀번호를 찾아본다",
        effect: { food: 12, health: -3, mental: -8 },
        resultText:
          "서류함을 뒤져 비밀번호를 찾았다. 시간이 오래 걸렸지만 소음 없이 금고를 열 수 있었다.",
      },
    ],
  },
  {
    id: "l21",
    phase: "late",
    tag: "defense",
    location: "주차장",
    title: "차량 방어선",
    description:
      "주차장 차량을 이용해 최종 방어선을 구축할 기회다. 하지만 연료가 거의 없다.",
    choices: [
      {
        id: "l21_a",
        text: "차량을 용접해 철갑 장벽을 만든다",
        effect: { mental: 12, health: -15, food: -8 },
        departmentBonus: {
          departmentId: "mechanical",
          extraEffect: { mental: 10, health: 10 },
        },
        resultText: "난공불락의 장벽이 완성됐다. 용접 작업에 전력을 다해 탈진 직전이다.",
      },
      {
        id: "l21_b",
        text: "차량에 남은 기름을 모아 화염 트랩을 설치한다",
        effect: { mental: 8, health: -10, survivors: -5 },
        resultText: "기름 수집 중 폭발 사고가 있었다. 트랩은 완성했지만 부상자가 나왔다.",
      },
      {
        id: "l21_c",
        text: "차량은 그대로 두고 인원을 배치한다",
        effect: { health: -8, mental: -10, food: -5 },
        resultText: "빈약한 방어선이다. 좀비가 차 사이로 쉽게 침투할 수 있어 불안하다.",
      },
    ],
  },
  {
    id: "l22",
    phase: "late",
    tag: "medical",
    location: "체육관",
    title: "마지막 부상자",
    description:
      "방어전 중 핵심 인원이 심한 부상을 입었다. 응급 수술이 필요하지만 의약품이 바닥났다.",
    choices: [
      {
        id: "l22_a",
        text: "미리 다운받아 둔 의료 데이터베이스로 수술 과정을 확인한다",
        effect: { health: 10, food: -8, mental: -8 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { health: 10, mental: 5 },
        },
        resultText: "오프라인 저장 데이터가 수술 단계를 안내했다. 떨리는 손으로 성공했지만 트라우마가 남았다.",
      },
      {
        id: "l22_b",
        text: "깨끗한 천과 술로 임시 처치한다",
        effect: { health: 3, food: -5, mental: -12 },
        resultText: "출혈은 멈췄지만 감염 위험이 크다. 기도하는 수밖에 없다.",
      },
      {
        id: "l22_c",
        text: "다른 생존자를 보내 외부에서 약품을 구해온다",
        effect: { health: 8, survivors: -8, food: -5 },
        resultText: "약품을 구했지만 보급 팀 일부가 돌아오지 못했다. 씁쓸한 교환이다.",
      },
    ],
  },
] as const;

// ========== SPECIAL CRISIS EVENTS (appear randomly after turn 26) ==========
export const SPECIAL_EVENTS: readonly GameEvent[] = [
  // --- External news events ---
  {
    id: "sp01",
    phase: "mid",
    tag: "morale",
    location: "옥상",
    title: "긴급 속보: 바이러스 변이 확인",
    description:
      "라디오에서 긴급 뉴스가 흘러나온다. '좀비 바이러스가 변이를 일으켜 공기 감염 가능성이 제기되고 있습니다...'",
    isSpecial: true,
    choices: [
      {
        id: "sp01_a",
        text: "즉시 환기구를 봉쇄하고 마스크를 제작한다",
        effect: { mental: 8, health: -10, food: -10 },
        resultText: "환기구를 막고 천 마스크를 만들었다. 답답하지만 안전을 우선했다.",
      },
      {
        id: "sp01_b",
        text: "패닉을 방지하기 위해 뉴스를 숨긴다",
        effect: { mental: -5, health: -5, survivors: -8 },
        resultText: "비밀이 누설됐다. 일부가 도주하고 나머지는 리더십을 의심하기 시작했다.",
      },
      {
        id: "sp01_c",
        text: "사실을 알리고 함께 대비한다",
        effect: { mental: -12, food: -8, health: 5 },
        resultText: "공포가 퍼졌지만, 함께 대비하면서 실질적인 방역 체계를 갖추었다.",
      },
    ],
  },
  {
    id: "sp02",
    phase: "mid",
    tag: "morale",
    location: "옥상",
    title: "정부 긴급 방송: 구조 지연",
    description:
      "정부 비상 방송이 잡혔다. '현재 군 병력이 수도권에 집중 투입 중입니다. 지방 구조는 지연될 수 있으니 자체적으로 버텨주십시오.'",
    isSpecial: true,
    choices: [
      {
        id: "sp02_a",
        text: "18일은 변함없다고 생존자들을 안심시킨다",
        effect: { mental: 5, food: -5, survivors: -3 },
        resultText: "불안하지만 리더의 확신에 다수가 따랐다. 일부는 의심의 눈초리를 보낸다.",
      },
      {
        id: "sp02_b",
        text: "자체 탈출 계획을 병행 준비한다",
        effect: { mental: -8, food: -12, health: -5 },
        resultText: "구조가 안 올 경우를 대비했다. 자원 소모가 컸지만 플랜B가 생겼다.",
      },
      {
        id: "sp02_c",
        text: "포기하고 각자도생을 선언한다",
        effect: { mental: -18, survivors: -15, food: -5 },
        resultText:
          "조직이 와해됐다. 모두가 흩어지면서 약탈과 혼란이 시작됐다.",
      },
    ],
  },
  {
    id: "sp03",
    phase: "late",
    tag: "morale",
    location: "옥상",
    title: "구조 헬기 목격!",
    description:
      "멀리서 헬기 소리가 들린다! 수평선 너머로 군용 헬기 한 대가 보인다. 하지만 이쪽으로 오고 있는지는 확실하지 않다.",
    isSpecial: true,
    choices: [
      {
        id: "sp03_a",
        text: "모든 연료를 태워 신호 화염을 올린다",
        effect: { mental: 15, food: -15, health: -8 },
        resultText: "거대한 화염이 솟았다. 헬기가 방향을 틀었다! 하지만 연료를 전부 소진했다.",
      },
      {
        id: "sp03_b",
        text: "무전으로 좌표를 송신한다",
        effect: { mental: 10, health: -5, food: -5 },
        resultText: "무전이 닿았는지 불확실하다. 헬기는 지나갔지만 희망이 남았다.",
      },
      {
        id: "sp03_c",
        text: "침착하게 기다린다. 아직 때가 아니다",
        effect: { mental: -10, food: -3, survivors: -5 },
        resultText: "헬기는 떠났다. 일부 생존자가 절망에 빠져 이탈했다.",
      },
    ],
  },
  // --- Campus major events ---
  {
    id: "sp04",
    phase: "mid",
    tag: "combat",
    location: "본관 로비",
    title: "본관 일부 붕괴!",
    description:
      "새벽에 굉음과 함께 본관 동쪽 벽이 무너졌다! 좀비들이 틈을 타 밀려들고 있다. 긴급 대응이 필요하다.",
    isSpecial: true,
    choices: [
      {
        id: "sp04_a",
        text: "전원이 나서서 잔해로 틈을 막는다",
        effect: { mental: 10, health: -20, survivors: -8 },
        resultText: "목숨을 걸고 틈을 막았다. 아군 피해가 심각하지만 거점은 지켰다.",
      },
      {
        id: "sp04_b",
        text: "붕괴 구역을 포기하고 방어선을 뒤로 물린다",
        effect: { mental: -12, food: -12, health: -5 },
        resultText: "본관 절반을 잃었다. 식량 저장고도 함께 잃어 위기가 가중됐다.",
      },
      {
        id: "sp04_c",
        text: "잔해를 이용해 새로운 바리케이드를 구축한다",
        effect: { mental: 5, health: -15, food: -8 },
        resultText: "콘크리트 잔해로 더 견고한 벽을 만들었다. 대가는 컸지만 방어력이 올랐다.",
      },
    ],
  },
  {
    id: "sp05",
    phase: "late",
    tag: "defense",
    location: "실습동",
    title: "실습동 폭발 사고",
    description:
      "실습동 화학 약품 저장고에서 대규모 폭발이 발생했다! 화염이 번지고 연기가 캠퍼스를 뒤덮고 있다.",
    isSpecial: true,
    choices: [
      {
        id: "sp05_a",
        text: "소화 작전을 실행한다",
        effect: { mental: 8, health: -18, food: -10 },
        resultText: "불을 잡았지만 실습동 장비 대부분이 소실됐다. 화상자도 다수 발생.",
      },
      {
        id: "sp05_b",
        text: "실습동을 포기하고 전원 대피한다",
        effect: { mental: -15, health: -5, food: -8 },
        resultText: "실습동이 전소됐다. 모든 제작 장비를 잃었다. 앞으로 수리나 제작이 불가능하다.",
      },
      {
        id: "sp05_c",
        text: "폭발을 이용해 좀비 밀집 구역을 소각한다",
        effect: { mental: 12, health: -10, survivors: -8 },
        resultText: "화염이 좀비 수백 마리를 태웠다. 하지만 통제 불능의 위험한 도박이었다.",
      },
    ],
  },
  {
    id: "sp06",
    phase: "mid",
    tag: "medical",
    location: "기숙사",
    title: "집단 식중독 발생",
    description:
      "저녁 식사 후 생존자 절반 이상이 복통과 구토 증세를 보이고 있다. 오염된 식량이 원인인 것 같다.",
    isSpecial: true,
    choices: [
      {
        id: "sp06_a",
        text: "남은 약품을 총동원해 치료한다",
        effect: { health: 10, food: -18, mental: -5 },
        resultText: "대부분 회복됐지만 약품과 깨끗한 식량이 바닥났다.",
      },
      {
        id: "sp06_b",
        text: "의심 식량을 전부 폐기하고 새로 확보한다",
        effect: { food: -20, health: -8, mental: -3 },
        resultText: "안전한 식량만 남겼다. 양이 극도로 줄었지만 추가 감염은 막았다.",
      },
      {
        id: "sp06_c",
        text: "가벼운 증세는 무시하고 물만 마시게 한다",
        effect: { health: -15, mental: -10, survivors: -5 },
        resultText:
          "증세가 악화돼 몇 명이 위독해졌다. 방치한 대가가 크다.",
      },
    ],
  },
  {
    id: "sp07",
    phase: "late",
    tag: "combat",
    location: "후문 앞",
    title: "무장 약탈단 습격",
    description:
      "무장한 약탈단이 트럭을 몰고 캠퍼스에 진입했다! 총성이 울리고, '물자를 내놔!'라는 외침이 들린다.",
    isSpecial: true,
    choices: [
      {
        id: "sp07_a",
        text: "무기를 들고 맞서 싸운다",
        effect: { mental: 12, health: -20, survivors: -12 },
        resultText: "치열한 교전 끝에 격퇴했다. 아군 피해가 막심하지만 물자는 지켰다.",
      },
      {
        id: "sp07_b",
        text: "식량 절반을 건네고 떠나게 한다",
        effect: { food: -20, mental: -8, health: -3 },
        resultText: "약탈단은 식량을 챙겨 떠났다. 인명 피해는 없지만 식량이 절반으로 줄었다.",
      },
      {
        id: "sp07_c",
        text: "함정을 설치하고 매복한다",
        effect: { mental: 10, health: -12, food: -8 },
        resultText: "매복에 성공해 약탈단을 무력화했다. 트럭에서 추가 물자도 확보했다.",
      },
    ],
  },
  {
    id: "sp08",
    phase: "late",
    tag: "morale",
    location: "옥상",
    title: "긴급 속보: 백신 개발 소식",
    description:
      "라디오에서 희망적인 뉴스가 흘러나온다. '서울대 연구팀이 좀비 바이러스 백신 1차 개발에 성공했습니다. 구조대 파견은 예정대로 진행됩니다...'",
    isSpecial: true,
    choices: [
      {
        id: "sp08_a",
        text: "모두에게 알려 사기를 높인다",
        effect: { mental: 20, food: -10, health: -3 },
        resultText: "환호가 터졌다! 구조대가 온다는 사실이 더 실감났다. 축제 분위기에 식량 소모가 컸다.",
      },
      {
        id: "sp08_b",
        text: "냉정하게 상황을 분석하고 계획을 세운다",
        effect: { mental: 10, food: -5, health: -3 },
        resultText: "백신보다 구조대가 먼저 온다. 구조까지 버티는 데 집중하자고 모두를 설득했다.",
      },
      {
        id: "sp08_c",
        text: "거짓 뉴스일 수 있으니 무시한다",
        effect: { mental: -5, food: -3, survivors: -5 },
        resultText: "희망을 꺾자 실망한 생존자 일부가 떠났다. 냉소적 판단이 사기를 떨어뜨렸다.",
      },
    ],
  },
  // --- New special events (sp09-sp12) ---
  {
    id: "sp09",
    phase: "mid",
    tag: "scavenge",
    location: "주차장",
    title: "군 보급 차량 발견!",
    description:
      "주차장 구석에서 전복된 군용 트럭을 발견했다. 운전석에 좀비가 된 군인이 있지만, 화물칸에 보급품이 가득하다.",
    isSpecial: true,
    choices: [
      {
        id: "sp09_a",
        text: "CNC 절삭 공구로 화물칸 잠금을 정밀하게 해체한다",
        effect: { food: 18, health: -10, mental: 5 },
        departmentBonus: {
          departmentId: "smart_mech",
          extraEffect: { food: 12, health: 5 },
        },
        resultText: "조용히 잠금을 해체해 대량의 전투식량과 의약품을 확보했다!",
      },
      {
        id: "sp09_b",
        text: "좀비를 처리하고 운전석부터 수색한다",
        effect: { food: 12, health: -15, mental: -5 },
        resultText: "군인의 무전기와 식량을 얻었다. 하지만 좀비 처리 중 부상을 입었다.",
      },
      {
        id: "sp09_c",
        text: "위험하니 멀리서 지켜보기만 한다",
        effect: { food: -3, mental: -8, health: 3 },
        resultText: "결국 다른 생존자 그룹이 먼저 가져갔다. 기회를 놓친 것이 뼈아프다.",
      },
    ],
  },
  {
    id: "sp10",
    phase: "late",
    tag: "social",
    location: "체육관",
    title: "다른 학교 생존자 무전",
    description:
      "무전에서 인근 대학교 생존자 그룹의 목소리가 들린다. '여기는 충북대... 100명 생존... 합류할 수 있나?'",
    isSpecial: true,
    choices: [
      {
        id: "sp10_a",
        text: "합류를 수락하고 이동 경로를 안내한다",
        effect: { survivors: 15, food: -18, mental: 8 },
        resultText: "대규모 합류! 전투력이 크게 올랐지만 식량 소모가 감당하기 어렵다.",
      },
      {
        id: "sp10_b",
        text: "정보만 교환하고 각자 버틴다",
        effect: { mental: 8, food: -3, health: -3 },
        resultText: "좀비 분포도와 구조 정보를 교환했다. 서로의 존재만으로 희망이 된다.",
      },
      {
        id: "sp10_c",
        text: "우리 위치를 알리면 위험하다며 통신을 끊는다",
        effect: { mental: -10, survivors: -5, food: -3 },
        resultText: "생존자들이 비인간적이라고 분노했다. 일부가 독자적으로 떠나 합류하러 갔다.",
      },
    ],
  },
  {
    id: "sp11",
    phase: "late",
    tag: "explore",
    location: "도서관",
    title: "백신 연구 자료 발견",
    description:
      "도서관 특수 서고에서 바이러스 관련 연구 논문을 발견했다. 교수의 메모가 빼곡하다. '약점은 자외선...'",
    isSpecial: true,
    choices: [
      {
        id: "sp11_a",
        text: "연구 자료를 분석해 UV 조사 장치를 프로그래밍한다",
        effect: { mental: 15, health: -10, food: -8 },
        departmentBonus: {
          departmentId: "smart_sw",
          extraEffect: { mental: 12, health: 8 },
        },
        resultText: "UV LED 배열 제어 프로그램을 완성했다. 좀비 억제에 획기적 효과!",
      },
      {
        id: "sp11_b",
        text: "자료를 구조대에 전송할 수 있도록 정리한다",
        effect: { mental: 10, food: -5, health: -5 },
        resultText: "데이터를 정리해 무전으로 핵심 내용을 송신했다. 백신 개발에 도움이 될 것이다.",
      },
      {
        id: "sp11_c",
        text: "자료를 여러 사본으로 필사해 캠퍼스 곳곳에 분산 보관한다",
        effect: { mental: 5, food: -8, health: -3 },
        resultText:
          "시간을 들여 자료를 필사했다. 우리가 못 쓰더라도 누군가에게 도달할 수 있다.",
      },
    ],
  },
  {
    id: "sp12",
    phase: "late",
    tag: "combat",
    location: "운동장",
    title: "좀비 킹 출현",
    description:
      "운동장에 거대한 변종 좀비가 나타났다. 일반 좀비를 통솔하듯 무리를 이끌고 있다. 이것만 처치하면 무리가 흩어질 것 같다.",
    isSpecial: true,
    choices: [
      {
        id: "sp12_a",
        text: "고전압 트랩을 설치해 감전시킨다",
        effect: { mental: 15, health: -12, food: -12 },
        departmentBonus: {
          departmentId: "electrical",
          extraEffect: { mental: 12, health: 8 },
        },
        resultText: "트랩에 유인해 고전압으로 쓰러뜨렸다! 무리가 흩어지면서 위협이 크게 줄었다.",
      },
      {
        id: "sp12_b",
        text: "전원이 달려들어 물량으로 제압한다",
        effect: { mental: 12, health: -20, survivors: -12 },
        resultText: "처치에 성공했지만 엄청난 희생이 따랐다. 남은 인원이 위태롭다.",
      },
      {
        id: "sp12_c",
        text: "건물 안에서 숨어 지나가길 기다린다",
        effect: { mental: -15, health: -5, food: -10 },
        resultText: "좀비 킹이 캠퍼스에 눌러앉았다. 이동이 완전히 제한되어 식량 확보가 불가능해졌다.",
      },
    ],
  },
  // --- 정전 이벤트 (플래시라이트 모드 트리거) ---
  {
    id: "sp_blackout",
    phase: "mid",
    tag: "defense",
    location: "캠퍼스 전역",
    title: "완전 정전",
    description:
      "비상등이 하나씩 꺼지기 시작했다. 캠퍼스 전체가 암흑 속으로 잠기는 데 채 1분이 걸리지 않았다. 발전기 연료가 바닥났거나, 누군가 고의로 차단한 것이다. 이제 어둠이 일상이 된다.",
    isSpecial: true,
    choices: [
      {
        id: "sp_blackout_a",
        text: "비상 발전기를 찾아 일부 구역 복구를 시도한다",
        effect: { health: -10, mental: 8, food: -8 },
        resultText:
          "발전기를 찾았지만 연료는 거의 없었다. 핵심 구역에만 희미한 불빛이 돌아왔다. 나머지 구역은 여전히 어둠 속이다. 손전등이 지금부터 가장 중요한 장비가 됐다.",
      },
      {
        id: "sp_blackout_b",
        text: "어둠을 이용해 움직임을 최소화하고 조용히 버틴다",
        effect: { food: -5, survivors: -8, mental: -5 },
        resultText:
          "어둠 속에서 소리만으로 판단해야 했다. 몇 명이 공황에 빠져 이탈했다. 남은 사람들은 더 조용해졌다. 침묵이 새로운 언어가 됐다.",
      },
      {
        id: "sp_blackout_c",
        text: "손전등을 배분하고 야간 작전 체계로 전환한다",
        effect: { mental: -12, survivors: 8, food: -10 },
        resultText:
          "혼란 속에서도 체계를 잡았다. 야간 경계조를 편성하고 배터리 수량을 파악했다. 어둠에 적응하는 데 시간이 걸렸지만, 이제는 어둠이 오히려 우리 편이다.",
      },
    ],
  },
  // --- 군 헬기 격추 (필수 이벤트 atTurn 25) ---
  {
    id: "sp_heli_down",
    phase: "late",
    tag: "morale",
    location: "캠퍼스 외곽",
    title: "군 헬기 격추 신호 수신",
    description:
      "무전기에서 단편적인 신호가 잡혔다. '...브라보-7 격추 확인... 구조 일정 재검토 중...' 30일이라는 숫자가 흔들린다.",
    isSpecial: true,
    choices: [
      {
        id: "sp_heli_down_a",
        text: "신호를 분석해 정확한 상황을 파악하려 한다",
        effect: { mental: -10, food: -5, health: -3 },
        resultText:
          "단편 신호만으로는 전체 상황을 알 수 없었다. 격추가 맞다면 구조 일정이 달라질 수 있다. 하지만 확인할 방법이 없다. 오늘 하루를 버티는 것만 생각하기로 했다.",
      },
      {
        id: "sp_heli_down_b",
        text: "생존자들에게 알리고 최악을 대비해 물자를 재점검한다",
        effect: { mental: -18, food: -8, survivors: -5 },
        resultText:
          "공황이 번졌다. 일부는 포기했고, 일부는 더 단단해졌다. 물자를 다시 세고 최악을 가정했다. 30일이 아닐 수도 있다는 것을 처음으로 입 밖에 냈다.",
      },
      {
        id: "sp_heli_down_c",
        text: "혼자만 알고 있기로 한다. 희망이 필요하다",
        effect: { mental: -5, health: -5, food: -3 },
        resultText:
          "말하지 않았다. 다들 각자의 숫자를 세고 있었다. 당신만 다른 숫자를 세기 시작했다. 그게 더 나은 선택인지 끝까지 확신할 수 없었다.",
      },
    ],
  },
  // --- 비상 발전기 복구 (sp_blackout 이후 복전 — flashlightMode: false 복귀) ---
  {
    id: "sp_lights_restored",
    phase: "mid",
    tag: "craft",
    location: "지하 기계실",
    title: "발전기 재가동",
    description:
      "기계공학과 선배가 며칠째 혼자 지하실을 뒤졌다. 낡은 비상 발전기를 찾아낸 것이다. 연료도 얼마 남지 않았지만 핵심 구역에 불을 다시 켤 수 있다. 어둠 속에서 며칠을 버틴 뒤 처음으로 복도에 불이 들어왔다.",
    isSpecial: true,
    choices: [
      {
        id: "sp_lights_restored_a",
        text: "발전기를 최대 출력으로 돌려 캠퍼스 전체에 불을 켠다",
        effect: { mental: 18, food: -12, survivors: 5, health: -5 },
        resultText:
          "불빛이 돌아왔다. 함성이 터져 나왔다. 하지만 연료가 빠르게 닳았다. 이 빛이 얼마나 갈지 아무도 몰랐다. 지금 이 순간만큼은 살아있다는 느낌이 들었다.",
      },
      {
        id: "sp_lights_restored_b",
        text: "핵심 구역만 켜고 연료를 아낀다",
        effect: { mental: 10, food: -5, health: 5 },
        resultText:
          "전부는 아니었지만 충분했다. 의무실과 식량 창고에 불이 들어왔다. 어둠 속에서 놓쳤던 것들이 보이기 시작했다. 조심스러운 안도감이 퍼졌다.",
      },
      {
        id: "sp_lights_restored_c",
        text: "발전기를 비상용으로 남겨두고 지금은 켜지 않는다",
        effect: { mental: -8, food: 5, survivors: -5 },
        resultText:
          "아직 때가 아니라고 판단했다. 발전기를 감추고 아무에게도 알리지 않았다. 몇몇은 눈치챘다. 그들의 시선이 따가웠다. 옳은 선택인지 모르겠다.",
      },
    ],
  },
] as const;
