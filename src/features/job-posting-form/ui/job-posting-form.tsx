import { fieldCss, Form } from 'shared/form'
import { cn, Slot } from 'shared/lib'
import { Checkbox, Label } from 'shared/ui'

type Props = {
  className?: string
}

export const JobPostingForm = ({ className }: Props) => {
  const studentTypeOptions = [
    'All',
    'Kindergarten',
    'Elementary',
    'MiddleSchool',
    'HighSchool',
    'Adult',
  ]

  return (
    <div className={cn('rounded-3xl border border-gray-300 p-10', className)}>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>공고 제목</Label>
        <Form.Control name="title">
          <Form.TextField
            placeholder="간결하고 명확하게 입력해 주세요. ex) Full-Time ESL Instructor"
            fullWidth
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>주요 업무</Label>
        <Form.Control name="jobDescription">
          <Form.TextArea
            placeholder={`입사 후 맡게되는 업무에 대해 자세히 알려주세요\nex) Teach [elementary-level] English classes [30 hours per week]. Develop lesson plans and class materials.`}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label>자격 요건</Label>
        <Form.Control name="requiredQualification">
          <Form.TextArea
            placeholder={`지원자의 필요 조건을 입력해 주세요\nex) Native or native-level English speaker. Valid TEFL/TESOL/CELTA certification (preferred).`}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label>우대 사항</Label>
        <Form.Control name="preferredQualification">
          <Form.TextArea
            placeholder={`채용시 우대되는 사항이 있다면 입력해 주세요\nex) Basic Korean language skills for simple communication.\nExperience teaching [elementary students/IELTS/TOEFL].`}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label>혜택/복지</Label>
        <Form.Control name="benefits">
          <Form.TextArea
            placeholder={`근무자에게 제공되는 혜택을 알려주세요\nex) Provided housing or housing allowance. Paid vacation days (ex. 10 days) + national holidays. Round-trip airfare reimbursement (depending on contract).`}
            fullWidth
            className="h-[128px]"
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>
      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>월급</Label>
        <Form.Control name="salary">
          <Form.TextField placeholder="숫자만 입력해 주세요" fullWidth>
            <Slot name="right">
              <span className="body-large text-gray-700">KRW</span>
            </Slot>
          </Form.TextField>
          <Form.ErrorMessage />
        </Form.Control>
        <Form.Control name="salaryNegotiable">
          <Form.CheckboxGroup options={['true']}>
            <Form.Checkbox label="협의 가능" value="true" />
          </Form.CheckboxGroup>
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>대상 학생</Label>
        <div className="flex gap-[30px]">
          <Form.CheckboxGroup name="studentType" options={studentTypeOptions}>
            <Form.Checkbox label="전체" value="All" />
            <Form.Checkbox label="유치원" value="Kindergarten" />
            <Form.Checkbox label="초등학생" value="Elementary" />
            <Form.Checkbox label="중학생" value="MiddleSchool" />
            <Form.Checkbox label="고등학생" value="HighSchool" />
            <Form.Checkbox label="성인" value="Adult" />
          </Form.CheckboxGroup>
        </div>
      </div>

      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-7' })}>
        <Label>업무 시작 가능 날짜</Label>
        <Form.Control name="jobStartDate">
          <Form.DatePicker
            placeholder="업무 시작 날짜를 선택해 주세요"
            fullWidth
          />
          <Form.ErrorMessage />
        </Form.Control>
      </div>

      <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-8' })}>
        <Label required>공고 마감일</Label>
        <Form.Control name="dueDate">
          <Form.DatePicker
            placeholder="공고 마감 날짜를 선택해 주세요"
            fullWidth
          />
          <Form.ErrorMessage />
        </Form.Control>
        <Checkbox label="상시 채용" value="true" className="-mt-[6px]" />
      </div>
    </div>
  )
}
