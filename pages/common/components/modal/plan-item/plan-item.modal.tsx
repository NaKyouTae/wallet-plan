import {useState} from "react";
import ModalUtil from "../../../utils/modal.util";

const PlanItemModal = ({...pageProps}) => {
    const {plan, clickType, actionType, data} = pageProps.selectedPlanItem
    const [planItem, setPlanItem] = useState(data.planItem)

    const onCloseModal = (e: any) => {
        ModalUtil.onClose(e)
    }

    const onSave = (e: any) => {

    }

    return (
        <div className="portal_container" style={{height: "400px", width: "500px"}}>
            <div className="portal_container_header">
                <div className="portal_container_header_title">
                    타이틀
                </div>
                <div className="portal_container_header_button">
                    <span onClick={(e) => onCloseModal(e)}>X</span>
                </div>
            </div>
            <div className="portal_container_body">
                <div>
                    <div>총 사용 금액</div>
                    <div>1000000</div>
                </div>
                <div className="input-area">
                    <label>은행 명</label>
                    <input />
                </div>
                <div className="input-area">
                    <label>은행 별칭</label>
                    <input />
                </div>
                <div className="input-area">
                    <label>계좌 번호</label>
                    <input />
                </div>
                <div>
                    <div>
                        <div>개별 금액</div>
                        <div>사용처</div>
                        <div>결제 월</div>
                        <div>정산 여부</div>
                    </div>
                    <div>
                        <div className="modal_inner_btn_area">
                            <button type="button">개별 내역 추가</button>
                        </div>
                        {
                            planItem.amounts.map((_, idx) => (
                                <div key={`pe_${idx}`}>
                                    <div key={`amt_${idx}`}>{planItem.amounts[idx]}</div>
                                    <div key={`up_${idx}`}>{planItem.usedPlace[idx]}</div>
                                    <div key={`py_${idx}`}>{planItem.paymentMonth[idx]}</div>
                                    <div key={`pi_${idx}`}>{planItem.paid[idx]}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="input-area">
                    <label>비고</label>
                    <input />
                </div>
            </div>
            <div className="portal_container_footer">
                <button type="button" onClick={(e) => onSave(e)}>{clickType === "create" ? "저장" : "수정"}</button>
            </div>
        </div>
    )
}

export default PlanItemModal
