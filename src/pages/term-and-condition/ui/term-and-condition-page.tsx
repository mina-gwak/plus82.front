import { Layout } from 'shared/ui'

export const TermAndConditionPage = () => {
  return (
    <Layout
      wide
      className="w-[700px] min-w-[700px] space-y-12 [&_li]:ml-4 [&_ul]:list-disc"
    >
      <section className="flex flex-col gap-y-10">
        <h1 className="title-large font-bold text-gray-900">
          개인회원 이용약관
        </h1>
        <p className="title-small text-gray-900">최종 업데이트 : 2023.11.23</p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          1. 서론
        </h3>
        <p className="title-small font-normal text-gray-800">
          본 채용 플랫폼(이하 &quot;서비스&quot;)은 원어민 선생님과 채용
          담당자(또는 교육기관)를 연결하기 위한 목적으로 운영됩니다. 본 서비스는
          직장인들이 사이드 프로젝트로 진행하는 프로젝트임을 알려드립니다.
          서비스를 이용하거나 접근함으로써 귀하는 본 이용 약관(이하
          &quot;약관&quot;)에 동의하는 것으로 간주됩니다. 만약 약관의 일부라도
          동의하지 않으시는 경우, 서비스를 이용하지 마시기 바랍니다.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          2. 서비스 설명
        </h3>
        <p className="title-small font-normal text-gray-800">
          본 서비스는 원어민 선생님들이 자신의 프로필을 등록하고, 채용 공고에
          지원하거나 채용 관련 정보를 주고받을 수 있도록 설계되었습니다. 또한,
          채용 공고를 게시하는 교육기관이나 채용 담당자와의 원활한 소통을
          지원합니다. 본 플랫폼은 사이드 프로젝트로 진행되며, 등록된 법인이나
          회사가 아님을 알려드립니다.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          3. 정의
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">사용자</span> : 본 서비스를 이용하거나
            접근하는 모든 개인을 의미합니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">원어민 선생님</span> : 교육 및 튜터링
            기회를 모색하는 원어민 사용자.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">채용 담당자/교육기관</span> : 채용
            공고를 게시하거나 원어민 선생님을 채용하려는 사용자.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">콘텐츠</span> : 사용자가 본 서비스에
            게시하는 텍스트, 이미지 등 모든 자료를 의미합니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">서비스</span> : 본 웹사이트 및 관련
            애플리케이션, 플랫폼을 포함합니다.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          4. 계정 등록 및 사용자 책임
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">계정 등록</span> : 사용자는 계정 등록 시
            정확하고 완전하며 최신의 정보를 제공해야 합니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">보안</span> : 귀하는 본 서비스의 계정
            정보(비밀번호 등)를 안전하게 관리할 책임이 있으며, 무단 접근이나
            보안 위반이 발생할 경우 즉시 프로젝트 리더에게 알려야 합니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">사용자 행동</span> : 사용자는 본
            서비스를 합법적인 목적으로만 사용해야 하며, 약관 및 관련 법규를
            준수해야 합니다. 귀하는 본 서비스에 게시하는 콘텐츠 및 귀하 계정을
            통해 이루어지는 모든 행위에 대해 전적으로 책임을 집니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">소유권 및 라이선스</span> : 귀하가 본
            서비스에 게시하는 콘텐츠에 대한 소유권은 귀하에게 있습니다. 단,
            귀하는 본 프로젝트에 해당 콘텐츠를 서비스 운영 및 홍보 목적으로 전
            세계적, 비독점적, 로열티 없는 라이선스로 사용하는 권리를 부여하는
            것으로 간주됩니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">콘텐츠 제한</span> : 귀하는 불법적이거나
            명예훼손, 저작권 침해 등 부적절한 콘텐츠를 게시해서는 안 됩니다.
            프로젝트 측은 본 약관에 위배되는 콘텐츠를 사전 통지 없이 삭제 또는
            수정할 권리를 보유합니다.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          6. 지적 재산권
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">프로젝트 자료</span> : 본 프로젝트에서
            제공하는 디자인, 텍스트, 그래픽 등 모든 자료는 지적 재산권의 보호를
            받으며, 당사의 사전 서면 동의 없이 사용해서는 안 됩니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">사용자 제출 콘텐츠</span> : 귀하가
            제출한 콘텐츠에 대해 소유권은 귀하에게 있으나, 위 5항에 따라 본
            프로젝트에 사용 권한을 부여하게 됩니다.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          7. 면책 조항
        </h3>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">&quot;있는 그대로&quot; 제공</span> : 본
            서비스는 어떠한 보증도 없이 &quot;있는 그대로&quot; 제공됩니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">정보의 정확성</span> : 본 서비스에
            게시되는 채용 공고 및 기타 정보의 정확성, 신뢰성 또는 완전성을
            보증하지 않습니다.
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">사이드 프로젝트 특성</span> : 본
            서비스는 직장인들이 진행하는 사이드 프로젝트로, 정식 법인에 비해
            제한된 자원으로 운영됨을 감안하여 이용해 주시기 바랍니다.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          8. 책임의 한계
        </h3>
        <p className="title-small font-normal text-gray-800">
          적용 가능한 법률이 허용하는 최대 범위 내에서, 본 프로젝트 및
          기여자들은 본 서비스 이용 또는 이용 불가로 인해 발생하는 직접적,
          간접적, 우발적, 결과적 또는 징벌적 손해에 대해 어떠한 책임도 지지
          않습니다. 본 서비스에 대한 불만이 있을 경우, 귀하의 유일한 구제 수단은
          서비스를 중단하는 것입니다.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          9. 이용 종료
        </h3>
        <p className="title-small font-normal text-gray-800">
          프로젝트 측은 귀하가 본 약관을 위반하거나 서비스 또는 다른 사용자에게
          피해를 줄 우려가 있는 경우, 사전 통지 없이 귀하의 서비스 접근을
          중단하거나 계정을 종료할 권리를 보유합니다.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          10. 준거법
        </h3>
        <p className="title-small font-normal text-gray-800">
          본 약관은 사이드 프로젝트 및 비법인 단체에 적용 가능한 법률에 따라
          해석되고 적용됩니다. 본 약관과 관련하여 발생하는 모든 분쟁은 해당
          법률에 따라 해결됩니다.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          11. 약관 변경
        </h3>
        <p className="title-small font-normal text-gray-800">
          프로젝트 측은 본 약관을 언제든지 수정하거나 업데이트할 권리를
          보유합니다. 중요한 변경 사항이 있을 경우, 본 서비스 내 공지를 통해
          안내되며, 변경된 약관은 공지 후 이용을 계속함으로써 귀하에게
          적용됩니다.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="title-small flex h-10 w-full justify-start bg-gray-200 px-3 py-2 font-bold text-gray-900">
          12. 연락처
        </h3>
        <p className="title-small font-normal text-gray-800">
          본 약관에 관한 문의나 우려 사항이 있으시면 아래의 연락처로 문의해
          주시기 바랍니다.
        </p>
        <ul className="space-y-1">
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">프로젝트 리더</span> : 최현식 (Choi
            hyeonsik)
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">이메일</span> : hsc@plus82.co
          </li>
          <li className="title-small font-normal text-gray-800">
            <span className="font-bold">전화번호</span> : 010-6695-9206
          </li>
        </ul>
      </section>
    </Layout>
  )
}
