import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Button, Form, Input, InputNumber, Modal, Skeleton, Table, notification } from "antd"
import { INVOICE, PAY } from "../../config/server"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import { tab } from "@testing-library/user-event/dist/tab"
import { PoweroffOutlined } from "@ant-design/icons"

const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    }
]


const Payment = () => {

    const { token } = useAuth()
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState()
    const [tableData, setTableData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [paymentProcess, setPaymentProcess] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();


    const auction = searchParams.get("auction")


    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        try {
            const { data } = await axios.get(INVOICE + "?auction=" + auction, config);
            setInvoice(data.invoice)

            const { lots } = data.invoice;

            console.log(lots);
            var td = lots.map((lot, idx) => {
                return { key: idx, name: lot.name, price: lot.sold_price }
            })

            setTableData(td)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnOk = () =>{
        setTimeout(()=>{
            setModalOpen(false)
            navigate("/profile/items")
        },2000)
       
        
    }

    const handleOnCancel = () =>{
        setTimeout(()=>{
            setModalOpen(false)
            navigate("/")
        },2000)
        
    }
    if (isLoading) {
        if (isLoading || invoice === null || tableData === null) {
            return <div>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </div>
        }
    }
    const onFinish = async (values) => {
        setPaymentProcess(true)
        setTimeout(() => handlePayment(), 4000)

    }

    const handlePayment = async () => {
        try {
            const { data } = await axios.get(PAY + "?id=" + invoice.id, config)
            console.log(data);
            const { message, status } = data;
            if (status === "Success") {

                setPaymentProcess(false)
                setModalOpen(true)
            }

        } catch (e) {
            console.log(e);
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div className="flex flex-col absolute top-1/3 left-1/3 -mt-40 -ml-20 w-1/2 h-2/3">
        <div className=" self-center">
            <h1 className="text-3xl"> Thanh toán</h1>
        </div>
        <div className="flex flex-row gap-x-10 ">
            <div className="basis-1/2 flex flex-col">
                <div>Xin chào, {invoice.customer}...</div>
                <div>
                    <h1>Phiên đấu giá: {invoice.auction.name}</h1>
                    <h1>Ngày: {moment(invoice.auction.start_time).locale("vi").format("DD/MM/YYYY, h:mm:ss a")}</h1>
                </div>
                <div className="border border-t-4">
                    <Table pagination={{
                        position: ["none"]
                    }} dataSource={tableData} columns={columns} />
                    <h1>Tổng cộng: <i>{invoice.total} $</i></h1>
                </div>
            </div>
            <div className="basis-1/2 flex flex-col gap-y-5">
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/bank.png"} width={600} />
                </div>
                <div className="p-4 border-4">
                    <h1>Thông tin thanh toán</h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        layout="horizontal"
                        wrapperCol={{
                            span: 25,
                        }}
                        labelAlign="left"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên thẻ"
                            name="cardName"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số thẻ"
                            name="cardNum"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ngày hết hạn"
                            name="cardExpire"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="CVV"
                            name="cardCvv"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button
                                type="primary"

                                loading={paymentProcess}
                                htmlType="submit"
                            >
                                Thanh toán
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>

        <Modal
            title={<h1 className="text-green-400 text-3xl">Bạn đã thanh toán thành công</h1>}
            centered
            visible={modalOpen}
            onOk={() => handleOnOk()}
            onCancel={() => handleOnCancel()}
            okText="Xác nhận"
            cancelText="Về trang chủ"
        >
            <div className="basis-1/2 flex flex-col">
                <div>
                    <h1>Phiên đấu giá: {invoice.auction.name}</h1>
                    <h1>Ngày: {moment(invoice.auction.start_time).locale("vi").format("DD/MM/YYYY, h:mm:ss a")}</h1>
                </div>
                <div className="border border-t-4">
                    <h1>Sản phấm:</h1>
                    <Table pagination={{
                        position: ["none"]
                    }} dataSource={tableData} columns={columns} />
                    <h1>Tổng cộng: <i>{invoice.total} $ <span className="text-green-400">Đã thanh toán</span></i></h1>
                </div>
            </div>
        </Modal>
    </div>

}

export default Payment;